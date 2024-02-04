import React, {useState, useEffect, Fragment, useCallback} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { applicationUrl } from "../../AppConfig";

const EditSkill = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [ID, setID] = useState('');
    const [cvID, setCVID] = useState('');
    const [skillName, setskillName] = useState('');

    const getData = useCallback(() => {
        axios.get(applicationUrl + `Skill/GetSkillDetail/${id}`)
        .then((result)=>{
            setID(id);
            setCVID(result.data.cvid);
            setskillName(result.data.skillName);
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
            "SkillID": ID,
            "cvid": cvID,
            "skillName": skillName
        }
        axios.put(applicationUrl + `Skill/UpdateSkill/${ID}`, data)
        .then((result) => {
            getData();
            toast.success('Skill has been updated', { closeOnClick: false });
            navigate("/" + cvID + '/IndexSkill'); 
        }).catch((error) => {
            toast.error(error);
        })
    }
    
    return(
        <Fragment>
            <h1 className="PageName">Edit Skill</h1>
            <div>
                <Row>
                    <Col>
                        <h4 className="d-flex mx-2">Skill</h4>
                        <input type="text" className="form-control mb-4" placeholder="Skill" value={skillName} onChange={(e) => setskillName(e.target.value)}/>
                        <button className="btn btn-primary mx-1" onClick={() => handleUpdate()}>Update</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
      )

}

export default EditSkill;