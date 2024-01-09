import "../assets/css/core/menu/menu-types/vertical-menu-modern.module.css"
import "../assets/css/core/colors/palette-gradient.module.css"
import "../styles/custom.module.css"
import Layout from "../components/layout"
import {useForm,SubmitHandler} from "react-hook-form"
import RequestForm from "../components/formRequest"


export default function EmployeeRequest() {
    return (
        <div>
            <Layout>
                <RequestForm/>
            </Layout>
        </div>

    )
}