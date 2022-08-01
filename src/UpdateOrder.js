
import React, {useEffect, useState} from 'react'
import Home from "./Home";
import './App.css';
import Navigation from './Navigation';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Moment from 'moment';
import Layout from "./Layout";
// const {Order} = require('../backend/models/orders')

// const express = require("express");
// const router = express.Router();


const UpdateOrder = (props) => {

const [orderToUpdate, setOrderToUpdate] = useState({});

   
let params = useParams()
const orderId = params.orderId
useEffect(() => {
    

    console.log(params.orderId)
    // Se obtiene el productId de la ruta utilizando match.params
    init(params.orderId);
    
}, [])

      //  next() // Once you find the orderById, execute the callback


const {name, lastName, country, city, service, price,  date, note} = orderToUpdate

// console.log(props.match)

// console.log('typepropsmatch')
// console.log(typeof(props.match))

// console.log('type props')
// console.log(typeof(props))
 //const orderId = params.orderId

const init = (orderId) => {
    
    axios.get(`http://localhost:3001/order/${orderId}`)
.then(data =>  
    { if(data.error) {
        setOrderToUpdate({...orderToUpdate, error:true, success:false})
        console.log(data.error)
    } 
    console.log(data.data)
    console.log(Date(data.data.date).toString())
 //   console.log(Date(data.data.date).format('DD/MM/YYYY'))
        setOrderToUpdate({...orderToUpdate, name: data.data.name, lastName: data.data.lastName, 
            country: data.data.country,
            city: data.data.city,
            service: data.data.service,
            price: data.data.price,
            date: Moment(data.data.date).format('YYYY-MM-DD'),
            note: data.data.note
        })
    })
}
    const handleChange = (event) =>
    {
        
        const   {name,value} = event.target
        console.log(name)
        console.log(value)
       setOrderToUpdate({...orderToUpdate, [name] : value})
    }

const clickSubmit = (event) =>
{
    event.preventDefault()
       console.log(event.target.value)

   
   
       
       
   const isValid = Boolean(orderToUpdate.name && orderToUpdate.lastName && orderToUpdate.country && orderToUpdate.city && orderToUpdate.service)

   if (isValid) {

    axios({
        method: 'put',
        url: `http://localhost:3001/updateOrder/${orderId}`,
        headers : {},
        data: {orderToUpdate}
    })
       
    //axios.put(`http://localhost:3001/updateOrder/${orderId}`,
       
    //   data: {orderToUpdate})

        .then(data =>   
      {
           if(data.error) {
               setOrderToUpdate({...orderToUpdate, error: true, success:false})
               console.log(data.error)
           }
           
       
        })
        setOrderToUpdate({
           ...orderToUpdate,
           name:'', 
           lastName:'',
           country:'',
           city:'',
           service: '',
           price:'',
           note: '',
           date:'',
           success:true,
   });
        //    setSuccessMessage('Nueva Orden creada correctamente')
        //    setErrorMessage('')
}
    //    else {
    //        setErrorMessage('Se deben completar todos los campos')
    //        setSuccessMessage('')
       
}   

const goBack = () => (
    
    <Link to ="/">            
                <button className="btn btn-primary ml-2 float-end">Home Page</button>
                </Link>           
    )

const goHistory = () => (
    
        <Link to ="/history">            
                    <button className="btn btn-primary ml-2 float-end">Orders History</button>
                    </Link>           
        )
    


return (


    <Layout title="Update Order " description="Change Order Information" button={true} buttonHistory= {true} btnDescription='Home Page' className="container-fluid">

    <div>
    {/* <div className='container mr-1'>{goBack()}
    

            </div>

            <div className='container mr-1'>{goHistory()}
    

    </div> */}

    <div className='container mt-5'>
    {/* <h2>Update Order</h2> */}
   <form   onSubmit={clickSubmit}>

   <div className='pl-2 row mt-4'>
       
      <div class="form-group col-md-4">
          <label>Name <input className='form-control'  type="text"
           name="name"
           value= {name}
           onChange={handleChange}
           placeholder="First Name"
           />
           </label>
          </div>
          <div class="form-group col-md-4">
          <label>Last Name<input className='form-control'  type="text"
           name="lastName"
           value= {lastName}
           onChange={handleChange}
           placeholder="Last Name"
           />
           </label>
          </div>

      <div className='form-group col-md-4'>
           <label>Date
           <input className='form-control' type="date"
           name="date"
           value= {date}
           onChange={handleChange}
           />
           </label>
           </div>

           <div className='row mt-4'>
           <div className='form-group col-md-4'>
           <label>Choose a Service: </label>

           <select  value= {service} onChange={handleChange} name ='service' id='cars'>
              <option value ="chain">Repair Chain</option>
              <option value ="service">Complete Service</option>
              <option value ="brakes">Fix Brakes</option>
              <option value ="puncture">Puncture</option>
              <option value ="rays">Fix Rays</option>
              <option value ="rubber">Rubber Rides</option>
             
           </select>
      
           </div>

           <div className='form-group col-md-4'>
           <label>Country
           <input className='form-control' type="text"
           name="country"
           value= {country}
           onChange={handleChange}
           />
           </label>
          </div>

           <div className='form-group col-md-4'>
           <label>City
           <input className='form-control' type="text"
           name="city"
           value= {city}
           onChange={handleChange}
           />
           </label>
           </div>

           <div className='row mt-4'>
           <div className='form-group col-md-4'>
           <label>Price
           <input className='form-control' type="number"
           name="price"
           value = {price}
           onChange= {handleChange}
          />
          </label>
          </div>
          <div className='form-group col-md-8'>
          <label>Note

          
           <textarea className='form-control' rows='2' cols='250'
           name="note"
           value = {note}
           onChange= {handleChange}
           />
          </label>
          </div>
           
          <div className='col-4'>
           <button  type= "submit" className='btn btn-lg btn-success mt-5'>Confirm</button>
          </div>
           
              </div>
           </div>
       </div>
   
   </form>
   </div>
   </div>
   </Layout>
)



}


export default UpdateOrder;