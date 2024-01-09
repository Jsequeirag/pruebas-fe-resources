import Layout from "../components/layout";
import DTable from "../components/table";
import { EmpRequest } from "../api/empRequest";
import { Session } from "@/services/userService";
import { useState,useEffect } from "react";


interface SpecialRequest {
    specialRequest_Id: number,
    dateCreated: Date,
    dateInitial: Date,
    dateFinally: Date,
    requestDays: number,
    remainingDays: number,
    notes: string,
    fk_User_Id: string,
    fk_Conjunct_Id: string,
    fk_TypeSpecialRequest_Id: string,
    state_Id: string,
}

export default function RequestHistory(){
    const [myRequests, setMyRequests] = useState<SpecialRequest[]>([]);
    const getRequests = async () => {
        try {
            console.log(Session.getKey("unique_name"));
            const res = await EmpRequest.getRequestsByBoss(Session.getKey("unique_name"));
            console.log(res.data.result);
            setMyRequests(res.data.result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getRequests();
    }, []);
    return(
        <Layout>
            <div className="card m-1">
                <div className="card-title m-1">
                    <h3>Historial de Solicitudes</h3>
                </div>
                <div className="card-body">
                    <DTable data={myRequests} />
                </div>
            </div>
        </Layout>
    )
}