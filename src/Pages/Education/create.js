import React, {useState, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const CreateEducation= () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [school, setschool] = useState('');
    const [location, setlocation] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [degree, setdegree] = useState('');
    const [major, setmajor] = useState('');
    const [gpa, setgpa] = useState(0.00);
    const [description, setdescription] = useState('');
    const [certificateLink, setcertificateLink] = useState('');

    const clear = () => {
        setschool('');
        setlocation('');
        setstartDate('');
        setendDate('');
        setdegree('');
        setmajor('');
        setgpa('');
        setdescription('');
        setcertificateLink('');
    }

    const handleSave = () => {

        const data = {
            "cvid": id,
            "school": school,
            "location": location,
            "startDate": startDate,
            "endDate": endDate,
            "degree": degree,
            "major": major,
            "gpa": gpa,
            "description": description,
            "certificateLink": certificateLink
        }

        axios.post(applicationUrl + 'Education/CreateEducation', data)
        .then((result) => {
            clear();
            toast.success('Education created successfully', { closeOnClick: false });
            navigate('/' + id + '/IndexEducation');             
        }).catch((error) => {
            toast.error('Failed to create education')
        })
    }

    return (
        <Fragment>
            <h1 className="PageName">Create Education</h1>
            <div>
                <Row>
                    <Col>
                        <h4 className="d-flex mx-2">School</h4>
                        <input type="text" className="form-control mb-4" placeholder="School name" value={school} onChange={(e) => setschool(e.target.value)}/>
                        <h4 className="d-flex mx-2">Location</h4>
                        <input type="text" className="form-control mb-4" placeholder="Location" value={location} onChange={(e) => setlocation(e.target.value)}/>
                        <h4 className="d-flex mx-2">Start Date</h4>
                        <input type="text" className="form-control mb-4" placeholder="December 2022" value={startDate} onChange={(e) => setstartDate(e.target.value)}/>
                        <h4 className="d-flex mx-2">End Date</h4>
                        <input type="text" className="form-control mb-4" placeholder="December 2022" value={endDate} onChange={(e) => setendDate(e.target.value)}/>
                        <h4 className="d-flex mx-2">Degree</h4>
                        <input type="text" className="form-control mb-4" placeholder="Bachelor" value={degree} onChange={(e) => setdegree(e.target.value)}/>
                        <h4 className="d-flex mx-2">Major</h4>
                        <input type="text" className="form-control mb-4" placeholder="Computer Science" value={major} onChange={(e) => setmajor(e.target.value)}/>
                        <h4 className="d-flex mx-2">GPA</h4>
                        <input type="text" className="form-control mb-4" placeholder="3.00" value={gpa} onChange={(e) => setgpa(e.target.value)}/>
                        <h4 className="d-flex mx-2">Description</h4>
                        <textarea type="text" className="form-control mb-4" placeholder="Brief description about your school/achievement" value={description} onChange={(e) => setdescription(e.target.value)}/>
                        <h4 className="d-flex mx-2">Certificate Link</h4>
                        <textarea type="text" className="form-control mb-4" placeholder="Ijazah/SKL if available" value={certificateLink} onChange={(e) => setcertificateLink(e.target.value)}/>
                        <button className="btn btn-primary mx-1" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default CreateEducation;