import React from 'react';
import Table from 'react-bootstrap/Table';
import { Chart } from "react-google-charts";
//import Card from 'react-bootstrap/Card';
import './Home.css'


export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
]
export const options = {
  isStacked: "relative",
  height: 300,
  legend: { position: "top", maxLines: 3 },
  vAxis: {
    minValue: 0,
    ticks: [0, 0.3, 0.6, 0.9, 1],
  },
};

function Home() {
  return (
    <div style={{ width: '1100px'}}>

      {/* <div style={{ display: 'flex', marginTop: '70px', marginRight: '0px' }}>

        <Card style={{ width: '250px', marginLeft: '50px', height: '130px', backgroundColor: '#FE9496', color: 'white' }}>
          <Card.Header><h4>Total Employee</h4></Card.Header>
          <Card.Body>
            <Card.Title><i class="bi bi-person-standing">1000</i></Card.Title>
            <Card.Text>

            </Card.Text>
          </Card.Body>
        </Card>
        <br />


        <Card style={{ width: '250px', marginLeft: '40px', height: '130px', backgroundColor: '#1BCFB4', color: 'white' }}>
          <Card.Header><h4>Total Revenue</h4></Card.Header>
          <Card.Body>
            <Card.Title><i class="bi bi-currency-dollar">4500</i></Card.Title>
          </Card.Body>
        </Card>
        <br />
        <Card style={{ width: '250px', marginLeft: '40px', height: '130px', backgroundColor: '#4BCBEB', color: 'white' }}>
          <Card.Header><h4>Total Sales</h4></Card.Header>
          <Card.Body>
            <Card.Title><i class="bi bi-bag-fill"> 900</i></Card.Title>
          </Card.Body>
        </Card>

        <Card style={{ width: '250px', marginLeft: '40px', height: '130px', backgroundColor: '#A05AFF', color: 'white' }}>
          <Card.Header><h4>Total Ammount</h4></Card.Header>
          <Card.Body>
            <Card.Title><i class="bi bi-currency-rupee">980000</i></Card.Title>
          </Card.Body>
        </Card>
        <br />
      </div> */}


      {/* ////////dfghjkl */}

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />

<div class="container" style={{marginTop:'40px', marginLeft:'20px' }}>
    <div class="row ">
        <div class="col-xl-3 col-lg-3">
            <div class="card l-bg-cherry">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-shopping-cart"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Total Employees</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                3,243
                            </h2>
                        </div>
                        <div class="col-4 text-right">
                            <span>8.5% <i class="fa fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <div class="progress mt-1 " data-height="8" style={{height: "8px"}}>
                        <div class="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "25%"}}></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-3">
            <div class="card l-bg-blue-dark">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-users"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Total Revenue</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                15.07k
                            </h2>
                        </div>
                        <div class="col-4 text-right">
                            <span>9.23% <i class="fa fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <div class="progress mt-1 " data-height="8" style={{height: "8px"}}>
                        <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "25%"}}></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-3">
            <div class="card l-bg-green-dark">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-ticket-alt"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Total Sales</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                578
                            </h2>
                        </div>
                        <div class="col-4 text-right">
                            <span>10% <i class="fa fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <div class="progress mt-1 " data-height="8" style={{height: "8px"}}>
                        <div class="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "25%"}}></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-lg-3">
            <div class="card l-bg-orange-dark">
                <div class="card-statistic-3 p-4">
                    <div class="card-icon card-icon-large"><i class="fas fa-dollar-sign"></i></div>
                    <div class="mb-4">
                        <h5 class="card-title mb-0">Total Amount</h5>
                    </div>
                    <div class="row align-items-center mb-2 d-flex">
                        <div class="col-8">
                            <h2 class="d-flex align-items-center mb-0">
                                $11.61k
                            </h2>
                        </div>
                        <div class="col-4 text-right">
                            <span>2.5% <i class="fa fa-arrow-up"></i></span>
                        </div>
                    </div>
                    <div class="progress mt-1 " data-height="8" style={{height: "8px"}}>
                        <div class="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: "25%"}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

      {/* dfghjkl */}

      {/* This is for graph and table */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: '600px'}}>
          <Chart
            chartType="AreaChart"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>

        <div style={{ marginTop: '50px', width: '500px' }}>
          <Table >
            <thead >
              <tr>
                <th style={{ backgroundColor: '#02474d', color: 'white' }}>Id</th>
                <th style={{ backgroundColor: '#02474d', color: 'white' }}>Full Name</th>
                <th style={{ backgroundColor: '#02474d', color: 'white' }}>Email</th>
                <th style={{ backgroundColor: '#02474d', color: 'white' }}>Mobile No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Romel Verma</td>
                <td>romel@gmail.com</td>
                <td>7382739273</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Manish Kumar</td>
                <td>manish@gmail.com</td>
                <td>8783623423</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Rahul Mali</td>
                <td>rahul@gmail.com</td>
                <td>8783646721</td>
              </tr>
            </tbody>
          </Table>

        </div>

      </div>
    </div>
  )
}

export default Home







