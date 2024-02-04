import React, {useState, Fragment} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const CreateSkill = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [skillName, setskillName] = useState('');

    const clear = () => {
        setskillName('');
    }

    const handleSave = () => {

        const data = {
            "cvid": id,
            "skillName": skillName
        }

        axios.post(applicationUrl + 'Skill/CreateSkill', data)
        .then((result) => {
            clear();
            toast.success('Skill created successfully', { closeOnClick: false });
            navigate('/' + id + '/IndexSkill');             
        }).catch((error) => {
            toast.error('Failed to create skill')
        })
    }

    return (
        <Fragment>
            <h1 className="PageName">Create Other Experience</h1>
            <div>
                <Row>
                    <Col>
                        <h4 className="d-flex mx-2">Skill</h4>
                        <input type="text" className="form-control mb-4" placeholder="Skill" value={skillName} onChange={(e) => setskillName(e.target.value)}/>
                        <button className="btn btn-primary mx-1" onClick={() => handleSave()}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default CreateSkill;