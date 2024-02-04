import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { applicationUrl } from "../../AppConfig";
import { Link } from 'react-router-dom';

const IndexCV = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get(applicationUrl + 'CV')
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this CV?") === true){
            axios.delete(applicationUrl + `CV/${id}`)
            .then((result) => {
                if(result.status === 200){
                    getData();
                    toast.success('CV has been deleted', { closeOnClick: false });
                }
            }).catch((error) => {
                toast.error(error);
            })
        }
    }

    return (
        <Fragment>         
            <h1 className="PageName">CV List</h1>   
            <div className="CreateCVCont">
                <Link to={"CreateCV"} className="CreateCV" style={{ textDecoration: 'none' }}>+</Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ? data.map((item, index)=>{
                            return(
                            <tr key = {index}>
                                <td>{index + 1}</td>
                                <td>{item.cvName}</td>
                                <td colSpan={3}>
                                    <Link to={`/PreviewCV/${item.cvid}`} className="btn btn-warning mx-1">See</Link>
                                    <Link to={`/EditCV/${item.cvid}`} className="btn btn-primary mx-1">Edit</Link>
                                    <button className="btn btn-danger mx-1" onClick={() => handleDelete(item.cvid)}>Delete</button>
                                </td>
                            </tr>                    
                            )
                        })
                        :
                        'No data yet'
                    }
                </tbody>
            </Table>
        </Fragment>
    )

}

export default IndexCV;