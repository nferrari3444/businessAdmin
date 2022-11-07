import React, {useEffect, useState} from 'react'
import '../styles/App.css';
import axios from 'axios';
import {API} from "../config";
import {Link} from "react-router-dom"
import Layout from "./Layout";

const Customer = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const [values, setValues] = useState({
        name:'',lastName:'', email:'', phoneNumber: '', country:'', city:'', error: '', success:false })

    const handleChange = (e) => {
        
        const {name ,value} = e.target
        setValues({...values, [name] : value})


    };

    const {name, lastName, email, phoneNumber, country, city, error, success} = values

    const clickSubmit = event => {
            //
        //  console.log(values)
            event.preventDefault()
            event.target.reset()
            // setError("")
            const isValid = Boolean(values.name && values.lastName && values.email && values.city && values.phoneNumber && values.country)

            console.log(isValid)
            const customer = {
                name, lastName, email, phoneNumber, country,city,
            }

          //  setValues({...values, error: false})
            console.log(values)

            if (isValid) {
            axios.post(`${API}/newCustomer`, customer)
             .then(data =>   
           {
                if(data.error) {
                    setValues({...values, error: data.error, success:false})
                    console.log(data.error)
                }
                
            
             })
             setValues({
                ...values,
                name:'', 
                lastName:'',
                email:'',
                phoneNumber: '',
                country:'',
                city:'',
                error: '',
                success:true,
        });
        setErrorMessage('') 
    }
            else {
                setErrorMessage('Se deben completar todos los campos')
                
            }
};
       
        
     // If success is true then this div will be showed to the user
     const showSuccess = () => (
        <div className = "alert alert-info" style = {{display: success ? "": 'none'}}>
            New Customer is created. Return to <Link to="/"> Home Page </Link>
        </div>
    )

    const newUser = () => {

        return (
            <div>
        {/* <h2>Add New Customer</h2> */}
        <form  onSubmit ={clickSubmit} className='row g-3 mt-3'>
            <div className='form-group col-md-6'>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" onChange={handleChange} name="name" value={values.name}  className='form-control' id="firstName"></input>
            </div>
            <div className='form-group col-md-6'>
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" onChange={handleChange} name='lastName' value={values.lastName} className='form-control' id="lasttName"></input>
            </div>
    
        <div className='form-group col-md-8'>
            <label htmlFor="emailInfo" className='form-label'>E-mail</label>
            <input type="email" onChange={handleChange}  name='email' value={values.email} className='form-control' id="emailInfo"></input>
        </div>
    
        <div className='form-group col-md-4'>
            <label htmlFor="phoneNumber" className='form-label'>Phone Number</label>
            <input type="text" onChange={handleChange}  name='phoneNumber' value={values.phoneNumber} className='form-control' id="phoneNumber" placeholder='+598'></input>
        </div>
    
        <div className='form-group col-md-4'>
                <label htmlFor="country" className="form-label">Country</label>
                <input type="text" onChange={handleChange}  name='country' value={values.country} className='form-control' id="country"></input>
            </div>
    
            <div className='form-group col-md-4'>
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" onChange={handleChange}  name='city' value={values.city} className='form-control' id="city"></input>
            </div>
    
            <div className='col-md-12'>
                <button  type='submit' className='btn btn-primary'>Submit</button>
            </div>
        </form>
        </div>
    )}

    const showError = () => (

           
        <div className='alert alert-danger' style= {{display : errorMessage  ? '': 'none'}}>
         {errorMessage}
         </div>                
         );


  return (
        
        
        <Layout title="Add New Customer" description="Provide Customer Information" button = {true} btnDescription= "Home Page" className="container-fluid">

        
        <div className='container mt-5'>
       

       {showSuccess()}
        {showError()}
        {newUser()}
       
        </div>
        

   
        </Layout> 
    )
}


export default Customer;
