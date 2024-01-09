import "../styles/custom.module.css"

import { ErrorMessage } from "@hookform/error-message";
import { EmpRequest } from "../api/empRequest"
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { useForm, Controller, set } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Session } from "@/services/userService";
import moment from 'moment';

interface RequestType {
    typeSpecialRequest_Id: '',
    fK_Conjunct_Id: '',
    descripcion: '',
    requiredFiles: ''
}
interface VacsModel {

    vacs_pending: string,
    vacs_aditional:string
}

let userId : string;
let conjunct: string;

export default function RequestForm({ requestData }: any) {

    const router = useRouter();
    const [options, setOptions] = useState<RequestType[]>([]);
    const [formData, setFormData] = useState();
    const [vacsModel, setVacsData] = useState<VacsModel>();
    let minDays = 0.5;

    const { register, handleSubmit, setValue, formState: { errors }, getValues,reset } = useForm({
        defaultValues: {
            dateCreated: moment(new Date()).format('YYYY-MM-DD'),
            dateInitial: moment(new Date()).format('YYYY-MM-DD'),
            dateFinally: moment(new Date()).format('YYYY-MM-DD'),
            requestsDays: 0,
            remainingDays: 0,
            notes: '',
            fk_User_Id: '',
            fk_Conjunct_Id:'',
            fk_TypeSpecialRequest_Id: "",
            state_Id: "Pendiente"
        }
    });
    
    const onSubmit = async (data: any) => {
       
        try {
            await EmpRequest.submitRequest(data);
            Swal.fire({
                title: 'Solicitud creada',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
            });
            router.push('/home');
        } catch (error) {
      
            Swal.fire({
                title: 'Error',
                text: 'No se pudo crear la solicitud',
                icon: 'error',
                timer: 1500,
                showConfirmButton: true,
                confirmButtonText: 'Ok'
            });
        }
    }
    useEffect(() => {
        
  
        const fetchRequestTypes = async () => {
            try {
                const res = await EmpRequest.getRequestTypes(Session.getKey("Conjunct"));
                setOptions(res.data.result);
                
            } catch (error) {
                console.error(error);
            }
        }


        const fetchEmployeeId = async () => {
            setVacsData({
                vacs_aditional : Session.getKey("Vacs_Aditionals") as string,
                vacs_pending : Session.getKey("Vacs_Pending") as string
            });

            Session.getKey('unique_name') ?userId = Session.getKey('unique_name') as string : router.push('/');
            Session.getKey('Conjunct') ? conjunct = Session.getKey('Conjunct') as string : router.push('/');
            setValue("fk_User_Id", userId || "");
            setValue("fk_Conjunct_Id", conjunct || "");
        };
        fetchEmployeeId();
        fetchRequestTypes();
        managerFunctions();
        if (requestData) {
       
            console.log(requestData);
            setFormData(requestData);
            reset(requestData);
        }
        
        
       
        console.log(getValues());    
    }, [requestData,setValue]);

    const validateDateFinally = (value: any) => {
        //const dateInitialVal=new Date(document.getElementById('dateInitial').value);

        const dateFinallyVal = new Date(value);

    }
    const convertToBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const handleFileUpload = async (e:any) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
    }

    const managerFunctions = () => {
        const container = document.getElementById('actions');
        
        //this removes the buttons from the form
        if (
            Session.getKey("role") === 'Admin' &&
            router.pathname === '/requestManagement' &&
            container
        ) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            const createButton = (text: string, className: string): HTMLButtonElement => {
                const button: HTMLButtonElement = document.createElement('button');
                button.textContent = text;
                button.className = className;
                return button;
            };

            const rejectBtn = createButton('Rechazar', 'btn btn-danger mr-1');
            const approveBtn = createButton('Aprobar', 'btn btn-success mr-1');
            container.appendChild(rejectBtn);
            container.appendChild(approveBtn);

            rejectBtn.addEventListener('click', () => {
                Swal.fire({
                    title: '¿Desea rechazar esta solicitud?',
                    text: 'Esta acción no se puede revertir',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, rechazar solicitud',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Rechazada',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        EmpRequest.updateRequest(formData,'Rechazada');
                        requestData=null;
                    }
                });
            });
            approveBtn.addEventListener('click', () => {
                Swal.fire({
                    title: '¿Desea aprobar esta solicitud?',
                    text: 'Esta acción no se puede revertir',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, aprobar solicitud',
                    cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'Aprobada',
                            icon: 'success',
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        EmpRequest.updateRequest(formData,'Aprobada');
                        requestData=null;
                        window.location.reload();
                    }
                });
            });
        }
    };
    return (
        <div className="">
            <div className="content-overlay"></div>
            <div className="content-wrapper">
                <div className="content-body">
                    <section id="horizontal-form-layouts">
                        <div className="row match-height">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h1 className="card-title" id="basic-layout-form">Solicitud de Empleado</h1>
                                    </div>
                                    <div className="card-content collapse show">
                                        <div className="card-body">
                                            <form className="form form-horizontal row-separator" onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-body">
                                                    <div className="form-group row row-cols-2">
                                                        <label className="col-3 col-md- label-control">Tipo de solicitud</label>
                                                        <div className="col-6 col-md-6 mx-auto" id="select_requestType">

                                                            <select className={`form-control ${errors.fk_TypeSpecialRequest_Id ? 'is-invalid' : ''}`} id="typeSpecialRequest" {...register('fk_TypeSpecialRequest_Id', { required: 'Este campo es obligatorio' })}>
                                                                <option>Seleccionar</option>
                                                                {options.map((option: RequestType) => (
                                                                    <option key={option.typeSpecialRequest_Id} value={option.typeSpecialRequest_Id}>{option.descripcion}</option>
                                                                ))}
                                                            </select>
                                                            <ErrorMessage errors={errors} name="fk_TypeSpecialRequest_Id" as={<div className="invalid-feedback" />} />
                                                        </div>
                                                        <label className="col-3 col-md-3 label-control"></label>
                                                        <label className="col-2 col-md-3 label-control">Comentario</label>
                                                        <div className="col-9 col-md-6">
                                                            <textarea className={`form-control ${errors.notes ? 'is-invalid' : ''}`} id="textArea_comment" rows={3} maxLength={500} {...register('notes')}></textarea>
                                                            <ErrorMessage errors={errors} name="notes" as={<div className="invalid-feedback" />} />
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className="form-group row">
                                                    <label className="col-4 col-md-6 label-control text-center">Vacaciones disponibles: {vacsModel?.vacs_pending}</label>

                                                    <label className="col-4 col-md-3 label-control text-center">Días personales disponibles: {vacsModel?.vacs_aditional}</label>
                                                    
                                                </div>

                                                <div className="form-group row">

                                                    <label className="col-3 col-md-3 label-control" id="label_startDate">Fecha rige</label>
                                                    <div className="col-9 col-md-3 mx-auto">

                                                        <div className="position-relative has-icon-left">
                                                            <input type="date" className={`form-control ${errors.dateInitial ? 'is-invalid' : ''}`} id="dateInitial" {...register('dateInitial', { required: 'Este campo es obligatorio' })} />
                                                            <div className="form-control-position">
                                                                <i className="ft-message-square"></i>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage errors={errors} name="dateInitial" as={<div className="invalid-feedback" />} />
                                                    </div>

                                                    <label className="col-3 col-md-3 label-control" id="label_endDate">Fecha vence</label>
                                                    <div className="col-9 col-md-3 mx-auto">
                                                        <div className="position-relative has-icon-left">
                                                            <input type="date" className={`form-control ${errors.dateFinally ? 'is-invalid' : ''}`} id="dateFinally" {...register('dateFinally', { required: 'Este campo es obligatorio' })} />
                                                            <div className="form-control-position">
                                                                <i className="ft-message-square"></i>
                                                            </div>
                                                        </div>
                                                        <ErrorMessage errors={errors} name="dateFinally" as={<div className="invalid-feedback" />} />
                                                    </div>

                                                    <label className="col-3 col-md-3 label-control">Cantidad de días</label>
                                                    <div className="col-9 col-md-3">
                                                        <div className="position-relative has-icon-left">

                                                            <input type="number" step={0.5} className={`form-control ${errors.requestsDays ? 'is-invalid' : ''}`} id="requestsDays" {...register('requestsDays',
                                                                { required: 'Este campo es obligatorio', min: { value: minDays, message: `El valor debe ser igual o superior a ${minDays}` } })} />
                                                            <div className="form-control-position">
                                                                <i className="ft-message-square"></i>
                                                            </div>
                                                            <ErrorMessage errors={errors} name="requestsDays" as={<div className="invalid-feedback" />} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="action-buttons">
                                                        <label htmlFor="file_upload" className="label-fileUpload btn btn-secondary mr-1">
                                                            <i className="ft-paperclip"></i> Adjuntar archivo
                                                        </label>
                                                        <input type="file" id="file_upload" name="file_upload" accept=".jpg, .png, .pdf" onChange={ (e)=>handleFileUpload(e)} hidden />
                                                    </div>
                                                </div>

                                                <div className="form-actions text-right" id="actions">
                                                    <button type="submit" className="btn btn-primary mr-1">Solicitar</button>
                                                </div>
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