import Layout from "../components/layout";
import "../assets/css/pages/user-feed.module.css";
import { Session } from "@/services/userService";
import { useEffect, useState } from "react";

export default function Profile() {
    //useState is not necessary, change it later
    const [user, setUser] = useState({
        name: '',
        email: '',
        employeeNumber: '',
        vacs_Pending: '',
        vacs_Aditionals: ''
    });
    const coverImage = "";
    const userAvatar = "./user-avatar.png";

    useEffect(() => {
        setUser({
            name: user.name = Session.getKey("name") as string,
            email: user.email = Session.getKey("email") as string,
            employeeNumber: user.employeeNumber = Session.getKey("UniqueName") as string,
            vacs_Pending: user.vacs_Pending = Session.getKey("Vacs_Pending") as string,
            vacs_Aditionals: user.vacs_Aditionals = Session.getKey("Vacs_Aditionals") as string
        });
    }, []);
    return (
        <Layout>
            <div className="">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-header row">
                        <div className="content-header-left col-md-6 col-12 mb-2 breadcrumb-new">
                            <h3 className="content-header-title mb-0 d-inline-block">Perfil</h3>
                            <div className="row breadcrumbs-top d-inline-block">
                                <div className="breadcrumb-wrapper col-12">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Inicio</a>
                                        </li>
                                        <li className="breadcrumb-item active">Perfil
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <section id="user-feed">
                            <div className="row">
                                <div className="col-12">
                                    <img className="img-fluid rounded" src={coverImage}></img>
                                    <div className="user-data text-center bg-white rounded pb-2 mb-md-2">
                                        <img className="img-fluid rounded-circle width-150 profile-image shadow-lg border border-1" src={userAvatar}></img>
                                        <h4 className="mt-1 mb-0">{user.name}</h4>
                                        <p className="m-0">{user.email}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="card shadow-none">
                                        <div className="card-body">
                                            <div className="employe-info mt-2">
                                                <h5 className="text-bold-600 mb-1">Número de Empleado</h5>
                                                <p className="font-small-3">{user.employeeNumber}</p>
                                            </div>
                                            <div className="employe-info mt-2">
                                                <h5 className="text-bold-600 mb-1">Puesto</h5>
                                                <p className="font-small-3"></p>
                                            </div>
                                            <div className="employe-info mt-2">
                                                <h5 className="text-bold-600 mb-1">Departamento</h5>
                                                <p className="font-small-3"></p>
                                            </div>
                                            <div className="employe-info mt-2">
                                                <h5 className="text-bold-600 mb-1">Fecha de Ingreso</h5>
                                                <p className="font-small-3"></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12">
                                    <div className="card shadow-none">
                                        <div className="card-body">

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12">
                                    <div className="card text-white bg-info bg-darken-1 mb-2">
                                        <div className="card-body">
                                            <i className="ft-award white float-right font-medium-5"></i>
                                            <h3 className="white">{ user.vacs_Pending}</h3>
                                            <p className="card-text">Días disponibles</p>

                                        </div>
                                    </div>
                                    <div className="card text-white bg-success bg-darken-1 mb-3">
                                        <div className="card-body">
                                            <i className="ft-award white float-right font-medium-5"></i>
                                            <h3 className="white">{user.vacs_Aditionals}</h3>
                                            <p className="card-text">Días adicionales</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    )

}