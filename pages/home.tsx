import Layout from "../components/layout";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { EmpRequest } from "../api/empRequest";
import { Session } from "../services/userService";

interface HomeData {
    pendingRequests: number,
    allRequests: number,
    myRequests: number
}
let unique_name="";
let vacs_Pending="";
let vacs_Aditionals="";
export default function Home() {
    const router = useRouter();
    const redirect = (path: string) => () => {
        router.push(`/${path}`);
    }
    const [homeData, setHomeData] = useState<HomeData>();
    const getHomeData = async () => {
        try {
            const res = await EmpRequest.getHomeData(unique_name);
            setHomeData(res.data.result);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        unique_name=Session.getKey("unique_name") as string;
        vacs_Pending=Session.getKey("Vacs_Pending") as string;
        vacs_Aditionals=Session.getKey("Vacs_Aditionals") as string;
        getHomeData();
    }, []);
    return (
        <Layout>
            <div className="content-overlay"></div>
            <div className="content-wrapper"></div>
            <div className="content-header row"></div>
            <div className="content-body">
                <div className="row">
                    <div className="col-xl-6 col-md-12">
                        <div className="card overflow-hidden ml-1">
                            <div className="card-content">
                                <div className="media align-items-stretch bg-info text-white rounded">
                                    <div className="bg-info bg-darken-2 p-2 media-middle">
                                        <i className="ft-info font-large-2 text-white"></i>
                                    </div>
                                    <div className="media-body p-2">
                                        <h4 className="text-white">Mis vacaciones disponibles</h4>
                                    </div>
                                    <div className="media-right p-2 media-middle">
                                        <h1 className="text-white">{vacs_Pending}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-md-12">
                        <div className="card overflow-hidden mr-1">
                            <div className="card-content">
                                <div className="media align-items-stretch bg-success text-white rounded">
                                    <div className="bg-success bg-darken-2 p-2 media-middle">
                                        <i className="ft-star font-large-2 text-white"></i>
                                    </div>
                                    <div className="media-body p-2">
                                        <h4 className="text-white">Mis días adicionales</h4>
                                    </div>
                                    <div className="media-right p-2 media-middle">
                                        <h1 className="text-white">{vacs_Aditionals}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <h2 className="text-bold-600 ml-1">Mi Equipo</h2>
                <div className="row">
                    <div className="col-xl-3 col-6">
                        <div className="card pull-up ml-1 text-center" onClick={redirect("requestManagement")}>
                            <div className="card-header">
                                <h3 className="">
                                    Solicitudes Pendientes
                                </h3>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-7">
                                           
                                                <h1>{homeData?.pendingRequests}</h1>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-6">
                        <div className="card pull-up text-center" onClick={redirect("requestHistory")}>
                            <div className="card-header">
                                <h3 className="">
                                    Todas las Solicitudes
                                </h3>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-7">
                                            
                                        <h1>{homeData?.allRequests}</h1>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          
                </div>
                <h2 className="text-bold-600 ml-1">Mis solicitudes</h2>
                <div className="row">
                    <div className="col-xl-3 col-6">
                        <div className="card pull-up text-center ml-1" onClick={redirect("myRequests")}>
                            <div className="card-header">
                                <h3 className="">
                                    Historial
                                </h3>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-7">
                                            <h1>{homeData?.myRequests}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-xl-3 col-6">
                        <div className="card pull-up text-center" onClick={redirect("empRequestForm")}>
                            <div className="card-header">
                                <h3 className="">
                                    Nueva solicitud
                                </h3>
                            </div>
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-7">
                                            <i className="ft-plus-circle font-large-2"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    )
}