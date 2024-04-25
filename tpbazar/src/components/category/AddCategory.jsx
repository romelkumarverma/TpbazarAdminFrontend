// import React, { Children, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

import { useEffect, useState } from 'react';
import axios from 'axios';


function AddCategory() {
    const [showdata, setShowdata] = useState([])
    const [data, setData] = useState({
        categoryid: "",
        categoryname: ""
    })

    // const [update, setUpdate] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const [categoryID, setCategoryId] = useState()
    const [categoryName, setCategoryName] = useState()

    const showhandle = (role) => {
        setCategoryId(role.categoryid)
        setCategoryName(role.categoryname)
        handleShow()
    }
    const handleShow = () => {

        setShow(true);
    }

    const handlePost = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/admin/category/addcategory', data)
            .then((res) => {
                console.log(res);
                alert('Data post successfully...')
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleget = () => {
        axios.get(`http://localhost:5000/api/admin/category`)
            .then((res) => {
                console.log(res)
                setShowdata(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        handleget()
    }, [])


    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/admin/category/updatecategory/${categoryID}`, { categoryID, categoryName })
            .then((res) => {
                console.log(res)
                alert("Category data update successfully...")
                handleClose();
            }).catch((err) => {
                console.log(err)
            })
    }

    ///////////////// Searching Code Start  ///////////////

    const [search, setSearch] = useState('');

    const filterItems = showdata.filter((item) =>
        item.categoryname.toLowerCase().includes(search.toLowerCase())
    )

    /////////////////   Searching Code End  //////////////


    /////////////   Pagination Code Start   ////////////

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;


    const totalPages = Math.ceil(filterItems.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filterItems.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/admin/category")
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
    })

    /////////////// Pagination Code End     ////////////////

    return (
        <div className='d-flex justify-content-center aligns-items-center' style={{ marginTop: "50px", marginLeft: "140px", width: '100%' }}>
            <div className='p-3 rounded border shadow-lg p-3 mb-5 bg-white rounded' style={{ width: "300px", marginTop: '40px' }}>
                <h4 style={{ textAlign:'center',color: 'teal' }}>Add Category</h4>
                <form className='row g-1' onSubmit={handlePost} style={{ marginTop: '20px' }}>

                    <div className='col-12'>
                        <label htmlFor="inputId" className='form-label'>
                            Category Id
                        </label>
                        <input type="text"
                            className='form-control rounded-0'
                            id='inputId'
                            placeholder='Enter Category Id' onChange={(e) => setData({ ...data, categoryid: e.target.value })} />
                    </div>

                    <div className='col-12'>
                        <label htmlFor="inputName" className='form-label'>
                            Category Name
                        </label>
                        <input type="text"
                            className='form-control rounded-0'
                            id='inputName'
                            placeholder='Enter Category Name' onChange={(e) => setData({ ...data, categoryname: e.target.value })} />
                    </div>

                    <div className='col-12'>
                        <button type='submit' className='btn btn-primary w-100' style={{ marginTop: '30px' }}>
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            <div className='p-3 rounded-border shadow-lg p-3 mb-5 bg-white rounded' style={{ width: "400px", marginLeft: "50px", marginTop: '33px' }}>

                {/* Search Start */}
                <div class="form-group" style={{ width: "250px" }} >
                    <input type="search" class="form-control" id="exampleInputSearch"
                        value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search with Category Name" />
                </div>
                {/* Search End */}

                <Table striped bordered hover style={{ marginTop: '10px' }}>
                    <thead>
                        <tr>
                            <th>Category Id</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itemsToDisplay.map((item) => {
                                return (<>
                                    <tr>
                                        <td>{item.categoryid}</td>
                                        <td>{item.categoryname}</td>
                                        <td>
                                            <Button variant='primary' onClick={e => showhandle(item)}>
                                                Update
                                            </Button>
                                        </td>
                                    </tr>
                                </>)
                            })
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
                    <Modal.Title style={{justifyContent:'center', color:'teal'}}>Update Category Name: {categoryID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form >
                        <div className='col-12'>
                            <label htmlFor="inputId" className='form-label'>
                                Category Id
                            </label>
                            <input type="text"
                                className='form-control rounded-0'
                                id='inputId'
                                placeholder='Enter category id' value={categoryID} />
                        </div>

                        <div className='col-12'>
                            <label htmlFor="inputName" className='form-label'>
                                Category Name
                            </label>
                            <input type="text"
                                className='form-control rounded-0'
                                id='inputName'

                                placeholder='Enter Role Name' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" type='submit' onClick={handleUpdate} >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddCategory