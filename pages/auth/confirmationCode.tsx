import { useRouter } from "next/router";
import { Auth } from "../../api/authentication";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ErrorMessage } from "@hookform/error-message";
import { use, useEffect } from "react";

let employeeId = "";

export default function ConfirmationCode() {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            EmployeeId: employeeId,
            Password:'',
            testingMode:false
        }
    });

    const onSubmit = async (data: any) => {
        try {
            await Auth.login(data);
            router.push('/Auth/changePassword');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Código incorrecto',
                icon: 'error',
                timer: 1500,
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        };
    }
    useEffect(() => {
        employeeId = sessionStorage.getItem("EmployeeId")+"";
    }, []);
    return (
        <div className="app-content content" >
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <div className="content-header row">
                </div>
                <div className="content-body">
                    <section className="row flexbox-container">
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                                <div className="card border-grey border-lighten-3 px-1 py-1 m-0">
                                    <div className="card-header border-0 pb-0">
                                        <div className="card-title text-center">
                                            <h1 className='title'>Portal de Personal</h1>
                                        </div>
                                    </div>
                                    <p className="card-subtitle text-center mx-2 my-1">Ingrese el código que fue enviado a su correo</p>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="text" className={`form-control ${errors.Password ? 'is-invalid' : ''}`} id="Password"{...register('Password', { required: 'Este campo es obligatorio' })} placeholder="Código" />
                                                    <div className="form-control-position">
                                                        <i className="la la-user"></i>
                                                    </div>
                                                    <ErrorMessage errors={errors} name="Password" as={<div className="invalid-feedback" />} />
                                                </fieldset>
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    <i className="la la-user"></i> Confirmar
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div >
    )
}