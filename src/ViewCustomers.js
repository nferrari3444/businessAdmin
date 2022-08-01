import React, {useEffect, useState} from 'react'
import Home from "./Home";
import './App.css';
import axios from 'axios';
import {Link} from "react-router-dom"
import SearchProperty from "./Search";
import Layout from "./Layout";

const GetCustomers = () => {

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [q, setQ] = useState("");

        // name:"",
        // email: "",
        // phone: "",
        // country: "",
        // city: ""});

    
    const customerData = () => {
        axios.get('http://localhost:3001/viewCustomers')
        .then(res => {
       //     console.log(JSON.stringify(res.data))
            setCustomers(res.data)
       // setCustomers({name: res.data.name, email: res.data.email ,
            //      phone: res.data.phone, country: res.data.country, city: res.data.city});
        })
            .catch(function(error){
                console.log(error);
            })
        
    }
   

    useEffect(() => {
        customerData()
    }, [])

const childToParent = (item) => {
console.log()

const {firstName, lastName} = item
console.log(firstName)
console.log(lastName)

if (firstName != '') {
    setQ(firstName)
}
else{
    setQ(lastName)
}


const filtered = customers.filter(customer => {
    console.log(customer)
    if (firstName != ''){
    return  customer.name
    .toLowerCase()
    .indexOf(q.toLowerCase()) > -1
    }
    else {
    return customer.lastName
    .toLowerCase()
    .indexOf(q.toLowerCase()) > -1;
    }
})


setFilteredCustomers(filtered)
};

const goBack = () => (
    
    <Link to ="/">            
                <button className="btn btn-primary float-end">Home Page</button>
                </Link>           
    )

return (
    
    <Layout title="Check Customers" description="Review Your Customers Information" button = {true}  className="container-fluid">

    <div>
     

    {/* <div className='container'>{goBack()}
            </div> */}
    <div className='container'>
    <SearchProperty searchTerm = {childToParent}/>
    </div>

    <div className='table-responsive'>
    <table  className='col-lg-10 col-md-10 col-sm-12'>
   
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>

    {q ? filteredCustomers.map(customer => {
        return(
            <tr key = {customer._id}> 
                 
                 <td>{customer.name}</td>
                 <td>{customer.lastName}</td>
                 <td>{customer.email}</td>
                 <td>{customer.phoneNumber}</td>
                 <td>{customer.country}</td>
                 <td>{customer.city}</td>
                 </tr>
            
        )
    }) : (
    customers.map(customer => {
            
            return( 
                
                <tr key = {customer._id}> 
                 
                 <td>{customer.name}</td>
                 <td>{customer.lastName}</td>
                 <td>{customer.email}</td>
                 <td>{customer.phoneNumber}</td>
                 <td>{customer.country}</td>
                 <td>{customer.city}</td>
                 </tr>
            
             
            )
    })
    )}

    </tbody>

    </table>
        
    </div>
    </div> 
    </Layout>
)

}




export default GetCustomers;
