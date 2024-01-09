import "../assets/css/core/menu/menu-types/vertical-menu-modern.module.css";
import "../assets/css/core/colors/palette-gradient.module.css";
import "../styles/custom.module.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { EmpRequest } from "../api/empRequest";
import axios from "axios";
import Layout from "../components/layout";
import RequestForm from "../components/formRequest";
import { set } from "react-hook-form";
import { Session } from "@/services/userService";

import RequestView from "../components/requestView";
interface SpecialRequest {
  specialRequest_Id: number;
  dateCreated: Date;
  dateInitial: Date;
  dateFinally: Date;
  requestDays: number;
  remainingDays: number;
  notes: string;
  fk_User_Id: string;
  fk_Conjunct_Id: string;
  fk_TypeSpecialRequest_Id: string;
  state_Id: string;
  type: {
    descripcion: string;
  };
  user: {
    name: string;
  };
}

export default function RequestManager() {
  const [requestsList, setRequestsList] = useState<SpecialRequest[]>([]);
  const [requestData, setRequestData] = useState<any>();

  useEffect(() => {
    axios.get("http://localhost:3000/requestsList").then((res) => {
      setRequestsList(res.data);
      console.log(res.data);
    });
  }, []);

  const loadRequest = (id: number) => () => {
    const request = requestsList.find(
      (request) => request.specialRequest_Id === id
    );
    setRequestData(request);
  };

  const getRequests = async () => {
    try {
      const res = await EmpRequest.getRequestsByBossPending(
        Session.getKey("unique_name")
      );

      setRequestsList(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const calcTime = (dateString: any) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  return (
    <Layout>
      <div className="">
        <div className="sidebar-left">
          <div className="sidebar">
            <div className="todo-sidebar d-flex"></div>
            <div className="content-overlay"></div>
            <div className="content-wrapper">
              <div className="content-header row"></div>
              <div className="content-body">
                <div className="app-content-overlay">
                  <div className="todo-app-area">
                    <div className="todo-app-list-wrapper">
                      <div className="todo-app-list">
                        <div className="todo-task-list list-group ps">
                          <ul className="todo-task-list-wrapper list-unstyled">
                            {requestsList.length > 0 ? (
                              requestsList.map((request) => (
                                <li
                                  className="todo-item"
                                  key={request.specialRequest_Id}
                                  onClick={loadRequest(
                                    request.specialRequest_Id
                                  )}
                                >
                                  <div className="todo-title-area d-flex">
                                    <p className="todo-title mx-50 m-0 truncate text-bold-600">
                                      {request.type.descripcion}
                                    </p>
                                  </div>
                                  <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                                    <div className="todo-title-area d-flex">
                                      <p className="todo-title mx-50 m-0 truncate">
                                        {request.user.name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="todo-title-wrapper d-flex justify-content-sm-between justify-content-end align-items-center">
                                    <div className="todo-title-area d-flex">
                                      <p className="todo-title mx-50 m-0 truncate">
                                        Hace {calcTime(request.dateCreated)}{" "}
                                        días
                                      </p>
                                    </div>
                                  </div>
                                  <div className="todo-badge-wrapper d-flex">
                                    <span className="badge badge-warning badge-pill">
                                      {request.state_Id}
                                    </span>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <li>
                                <div className="todo-title-area d-flex">
                                  <p className="todo-title mx-50 m-0 truncate text-bold-600">
                                    No hay solicitudes Pendientes
                                  </p>
                                </div>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="content-right" id="requestForm_contentRigth">
          <div className="">
            {requestData ? (
              <RequestView requestData={requestData} />
            ) : (
              <div className="todo-item">
                <div className="todo-title-area d-flex"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
