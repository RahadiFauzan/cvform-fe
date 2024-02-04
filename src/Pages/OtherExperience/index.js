import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { applicationUrl } from "../../AppConfig";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";

const IndexOtherExperience = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(applicationUrl + `OtherExperience/GetOtherExperience/${id}`)
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (otherid) => {
        if(window.confirm("Are you sure you want to delete this experience?") === true){
            axios.delete(applicationUrl + `OtherExperience/DeleteOtherExperience/${otherid}`)
            .then((result) => {
                if(result.status === 200){
                    getData();
                    toast.success('Experience has been deleted', { closeOnClick: false });
                }
            }).catch((error) => {
                toast.error(error);
            })
        }
    }

    return (
        <Fragment>         
            <h1 className="PageName">Other Experience</h1>   
            <div className="CreateCVCont">
                <Link to={"CreateOtherExperience"} className="CreateCV" style={{ textDecoration: 'none' }}>+</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Organization</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ? data.map((item, index)=>{
                            return(
                            <tr key = {index}>
                                <td>{index + 1}</td>
                                <td>{item.organizationName}</td>
                                <td>{item.role}</td>
                                <td colSpan={2}>
                                    <Link to={`/EditOtherExperience/${item.otherExperienceID}`} className="btn btn-primary mx-1">Edit</Link>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(item.otherExperienceID)}>Delete</button>
                                </td>
                            </tr>                    
                            )
                        })
                        :
                        'No data yet'
                    }
                </tbody>
            </Table>
            <div>
                <Row>
                    <Col>
                        <button className="btn btn-primary mx-1" onClick={() => navigate('/' + id + '/IndexSkill')}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default IndexOtherExperience;