import React, {useState, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const CreateWorkExperience = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [companyName, setcompanyName] = useState('');
    const [role, setrole] = useState('');
    const [location, setlocation] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [description, setDescription] = useState('');

    const clear = () => {
        setcompanyName('');
        setrole('');
        setlocation('');
        setstartDate('');
        setendDate('');
        setDescription('');
    }

    const handleSave = () => {

        const data = {
            "cvid": id,
            "companyName": companyName,
            "role": role,
            "location": location,
            "startDate": startDate,
            "endDate": endDate,
            "description": description
        }

        axios.post(applicationUrl + 'WorkExperience/CreateWorkExperience', data)
        .then((result) => {
            clear();
            toast.success('Experience created successfully', { closeOnClick: false });
            navigate('/' + id + '/IndexWorkExperience');             
        }).catch((error) => {
            toast.error('Failed to create Experience')
        })
    }

    return (
        <Fragment>
            <h1 className="PageName">Create Work Experience</h1>
            <div>
                <Row>
                    <Col>
                        <h4 className="d-flex mx-2">Company Name</h4>
                        <input type="text" className="form-control mb-4" placeholder="Company Name" value={companyName} onChange={(e) => setcompanyName(e.target.value)}/>
                        <h4 className="d-flex mx-2">Role</h4>
                        <input type="text" className="form-control mb-4" placeholder="Role" value={role} onChange={(e) => setrole(e.target.value)}/>
                        <h4 className="d-flex mx-2">Location</h4>
                        <input type="text" className="form-control mb-4" placeholder="Location" value={location} onChange={(e) => setlocation(e.target.value)}/>
                        <h4 className="d-flex mx-2">Start Date</h4>
                        <input type="text" className="form-control mb-4" placeholder="December 2022" value={startDate} onChange={(e) => setstartDate(e.target.value)}/>
                        <h4 className="d-flex mx-2">End Date</h4>
                        <input type="text" className="form-control mb-4" placeholder="December 2022" value={endDate} onChange={(e) => setendDate(e.target.value)}/>
                        <h4 className="d-flex mx-2">Description</h4>
                        <textarea type="text" className="form-control mb-4" placeholder="Brief description about your job" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <button className="btn btn-primary mx-1" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default CreateWorkExperience;