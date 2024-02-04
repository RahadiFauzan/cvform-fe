import React, { useState, useEffect, Fragment, useCallback } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const PreviewCV = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [cvID, setCvID] = useState('');
    const [cvName, setCvName] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [linkedinProfile, setLinkedinProfile] = useState('');
    const [portfolioUrl, setPortfolioUrl] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [otherExperiences, setOtherExperiences] = useState([]);
    const [skills, setSkills] = useState([]);

    const getData = useCallback(() => {
        axios.get(applicationUrl + `CV/${id}`)
            .then((result) => {
                setCvID(result.data.cvID);
                setCvName(result.data.cvName);
                setName(result.data.name);
                setPhoneNumber(result.data.phoneNumber);
                setEmailAddress(result.data.emailAddress);
                setLinkedinProfile(result.data.linkedinProfile);
                setPortfolioUrl(result.data.portfolioURL);
                setAddress(result.data.address);
                setDescription(result.data.description);
            })
            .catch((error) => {
                console.log(error)
            });

        axios.get(applicationUrl + `WorkExperience/GetWorkExperience/${id}`)
            .then((result) => {
                setWorkExperiences(result.data);
            })
            .catch((error) => {
                console.log(error)
            });

        axios.get(applicationUrl + `Education/GetEducation/${id}`)
            .then((result)=>{
                setEducations(result.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        axios.get(applicationUrl + `OtherExperience/GetOtherExperience/${id}`)
            .then((result)=>{
                setOtherExperiences(result.data)
            })
            .catch((error)=>{
                console.log(error)
            })
        axios.get(applicationUrl + `Skill/GetSkill/${id}`)
            .then((result)=>{
                setSkills(result.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }, [id]);

    useEffect(() => {
        getData();
    }, [getData]);

    return (
        <div>
            <div className="cv-container"> {/* Add a wrapper div with a class for styling */}
                <div className="cv-content"> {/* Add a div for the main content */}
                    <Row>
                        <Col>
                            <h4><strong>{name}</strong></h4>
                            <div className="personal-info">
                                {phoneNumber && <p>{phoneNumber} {emailAddress && "|"}</p>}
                                {emailAddress && <p>{emailAddress} {linkedinProfile && "|"}</p>}
                                {linkedinProfile && <p>{linkedinProfile} {portfolioUrl && "|"}</p>}
                                {portfolioUrl && <p>{portfolioUrl}</p>}
                            </div>
                            <p className="mb-2">{address}</p>
                            <p>{description}</p>
                            {workExperiences.length > 0 && (
                                <Fragment>
                                    <h2 className="section-heading">Work Experiences</h2>
                                    <div className="section">
                                        {workExperiences.map((workExp, index) => (
                                            <div key={index}>
                                                <div className="period-section">
                                                    <p><strong>{workExp.companyName}</strong> - {workExp.location}</p>
                                                    <p>{workExp.startDate} - {workExp.endDate}</p>
                                                </div>
                                                <p>{workExp.role}</p>
                                                <p>{workExp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Fragment>
                            )}
                            {educations.length > 0 && (
                                <Fragment>
                                    <h2 className="section-heading">Educations</h2>
                                    <div className="section">
                                        {educations.map((ed, index) => (
                                            <div key={index}>
                                                <div className="period-section">
                                                    <p><strong>{ed.school}</strong> - {ed.location}</p>
                                                    <p>{ed.startDate} - {ed.endDate}</p>
                                                </div>
                                                <p>{ed.degree} degree in {ed.major}, {ed.gpa}</p>
                                                <p>{ed.description}</p>
                                                {ed.certificateLink && (
                                                    <p>
                                                        <a href={ed.certificateLink} target="_blank" rel="noopener noreferrer">
                                                            See Certificate
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Fragment>
                            )}
                            {otherExperiences.length > 0 && (
                                <Fragment>
                                    <h2 className="section-heading">Other Experiences</h2>
                                    <div className="section">
                                        {otherExperiences.map((otherExp, index) => (
                                            <div key={index}>
                                                <div className="period-section">
                                                    <p><strong>{otherExp.organizationName}</strong></p>
                                                    <p>{otherExp.startDate} - {otherExp.endDate}</p>
                                                </div>
                                                <p>{otherExp.role}</p>
                                                <p>{otherExp.description}</p>
                                                {otherExp.certificateLink !== "" && (
                                                    <p>
                                                        <a href={otherExp.certificateLink} target="_blank" rel="noopener noreferrer">
                                                            See Certificate
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Fragment>
                            )}
                            {skills.length > 0 && (
                                <Fragment>
                                <h2 className="section-heading">Skills</h2>
                                <div className="section">
                                    {skills.map((skill, index) => (
                                        <div key={index}>
                                            <p>{skill.skillName}</p>
                                        </div>
                                    ))}
                                </div>
                                </Fragment>
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
            <button className="btn btn-secondary mx-1 mt-4" onClick={() => navigate('/')}>Home</button>
        </div>
    )
}

export default PreviewCV;
