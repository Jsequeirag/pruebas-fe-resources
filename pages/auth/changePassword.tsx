import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { Auth } from '../../api/authentication';
import { Session } from "@/services/userService";

let employeeId ="";

export default function ChangePassword() {
    const router = useRouter();
//    const [employeeId, setEmployeeId] = useState("");

    const { register, watch, handleSubmit, setValue, formState: { errors, isSubmitting, isValid } } = useForm({
        defaultValues: {
            EmployeeId: "",
            Password: '',
            Conf_Pass: '',
            testingMode: false
        }
    });

    const onSubmit = async (data: any) => {
        try {
            await Auth.updatePass(data);
            router.replace('/');
        } catch (error) {

        }
    };

    useEffect(() => {
        const fetchEmployeeId = async () => {
            const id = await Session.getKey("unique_name");
//            setEmployeeId(id || "");

            // Use setValue to update the form field
            setValue("EmployeeId", id || "");
        };

        fetchEmployeeId();
    }, [setValue]);
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
                                            <p className='card-subtitle text-center mx-2 my-1'>Portal de Peronal</p>
                                            <h1 className='title'>Actualizar Contraseña</h1>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="password" className={`form-control ${errors.Password ? 'is-invalid' : ''}`} id="Password"  {...register('Password', { required: 'Este campo es obligatorio' })} placeholder="Nueva contraseña" disabled={isSubmitting} />
                                                    <div className="form-control-position">
                                                        <i className="la la-user"></i>
                                                    </div>
                                                    <ErrorMessage errors={errors} name="Password" as={<div className="invalid-feedback" />} />
                                                </fieldset>
                                                <fieldset className='form-group position-relative has-icon-left'>
                                                    <input type="password" className={`form-control ${errors.Conf_Pass ? 'is-invalid' : ''}`} id="conf_Pass" {...register('Conf_Pass', {
                                                        required: 'Este campo es obligatorio',
                                                        validate: (val: string) => {
                                                            if (watch('Password') != val) {
                                                                return 'Las contraseñas no coinciden';
                                                            }
                                                        },
                                                    })} placeholder="Confirmar contraseña"
                                                        disabled={isSubmitting} />
                                                    <div className="form-control-position">
                                                        <i className="la la-user"></i>
                                                    </div>
                                                    <ErrorMessage errors={errors} name="Conf_Pass" as={<div className="invalid-feedback" />} />
                                                </fieldset>
                                                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                                                    <i className="la la-user"></i> Actualizar
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
        </div>
    )
}