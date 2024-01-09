
import {useForm} from 'react-hook-form';
import { useState } from 'react';
import { Auth } from '../../api/authentication';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { ErrorMessage } from "@hookform/error-message"


export default function Register() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            EmployeeId: ''
        }
    });
    const redirect = (path: string) => () => {
        console.log(`/${path}`);
        router.push(`/${path}`);
    }
    const onSubmit = async (data: any) => {
        try {
            sessionStorage.setItem("EmployeeId", (data.EmployeeId));
            await Auth.register(data.EmployeeId);
            router.push('./confirmationCode');
        }catch(error){
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'El usuario no existe',
                icon: 'error',
                timer: 1500,
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        }
    };

    return (
        <div className="app-content content">
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
                                            <p className='card-subtitle text-center mx-2 my-1'>Portal de Personal</p>
                                            <h1 className='title'>Registro</h1>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="text" className={`form-control ${errors.EmployeeId ? 'is-invalid' : ''}`} id="EmployeeId" {...register('EmployeeId', { required: 'Este campo es obligatorio' })}
                                                        placeholder="LionLogin" />
                                                    <div className="form-control-position">
                                                        <i className="la la-user"></i>
                                                    </div>
                                                    <ErrorMessage errors={errors} name="EmployeeId" as={<div className="invalid-feedback" />} />
                                                </fieldset>
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    <i className="la la-user"></i> Registrar
                                                </button>
                                            </form>
                                        </div>
                                        <p className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                                            <span>¿Ya tiene una cuenta?</span>
                                        </p>
                                        <div className="card-body">
               
                                            <button className="btn btn-outline-secondary btn-block" onClick={redirect("")}>
                                                <i className="ft-unlock"></i> Iniciar Sesión
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}