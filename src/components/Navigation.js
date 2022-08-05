// import {Navbar, Nav, Container} from 'react-bootstrap';

import { Link } from "react-router-dom";


const Navigation = () => {

return (
    <div className="col-12">
<div className="container-fluid">  

    <div className="row g-5 flex-nowrap">
    
                <ul className="side-bar nav nav-pills d-flex flex-column g-5">
                    <li className="nav-item p-4">
                        <Link  className="nav-link pb-2 mb-2 align-middle px-3" to = '/newUser'>
                        <button className="btn btn-primary btn-lg">
                        <span className="button-text">Register New User</span></button>
                           
                        </Link>
                    </li>
                  
                    <li className="nav-item p-4">
                        <Link className="nav-link pb-2 mb-2 align-middle px-3" to ='/viewCustomers'>
                        <button className="btn btn-primary btn-lg">
                        <span className="button-text">Check User Info</span></button>
                        
                        </Link>
                    </li>
                   
                    <li className="nav-item p-4">
                        <Link className="nav-link pb-2 mb-2 align-middle px-3" to='/history'>
                        <button className="btn btn-primary btn-lg">
                        <span className="button-text">Purchase History</span></button>     
                        </Link>
                    
                    </li>

                    <li className="nav-item p-4">
                        <Link className="nav-link pb-2 mb-2 align-middle px-3" to='/newService'>
                        <button className="btn btn-primary btn-lg">
                        <span className="button-text"> Add New Service</span></button>     
                        </Link>
                    
                    </li>

                </ul>
                
                </div> 
                    </div>    
                    </div>       
 
)}
            

export default Navigation;
