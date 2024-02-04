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

const IndexEducation = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(applicationUrl + `Education/GetEducation/${id}`)
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (educationid) => {
        if(window.confirm("Are you sure you want to delete this Education?") === true){
            axios.delete(applicationUrl + `Education/DeleteEducation/${educationid}`)
            .then((result) => {
                if(result.status === 200){
                    getData();
                    toast.success('Education has been deleted', { closeOnClick: false });
                }
            }).catch((error) => {
                toast.error(error);
            })
        }
    }

    return (
        <Fragment>         
            <h1 className="PageName">Education</h1>   
            <div className="CreateCVCont">
                <Link to={"CreateEducation"} className="CreateCV" style={{ textDecoration: 'none' }}>+</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ? data.map((item, index)=>{
                            return(
                            <tr key = {index}>
                                <td>{index + 1}</td>
                                <td>{item.school}</td>
                                <td>{item.degree}</td>
                                <td colSpan={2}>
                                    <Link to={`/EditEducation/${item.educationID}`} className="btn btn-primary mx-1">Edit</Link>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(item.educationID)}>Delete</button>
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
                        <button className="btn btn-primary mx-1" onClick={() => navigate('/' + id + '/IndexOtherExperience')}>Submit</button>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )

}

export default IndexEducation;