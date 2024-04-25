import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './toggle.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function ShowUsers() {

  ////////////  View Role Start  //////////
  const [viewRole3, setViewRole3] = useState([])
  const [show3, setShow3] = useState(false);
  const [deletedata, setDeleteData] = useState()
  const handleClose3 = () => setShow3(false);
  const handleShow3 = (uid) => {
    setDeleteData(uid)
    console.log(uid)
    axios.get(`http://localhost:5000/api/admin/rolecheck/${uid}`)
    .then((res)=>{
      setViewRole3(res.data.result)
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
    setShow3(true)
  };

  ///////// View Role End   //////////

  /////////   assign    ////////

  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const [showroleid, setShowRoleId] = useState([])
  //  console.log(showroleid)
  const handleShow2 = (uid) => {
    // console.log(uid)
    setShowRoleId(uid)
    setShow2(true);
  }
  ///////////////////////////////

  const [lgShow, setLgShow] = useState(false);
  const [idshow, setIdshow] = useState()


  const handleShosomedata = (uid) => {
    console.log(uid)
    setIdshow(uid)
    setLgShow(true)
  }



  const [view, setView] = useState([]);

  /////////   For Search    ///////////////
  const [search, setSearch] = useState('')
  //////////////////////////////////////////////

  const handleShow = () => {
    axios.get('http://localhost:5000/api/get_users')
      .then((res) => {
        console.log(res)
        setView(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  const [useData, setUseData] = useState([])
  const getDataByid = (idshow) => {
    console.log(idshow)
    axios.get(`http://localhost:5000/api/user/get/${idshow}`)
      .then((res) => {
        console.log(res)
        setUseData(res.data)
      }).catch((err) => console.log(err))
  }

  useEffect(() => {
    handleShow()
    console.log(idshow)
    if (idshow !== null) {
      getDataByid(idshow)
    }

  }, [idshow])

  ////////////    Status Activate and Deactive  Start  ///////////////////

  async function activeStatus(uid) {
    let responce = await axios.put(`http://localhost:5000/api/user_status?status=active&uid=${uid}`)
    console.log(responce)
  }

  async function deactiveStatus(uid) {
    let responce = await axios.put(`http://localhost:5000/api/user_status?status=deactive&uid=${uid}`)
  }

  //////////////  Status Activate and Deactive End  ////////////////////////

  /////////////////   Searching  Start  //////////

  const filterItems = view.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  ////////////////  Searching End    //////////////////

  ////////////   FOR PAGES Starts   ////////////

  //const [data, setData] = useState([])
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
    axios.get("http://localhost:5000/api/get_users")
      .then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  })

  //////////////////////  Pages Ends  /////////////////////////

  ///////////////////   Role ASSIgn   Starts  ////////////

  const [roleData, setRoleData] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/api/adminRole_get")
      .then((res) => {
        console.log("hiii",res)
        setRoleData(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  const [roleid, setAssignRole] = useState()
  const handleRoleAssign = (uid, roleid) =>{
    axios.post('http://localhost:5000/api/admin/rolecheck',{uid, roleid})
    .then((res)=>{
      console.log(res)
      handleClose2()
    }).catch((err)=>{
      console.log(err)
    })
  }

  ////////////////////  Role Assign End  //////////////

  ////////////////  Delete Multiple Role Start   ////////////

  const handleDelete = (deletedata, roleid) =>{
    
    // setViewRole3(uid)
    console.log('romel', deletedata, roleid)
    // setShowRoleId(uid)
    axios.delete(`http://localhost:5000/api/delete/role/${deletedata}/${roleid}`)
    .then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  }

  //////////////////  Delete Multiple Role End  ////////////////

  return (
    <div style={{ width: '100%', marginLeft: '120px', marginTop: '30px' }} className='shadow-lg p-3 mb-5 bg-white rounded'>
      <h3 style={{ textAlign: 'center', color: 'teal' }}>USER DETAILS</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <div class="form-group" style={{ width: "200px", }} >
          <input type="search" class="form-control" id="exampleInputSearch"
            value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search with Name" />
        </div>
        <div>
          <Link to='/dashboard/add_user'><button type='submit' className='btn btn-primary' style={{ width: '200px' }}>
            Add User
          </button >
          </Link>
        </div>
      </div>

      <div className='table-responsive' style={{ marginTop: '20px' }}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">userId</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Dob</th>
              <th scope="col">photo</th>
              <th scope='col'>Roles</th>
              <th></th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              itemsToDisplay.map((item) =>
                <tr>
                  <td>{item.uid}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.mobile}</td>
                  <td>{item.dob}</td>

                  <td>{
                    <img src={`http://localhost:5000/images/${item.photo}`} alt='' style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                  }</td>

                  {/* for Assign Role */}
                  <td>{
                    <Button variant="primary" onClick={() => handleShow2(item.uid)}>
                      Assign
                    </Button>
                  }</td>

                  <td>{
                    <Button variant="primary" onClick={() =>handleShow3(item.uid)}>
                    View
                  </Button>
                  }</td>

                  {/* End Assign Role */}

                  <td>{
                    item.status === 'deactive' ? (
                      <label class="switch">
                        <input type="checkbox" onChange={(e) => activeStatus(item.uid, e)} />
                        <span class="slider round"></span> </label>
                    )
                      :
                      (
                        <label class="switch">
                          <input type="checkbox" defaultChecked onChange={(e) => deactiveStatus(item.uid, e)} />
                          <span class="slider round"></span></label>
                      )
                  }</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <Button onClick={() => handleShosomedata(item.uid)}><i class="bi bi-eye"></i></Button>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <Link to={`/dashboard/editUser/` + item.uid}><button className='btn btn-info btn-sm me-2'><i class="bi bi-pencil"></i></button></Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

        {/* Pagination  Start*/}

        <nav aria-label='Page navigation'>
          <ul className='pagination' style={{ justifyContent: 'center' }}>
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

        {/* Pagination End */}

      </div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">


          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th scope='col'>Aadhar</th>
                <th scope="col">Doj</th>
                <th scope="col">Qualification</th>
                <th scope="col">Address</th>
                <th scope="col">State</th>
                <th scope="col">City</th>
                <th scope="col">Pin</th>

              </tr>
            </thead>
            <tbody>
              {
                useData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.aadhar}</td>
                      <td>{item.doj}</td>
                      <td>{item.qualification}</td>
                      <td>{item.address}</td>
                      <td>{item.state}</td>
                      <td>{item.city}</td>
                      <td>{item.pin}</td>
                    </tr>

                  )
                })
              }
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      {/* Assign Role start Step 3*/}

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'teal' }}>Add Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>User ID</label><br></br>
          <input type='text' value={showroleid} disabled style={{ width: '100%', marginBottom: '10px' }} />
          <select id="cars" name="cars" style={{ width: '100%' }} onChange={(e) => setAssignRole(e.target.value)}>
          <option>Select Role</option>
            {
              roleData.map((data) => {
                return (<>
                  
                  <option value={data.roleid} key={data.roleid}>{data.rolename}</option>
                </>)
              })
            }
          </select>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleRoleAssign(showroleid,roleid)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assign Role End step 3*/}


      {/* View Role Step 3 start */}
      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>View Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Actionss</th>
        </tr>
      </thead>
      <tbody>
      {
              viewRole3.map((item)=>{

                return(
                  <>
                  <tr>
                    <td>{item.rolename}</td>
                    <td>{<Button  type='submit' onClick={()=>handleDelete(deletedata,item.roleid)}>Delete</Button>}</td>
                  </tr>
                  </>
                )
              }
             
              )
            }
      </tbody>
    </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* View Role Step 3 end */}
    </div>
  )
}

export default ShowUsers

