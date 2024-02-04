import React, {useState, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const CreateCV = () => {

    const navigate = useNavigate();

    const [cvname, setCVName] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [linkedinProfile, setLinkedinProfile] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const clear = () => {
        setCVName('');
        setName('');
        setPhoneNumber('');
        setEmailAddress('');
        setLinkedinProfile('');
        setPortfolioUrl('');
        setAddress('');
        setDescription('');
    }

    const handleSave = () => {
        if (!cvname.trim()) {
            toast.error('CV title must not be empty');
            return; // Prevent further execution
        }

        const data = {
            "cvName": cvname,
            "name": name,
            "phoneNumber": phoneNumber,
            "emailAddress": emailAddress,
            "linkedinProfile": linkedinProfile,
            "portfolioURL": portfolioUrl,
            "address": address,
            "description": description,
        }

        axios.post(applicationUrl + 'CV', data)
        .then((result) => {
            const createdCVId = result.data.cvid;
            clear();
            toast.success('CV created successfully', { closeOnClick: false });
            navigate('/' + createdCVId + '/IndexWorkExperience');             
        }).catch((error) => {
            toast.error('Failed to create CV')
        })
    }

    return (
        <Fragment>
            <h1 className="PageName">Create CV</h1>
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
                        <button className="btn btn-primary mx-1" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default CreateCV;