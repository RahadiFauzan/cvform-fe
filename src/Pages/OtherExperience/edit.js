import React, {useState, useEffect, Fragment, useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const EditOtherExperience = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ID, setID] = useState('');
    const [cvID, setCVID] = useState('');
    const [organizationName, setorganizationName] = useState('');
    const [role, setrole] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [description, setDescription] = useState('');
    const [certificateLink, setcertificateLink] = useState('');

    const getData = useCallback(() => {
        axios.get(applicationUrl + `OtherExperience/GetOtherExperienceDetail/${id}`)
        .then((result)=>{
            setID(id);
            setCVID(result.data.cvid);
            setorganizationName(result.data.organizationName);
            setrole(result.data.role);
            setstartDate(result.data.startDate);
            setendDate(result.data.endDate);
            setDescription(result.data.description);
            setcertificateLink(result.data.certificateLink);
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [id])

    useEffect(() => {
        getData();
    },[getData])

    const handleUpdate = () => {

        const data ={
            "OtherExperienceID": ID,
            "cvid": cvID,
            "organizationName": organizationName,
            "role": role,
            "startDate": startDate,
            "endDate": endDate,
            "description": description,
            "certificateLink": certificateLink
        }
        axios.put(applicationUrl + `OtherExperience/UpdateOtherExperience/${ID}`, data)
        .then((result) => {
            getData();
            toast.success('Experience has been updated', { closeOnClick: false });
            navigate("/" + cvID + '/IndexOtherExperience'); 
        }).catch((error) => {
            toast.error(error);
        })
    }
    
    return(
        <Fragment>
            <h1 className="PageName">Edit Other Experience</h1>
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
                        <button className="btn btn-primary mx-1" onClick={() => handleUpdate()}>Update</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
      )

}

export default EditOtherExperience;