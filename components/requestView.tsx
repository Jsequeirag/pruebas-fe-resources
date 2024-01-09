import { useEffect, useState } from "react";
import SinglePage from "./SinglePage";
import moment from "moment";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Session } from "@/services/userService";
import { EmpRequest } from "../api/empRequest";
interface SpecialRequest {
  specialRequest_Id: number;
  dateCreated: Date;
  dateInitial: Date;
  dateFinally: Date;
  requestsDays: number;
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
    full_Name: string;
  };
}
export default function RequestView({ requestData }: any) {
  const [request, setRequest] = useState<SpecialRequest>();
  const router = useRouter();
  useEffect(() => {
    if (requestData) {
      console.log(requestData);
      setRequest(requestData);
    }
    managerFunctions();
  }, [requestData]);
  const formatDate = (date: Date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const managerFunctions = () => {
    const container = document.getElementById("actions");

    //this removes the buttons from the form
    if (
      Session.getKey("role") === "Admin" &&
      router.pathname === "/requestManagement" &&
      container
    ) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      const createButton = (
        text: string,
        className: string
      ): HTMLButtonElement => {
        const button: HTMLButtonElement = document.createElement("button");
        button.textContent = text;
        button.className = className;
        return button;
      };

      const rejectBtn = createButton("Rechazar", "btn btn-danger mr-1");
      const approveBtn = createButton("Aprobar", "btn btn-success mr-1");
      container.appendChild(rejectBtn);
      container.appendChild(approveBtn);

      rejectBtn.addEventListener("click", () => {
        Swal.fire({
          title: "¿Desea rechazar esta solicitud?",
          text: "Esta acción no se puede revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, rechazar solicitud",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Rechazada",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            EmpRequest.updateRequest(
              requestData.specialRequest_Id,
              "Rechazada"
            );
            requestData = null;
          }
        });
      });
      approveBtn.addEventListener("click", () => {
        Swal.fire({
          title: "¿Desea aprobar esta solicitud?",
          text: "Esta acción no se puede revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, aprobar solicitud",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Aprobada",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            EmpRequest.updateRequest(requestData.specialRequest_Id, "Aprobada");
            requestData = null;
            //window.location.reload();
          }
        });
      });
    }
  };
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title">Solicitud</h4>
      </div>
      <div className="card-content">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="requestId">ID</label>
                <label htmlFor="requestId" className="form-control">
                  {request?.specialRequest_Id}
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="requestId">Tipo de Solicitud</label>
                <label htmlFor="requestId" className="form-control">
                  {request?.type.descripcion}
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="requestId">Empleado</label>
                <label htmlFor="requestId" className="form-control">
                  {request?.user.full_Name}
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="dateInitial">Fecha Inicial</label>
                <label htmlFor="dateInitial" className="form-control">
                  {formatDate(request?.dateInitial ?? new Date())}
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="dateFinally">Fecha Final</label>
                <label htmlFor="dateFinally" className="form-control">
                  {formatDate(request?.dateFinally ?? new Date())}
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="requestDays">Días Solicitados</label>
                <label htmlFor="requestDays" className="form-control">
                  {request?.requestsDays}
                </label>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="notes">Notas</label>
                <textarea
                  className="form-control"
                  id="notes"
                  value={request?.notes}
                  disabled
                ></textarea>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="form-group">
                <label htmlFor="status">Estado</label>
                <label htmlFor="status" className="form-control">
                  {request?.state_Id}
                </label>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-actions text-right" id="actions">
              <SinglePage />
            </div>
            <div className="form-actions text-right" id="actions">
              asd
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
