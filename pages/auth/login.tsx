import { Auth } from '../../api/authentication';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import { Session } from "@/services/userService";

export default function Login() {
    const router = useRouter();
 
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            EmployeeId: '',
            Password: '',
            testingMode:false
        }

    });

    //temp function for testing using session storage
    const startSession = () => {
        const user=(document.getElementById('user-name')as HTMLInputElement).value;
        sessionStorage.setItem('userType', 'Admin');
        sessionStorage.setItem('userId', user);
    }

    const onSubmit = async (data: any) => {
        try {
            const res = await Auth.login(data);
            Session.startSession(res.data.result);
            if(res.data.message==='CHANGE_PASSWORD'){
                router.push('../auth/changePassword');
                return;
            }
            Swal.fire({
                title: 'Bienvenido',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            router.push('../home');
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error',
                text: 'Usuario o contraseña incorrectos',
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
                                    <div className="card-header border-0">
                                        <div className="card-title text-center">
                                            <p className='card-subtitle text-center mx-2 my-1'>Portal de Personal</p>
                                            <h1 className='sub-title'>Inicio de Sesión</h1>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <div className="card-body">
                                            <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="text" className={`form-control ${errors.EmployeeId ? 'is-invalid' : ''}`} id="EmployeeId" {...register('EmployeeId', { required: 'Este campo es obligatorio' })}
                                                     placeholder="LionLogin"/>
                                                    <div className="form-control-position">
                                                        <i className="la la-user"></i>
                                                    </div>
                                                    <ErrorMessage errors={errors} name="EmployeeId" as={<div className="invalid-feedback" />} />
                                                </fieldset>
                                                <fieldset className="form-group position-relative has-icon-left">
                                                    <input type="password" className={`form-control ${errors.Password ? 'is-invalid' : ''}`} id="Password" {...register('Password', { required: 'Este campo es obligatorio' })} placeholder="Contraseña"/>
                                                    <div className="form-control-position">
                                                        <i className="la la-key"></i>
                                                    </div>
                                                </fieldset>
                                                <div className="form-group row">
                                                    <div className="col-sm-6 col-12 text-center text-sm-left pr-0">
                                                        <fieldset>
                                                            <input type="checkbox" id="remember-me" className="chk-remember" />
                                                            <label htmlFor="remember-me"> Recuérdame</label>
                                                        </fieldset>
                                                    </div>
                                                    <div className="col-sm-6 col-12 float-sm-left text-center text-sm-right">
                                                        <a href="recover-password.html" className="card-link">¿Olvidó su contraseña?</a>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    <i className="ft-unlock"></i> Ingresar
                                                </button>
                                            </form>
                                        </div>
                                        <p className="card-subtitle line-on-side text-muted text-center font-small-3 mx-2 my-1">
                                            <span>¿Primera vez aquí?</span>
                                        </p>
                                        <div className="card-body">
                                            <a href="../auth/register" className="btn btn-outline-secondary btn-block">
                                                <i className="la la-user"></i> Registrarse
                                            </a>
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