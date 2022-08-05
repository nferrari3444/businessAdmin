import React, {useEffect, useState} from 'react'
import '../styles/App.css';
import Navigation from './Navigation';
import axios from 'axios';
import Moment from 'moment';
import {Link} from "react-router-dom"
import Layout from "./Layout";

const NewService = () => {

    const [service, setService] = useState({name:'', price:''});
    const [listServices, setListServices] = useState([]);

    const {name, price} = service 

    const getServices = () => {

        axios.get('http://localhost:3001/services')
        .then(data => setListServices(data.data))
        //  console.log(data.data) ) //     )

        .catch(function(error) { 
        console.log(error)
        }
        )
    }

    useEffect(() => {
     
        getServices();
       // console.log(setListServices)
        //loadFilteredResults(skip, limit, myFilters.filters)
        
        
       } , []);


    const handleChange = (event) => {

        console.log(event.target.value)
        const {name, value} = event.target

        setService({...service, [name]: value})
    }
    const clickSubmit = (event) =>
    {
        event.preventDefault()
           console.log(event.target.value)

           // console.log(name)
           // console.log(lastName)
           // console.log(email)

       
       const isValid = Boolean(service.name && service.price)

       if (isValid) {

           axios.post('http://localhost:3001/newService',  service)

           .then(response => {
               setService({...service, name:'', price: '', description:''})

           })}
        }
        
        
    const destroy = (serviceId) => {

        console.log(serviceId)
        axios.delete(`http://localhost:3001/deleteService/${serviceId}`)
        .catch((error) => {
            console.log(error)
        })
        .then(res => {getServices()})
    }




    return (

        <Layout title="Edit or Register New Service " description="Add or Edit Service Information" button={true} className="container">

   
             
    <div className='row'>
    <div className='col-md-6'>
    
    <h2>Add New Service</h2>

    <form  onSubmit ={clickSubmit} className='row pl-2 gl-5 gx-1'>
    <div className='border border-info rounded px-3'>
        <div className='row'>
       
        <div className='form-group col-md-8 mt-5'>
            <label htmlFor="name" className="form-label">Service Name</label>
            <input type="text" onChange={handleChange} name="name" value={service.name}  className='form-control' id="firstName" required></input>
        </div>
        </div>

        <div className='row'>
        <div className='form-group col-md-4 mt-5'>
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" onChange={handleChange} name='price' value={service.price} className='form-control' id="lasttName" required></input>
        </div>
        </div>

        <div className='row'>
        <div className='form-group col-md-8 mt-5'>
                <label>Description
                 <textarea className='form-control' rows='2' cols='250'
                 name="description"
                 value = {service.description}
                 onChange= {handleChange}
                 />
                </label>
                </div>
        </div>


 <div className='col-4'>
                 <button  type= "submit" className='btn btn-lg btn-success mt-5'>New Service</button>
                </div>
</div>
    </form>
    </div>

    <div className='col-md-6 ms-md-auto'>
        <h2>Edit/Remove Services</h2>
        {/* <h5 className='text-center'>Total {listServices.length} Services</h5> */}
        <ul className='list-group'>
        {listServices.map((service,i) => {

            return (

            <li key={i}  className="list-group-item d-flex justify-content-between align-items-center" >
            
                   <strong>{service.name}</strong>
                    <div className='justify-content-end'>
                    <strong className='add-space'>${service.price}</strong>
                   <Link to={`/updateService/${service._id}`}>
                        <span className='badge rounded-pill bg-warning text-dark'>
                            Update
                        </span>
                    </Link>
                     <span onClick= {() => destroy(service._id)} className='badge rounded-pill bg-danger delete-badge'>
                        Delete
                    </span> 
                    </div>
            </li>
             )    
        } ) }

        </ul>
     

    </div>
        </div>

        {/* </div> */}
        
        </Layout>)
}




export default NewService;