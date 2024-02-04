import React, {useState, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const CreateOtherExperience = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [organizationName, setorganizationName] = useState('');
    const [role, setrole] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [description, setDescription] = useState('');
    const [certificateLink, setcertificateLink] = useState('');

    const clear = () => {
        setorganizationName('');
        setrole('');
        setstartDate('');
        setendDate('');
        setDescription('');
        setcertificateLink('');
    }

    const handleSave = () => {

        const data = {
            "cvid": id,
            "organizationName": organizationName,
            "role": role,
            "startDate": startDate,
            "endDate": endDate,
            "description": description,
            "certificateLink": certificateLink
        }

        axios.post(applicationUrl + 'OtherExperience/CreateOtherExperience', data)
        .then((result) => {
            clear();
            toast.success('Experience created successfully', { closeOnClick: false });
            navigate('/' + id + '/IndexOtherExperience');             
        }).catch((error) => {
            toast.error('Failed to create Experience')
        })
    }

    return (
        <Fragment>
            <h1 className="PageName">Create Other Experience</h1>
            <div>
                <Row>
                    <Col>
                        <h4 className="d-flex mx-2">Organization Name</h4>
                        <input type="text" className="form-control mb-4" placeholder="Organization Name" value={organizationName} onChange={(e) => setorganizationName(e.target.value)}/>
                        <h4 className="d-flex mx-2">Role</h4>
                        <input type="text" className="form-control mb-4" placeholder="Role" value={role} onChange={(e) => setrole(e.target.value)}/>
                        <h4 className="d-flex mx-2">Start Date</h4>
                        <input type="text" className="form-control mb-4" placeholder="December 2022" value={startDate} onChange={(e) => setstartDate(e.target.value)}/>
                        <h4 className="d-flex mx-2">End Date</h4>
                        <input type="text" className="form-control mb-4" placeholder="December 2022" value={endDate} onChange={(e) => setendDate(e.target.value)}/>
                        <h4 className="d-flex mx-2">Description</h4>
                        <textarea type="text" className="form-control mb-4" placeholder="Brief description about your experience" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <h4 className="d-flex mx-2">Certificate Link</h4>
                        <input type="text" className="form-control mb-4" placeholder="certificate link if available" value={certificateLink} onChange={(e) => setcertificateLink(e.target.value)}/>
                        <button className="btn btn-primary mx-1" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default CreateOtherExperience;