import React, {useState, useEffect, Fragment, useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const EditCV = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ID, setID] = useState('');
    const [cvname, setCVName] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [linkedinProfile, setLinkedinProfile] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const getData = useCallback(() => {
        axios.get(applicationUrl + `CV/${id}`)
        .then((result)=>{
            setID(id);
            setCVName(result.data.cvName);
            setName(result.data.name);
            setPhoneNumber(result.data.phoneNumber);
            setEmailAddress(result.data.emailAddress);
            setLinkedinProfile(result.data.linkedinProfile);
            setPortfolioUrl(result.data.portfolioURL);
            setAddress(result.data.address);
            setDescription(result.data.description);
        })
        .catch((error)=>{
            console.log(error)
        })
    }, [id])

    useEffect(() => {
        getData();
    },[getData])

    const handleUpdate = () => {
        if (!cvname.trim()) {
            toast.error('CV title must not be empty');
            return; // Prevent further execution
        }

        const data ={
            "cvid": ID,
            "cvName": cvname,
            "name": name,
            "phoneNumber": phoneNumber,
            "emailAddress": emailAddress,
            "linkedinProfile": linkedinProfile,
            "portfolioURL": portfolioUrl,
            "address": address,
            "description": description
        }
        axios.put(applicationUrl + `CV/${ID}`, data)
        .then((result) => {
            getData();
            toast.success('CV has been updated', { closeOnClick: false });
            navigate("/" + ID + '/IndexWorkExperience'); 
        }).catch((error) => {
            toast.error(error);
        })
    }
    
    return(
        <Fragment>
            <h1 className="PageName">Edit CV</h1>
            <div>
                <Row>
                    <Col>
                        <h4 className="d-flex mx-2">CV Title</h4>
                        <input type="text" className="form-control mb-4" placeholder="Enter CV Title" value={cvname} onChange={(e) => setCVName(e.target.value)}/>
                        <h4 className="d-flex mx-2">Your Name</h4>
                        <input type="text" className="form-control mb-4" placeholder="John" value={name} onChange={(e) => setName(e.target.value)}/>
                        <h4 className="d-flex mx-2">Phone Number</h4>
                        <input type="text" className="form-control mb-4" placeholder="081234567890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                        <h4 className="d-flex mx-2">Email</h4>
                        <input type="email" className="form-control mb-4" placeholder="john@email.com" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
                        <h4 className="d-flex mx-2">Linkedin</h4>
                        <input type="text" className="form-control mb-4" placeholder="https://linkedin.com/" value={linkedinProfile} onChange={(e) => setLinkedinProfile(e.target.value)}/>
                        <h4 className="d-flex mx-2">Portfolio</h4>
                        <input type="text" className="form-control mb-4" placeholder="https://portfolio.com/" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)}/>
                        <h4 className="d-flex mx-2">Address</h4>
                        <input type="text" className="form-control mb-4" placeholder="Jakarta street" value={address} onChange={(e) => setAddress(e.target.value)}/>
                        <h4 className="d-flex mx-2">Description</h4>
                        <textarea className="form-control mb-4" placeholder="Brief explanation about yourself" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <button className="btn btn-primary mx-1" onClick={() => handleUpdate()}>Update</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
      )

}

export default EditCV;