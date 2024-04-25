import React, { useEffect } from 'react'
// import { useState } from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

function AddRoles() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [roleID, setRoleId] = useState()
    const [roleName, setRoleName] = useState()

    const showhandle = (role) => {
        setRoleId(role.roleid)
        setRoleName(role.rolename)
        handleShow()
    }
    const handleShow = () => {

        setShow(true);
    }

    const [data, setData] = useState({
        roleid: '',
        rolename: ''
    })

    const navigate = useNavigate()


    // const { roleid } = useParams()
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(roleid)
        axios.put(`http://localhost:5000/api/adminRole_update/${roleID}`, { roleID, roleName })
            .then(result => {
                console.log(result);

                if (result.data.Status) {
                    navigate('/dashboard/addRoles')
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))
    }

    /////////////////////////////////////////////////////////////////////

    const handlepost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/adminRole', data)
            .then((res) => {
                console.log(res)
                alert('Role data post Successfully...')
            }).catch((err) => {
                console.log(err)
            })
    }

    const [showdata, setShowdata] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/adminRole_get')
            .then((res) => {
                console.log(res)
                setShowdata(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    ///////////////// Searching Code Start  ///////////////

    const [search, setSearch] = useState('');

    const filterItems = showdata.filter((item) =>
        item.rolename.toLowerCase().includes(search.toLowerCase())
    )

    /////////////////   Searching Code End  //////////////

    ///////////////     Pagination code Start   ////////////

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;


    const totalPages = Math.ceil(filterItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filterItems.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/adminRole_get")
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    })

    /////////////////     Pagination Code End   //////////

    return (
        <div className='d-flex justify-content-center align-items-center ' style={{ marginTop: "100px", marginLeft: '200px' }}>
            <div className='p-3 rounded  border shadow-lg p-3 mb-5 bg-white rounded' style={{ width: '300px', height: '300px' }}>
                <h5 style={{ marginLeft: '30px' }}>Add Roles</h5>
                <form className='row g-1' onSubmit={handlepost}>

                    <div className='d-flex ' style={{ gap: "20px" }}>

                        <div style={{ marginLeft: "32px" }}>

                            <div className='col-12'>
                                <label htmlFor="inputId" className='form-label' style={{ color: 'black' }}>
                                    Role_id
                                </label>
                                <input type="text"
                                    className='form-control rounded-0'
                                    id='inputId'
                                    placeholder='Enter Role Id' onChange={(e) => setData({ ...data, roleid: e.target.value })} />
                            </div>

                            <div className='col-12'>
                                <label htmlFor="inputName" className='form-label' style={{ color: 'black' }}>
                                    Name
                                </label>
                                <input type="text"
                                    className='form-control rounded-0'
                                    id='inputName'
                                    placeholder='Enter Name' onChange={(e) => setData({ ...data, rolename: e.target.value })} />
                            </div>

                        </div>
                    </div>
                    <div className='col-12' style={{ marginLeft: '33px', marginTop: '10px' }}>
                        <button type='submit' className='btn btn-primary ' style={{ width: '205px' }}>
                            Add Role
                        </button>
                    </div>
                </form>
            </div>

            <div className='p-3 rounded  border shadow-lg p-3 mb-5 bg-white rounded' style={{ width: '300px', marginLeft: '50px', height: '300px' }}>
                <h5 style={{ textAlign: 'center' }}>View Roles</h5>

                {/* Search */}
                <div class="form-group" style={{ width: "200px", marginLeft: '5px' }} >
                    <input type="search" class="form-control" id="exampleInputSearch"
                        value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search with Role Name" />
                </div>
                {/* Search End */}

                <Table striped bordered hover style={{ marginTop: '5px' }}>
                    <thead>
                        <tr>
                            <th>Role Id</th>
                            <th>Role Name</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemsToDisplay.map((item) =>
                                <tr>
                                    <td>{item.roleid}</td>
                                    <td>{item.rolename}</td>
                                    <td>
                                        <Button variant="primary" onClick={e => showhandle(item)}>
                                            Update
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>

                {/* Paging Start */}
                <nav aria-label='Page navigation'>
                    <ul className='pagination' style={{ justifyContent: 'center', marginTop: '0px' }}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li key={index + 1}
                                className={`page-item $ {currentPage === index + 1 ? 'active':''}`}>
                                <button className='page-link' onClick={() =>
                                    handlePageChange(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                {/* Paging End */}

            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className='col-12'>
                            <label htmlFor="inputId" className='form-label'>
                                Role_id
                            </label>
                            <input type="text"
                                className='form-control rounded-0'
                                id='inputId'
                                placeholder={roleID} />
                        </div>

                        <div className='col-12'>
                            <label htmlFor="inputName" className='form-label'>
                                Role Name
                            </label>
                            <input type="text"
                                className='form-control rounded-0'
                                id='inputName'
                                value={roleName}
                                placeholder='Enter Role Name' onChange={(e) => setRoleName(e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" type='submit' onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default AddRoles;




