import React, {useEffect, useState} from 'react'

import '../styles/App.css';
import Navigation from './Navigation';
import axios from 'axios';
import Moment from 'moment';
import Layout from "./Layout";
import {Link} from "react-router-dom"

const AddPurchase = () => {

    const [order, setOrder] = useState({name: "",
     lastName:"",
     country:"", city:"" , service:"", 
     price: "", note: "",  date: "", error: false, success: false})

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [services, setServices] = useState([]);
    const [userNoRegistered, setUserNoRegistered] = useState('');
    const [count, setCount] = useState(1);

    const getServices = () => {

        axios.get('http://localhost:3001/services')
        .then(data =>   setServices(data.data))

        .catch(function(error) { 
        console.log(error)
        }
        )
    }

    useEffect(() => {
     
        getServices();
       } , []);

    const handleIncrease = () => {
        setCount(count => count +1)
    };

    const handleDecrease = () => {
        setCount(count => count - 1)
    };

     const handleChange = (event) =>
     {
         
         const   {name,value} = event.target
         console.log(name)
         if (name == 'service') {
            const selectedProduct = services.find(service => service.name == value)
            console.log(selectedProduct)
            console.log(selectedProduct.price)
            setCount(1)
           setOrder({...order, service: selectedProduct.name , price: selectedProduct.price})
         }
         else {

        setOrder({...order, [name] : value})
         }
     }
     const {name, lastName, email, city, service, price, error,  date, note ,success} = order
  
   

     const clickSubmit = (event) =>
     {
         event.preventDefault()
            console.log(event.target.value)

        console.log(order)
        const isValid = Boolean(order.name && order.lastName && order.email && order.city && order.service)

        if (isValid) {

            axios.post('http://localhost:3001/createOrder',  order)

            .then(response => {
                setOrder({
                    ...order,
                    name:'', 
                    lastName:'',
                    email:'',
                    city:'',
                    service: '',
                    price:'',
                    note: '',
                    date:'',
                    success:true,
            });
            setErrorMessage('')
            setUserNoRegistered('')
            })
             .catch(function(error) {   
               console.log(error)
                if(error.response) {
                    setOrder({...order, error: true, success:false})
                    console.log(error.response.data)
                    setSuccessMessage('')
                    setUserNoRegistered('Se debe dar de alta el usuario')
                }
                
            
             })
                
        }
        
            else {
                setErrorMessage('Se deben completar todos los campos')
                setSuccessMessage('')
            }
             };

        const showError = () => (

           
        <div className='alert alert-danger' style= {{display : errorMessage  ? '': 'none'}}>
         {errorMessage}
         </div>                
         );

        const showNoUser = () => (

        <div className='alert alert-danger' style= {{display : userNoRegistered  ? '': 'none'}}>
        {userNoRegistered}
        <Link to="/newUser">Add New User</Link>
        </div>);

        const showSuccess = () => {
            if (success) {
            return (
            <div className='alert alert-info' >
                <h2>Orden Creada Correctamente</h2>
            </div>    
                )
            }
        }
                
     return (
        <Layout title="Manage Your Business" description="Add New Order"  button = {false} className="container-fluid">

        <div className='row mt-5'>
        <div className='col-lg-3 col-md-6 col-sm-12'>
            <Navigation/>

        </div>
        <div className='col-lg-7 col-md-6 px-5'>


       
        {/* <Home  title = 'Ingreso datos de Venta'/> */}
        {showNoUser()}
        {showError()}
        {showSuccess()}
        

        <form   onSubmit={clickSubmit}>

         <div className='row'>
             
            <div class="form-group col-md-4">
                <label>Name <input className='form-control'  type="text"
                 name="name"
                 value= {order.name}
                 onChange={handleChange}
                 placeholder="First Name"
                 />
                 </label>
                </div>
                <div class="form-group col-md-4">
                <div className='input-space'>
                <label>Last Name<input className='form-control'  type="text"
                 name="lastName"
                 value= {order.lastName}
                 onChange={handleChange}
                 placeholder="Last Name"
                 />
                 </label>
                </div>
                </div>
            <div className='form-group col-md-4'>
            <div className='input-space'>
                 <label>Date
                 <input className='form-control' type="date"
                 name="date"
                 value= {order.date}   
                 onChange={handleChange}
                 />
                 </label>
                 </div>
                </div>
                </div>

                
                 <div className='row gy-4 mt-4'>
                 <div className='form-group col-md-4'>
                
                 <label>Choose a Service: </label>
                <div className=''>
                 { <select  value= {service.name} onChange={handleChange} name ='service' id='services'>
                   {services.map((item,key) => (
                    <option key = {key} value ={item.id}>{item.name}</option>
                 
                   ))}
                   
                 </select>
           
                 }

                <div className='add-quantity'>
                 <p>Quantity: {count}</p>
                
                <div className='button-mg'>
                 <button type = "button" onClick={handleIncrease}>+</button>
                 <button type="button" onClick={handleDecrease}>-</button>
                </div>
                </div>
                 {/* <input className ='counter' type="number" value= {count} onClick={handleCounter}/>    */}
</div>
                 
                 </div>
                 
               
                 <div className='form-group col-md-4'>
                 <div className='input-space'>
                 <label>Email
                 <input className='form-control ' type="email"
                 name="email"
                 value= {order.email}
                 onChange={handleChange}
                 />
                 </label>
                 </div>
                </div>

                 <div className='form-group col-md-4'>
                 <div className='input-space'>
                 <label>City
                 <input className='form-control' type="text"
                 name="city"
                 value= {order.city}
                 onChange={handleChange}
                 />
                 </label>
                 </div>
                 </div>
</div>

        
                 <div className='row gy-4 mt-4'>
                 <div className='form-group col-md-4'>
               
                 <label>Price
                 <input className='form-control' type="number"
                 name="price"
                 value = {order.price * count}
                 onChange= {handleChange}
                />
                </label>
                
                </div>
                <div className='form-group col-md-8'>
                <div className='input-space'>
                <label>Note

                
                 <textarea className='form-control' rows='2' cols='250'
                 name="note"
                 value = {order.note}
                 onChange= {handleChange}
                 />
                </label>
                </div>
                </div>
                <div className='col-4'>
                 <button  type= "submit" className='btn btn-lg btn-success mt-5'>Success</button>
                </div>
                 
                    </div>
                 
             
         
            

         </form>
      
         </div>
         </div>
         </Layout>
     )
}



export default AddPurchase;