import { MDBDataTableV5 } from "mdbreact";
import { useEffect, useState } from "react";


const colRequest: any = [
        {
            label: '#',
            field: 'specialRequest_Id',
            sort: 'asc',
            width:50
        },
        {
            label: 'Fecha de creación',
            field: 'dateCreated',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Fecha inicial',
            field: 'dateInitial',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Fecha final',
            field: 'dateFinally',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Días solicitados',
            field: 'requestsDays',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Notas',
            field: 'notes',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Estado',
            field: 'state_Id',
            sort: 'asc',
            width: 150
        },
    ];
export default function DTable({ data }: any) {
    const [datatable,setDatatable]=useState<any>();
    const [dataRows, setDataRows] = useState([]);
    useEffect(() => {
        if (data) {
           setDataRows(data);
           setDatatable({
            columns: colRequest,
            rows: dataRows.map((request: any) => {
                return {
                    specialRequest_Id:request.specialRequest_Id,
                    dateCreated: formatDate(request.dateCreated),
                    dateInitial: formatDate(request.dateInitial),
                    dateFinally: formatDate(request.dateFinally),
                    requestsDays: request.requestsDays,
                    notes: request.notes,
                    state_Id: request.state_Id,
                }
            })
           });
        }
        
    })

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        // Formatea la fecha en formato "YYYY-MM-DD"
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    }

    return (
        <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />
    )
}