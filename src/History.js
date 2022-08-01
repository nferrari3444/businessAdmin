import React, {useEffect, useState} from 'react'
import Home from "./Home";
import './App.css';
import axios from 'axios';
import {Link, useSearchParams} from "react-router-dom"
import SearchProperty from "./Search";
import UpdateOrder from "./UpdateOrder";
import Layout from "./Layout";

const GetOrders = () => {

    const [orders, setOrders] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [q, setQ] = useState("");
 //  const [searchParam] = useState(["name", "lastName"]);

    const [showUpdate, setshowUpdate] = useState(false);

    
    const ordersData = () => {
        axios.get('http://localhost:3001/history')
        .then(res => {
       //     console.log(JSON.stringify(res.data))
            setOrders(res.data)
       // setCustomers({name: res.data.name, email: res.data.email ,
            //      phone: res.data.phone, country: res.data.country, city: res.data.city});
        })
            .catch(function(error){
                console.log(error);
            })
        
    }
   

    useEffect(() => {
    ordersData()
    }, [])

const childToParent = (item) => {
console.log(item)

console.log(Object.keys(item))
//const [firstName, lastName] = Object.keys(item);
const {firstName, lastName} = item;
console.log(firstName)
console.log(lastName)

if (firstName != '') {
    setQ(firstName)
    
} else {
    setQ(lastName)

}

//const name = item.firstName
//const lastName = item.lastName
//setQ(firstName)
console.log(q)


// const filtered = orders.filter((order) => order[searchParam_].toLowerCase().indexOf(q) > -1);

const filtered = orders.filter((order) => {
    console.log(order.name)
    if (firstName != '') {

        return order.name
        .toString()
        .toLowerCase()
        .indexOf(q.toLowerCase()) > -1
    }
    else {
        return order.lastName
        .toString()
        .toLowerCase()
        .indexOf(q.toLowerCase()) > -1

    }
    
    
}
)


// console.log(order.lastName.toLowerCase().indexOf(q) > -1));


console.log(filtered)
setFilteredCustomers(filtered)
}

const updateOrder = (e) => (

    setshowUpdate(true)
)

const goBack = () => (
    
    <Link to ="/">            
                <button className="btn btn-primary float-end">Home Page</button>
                </Link>           
    )

return (
    
    <Layout title="Check Orders" description="Review Your Historical Orders" button = {true}  className="container-fluid">

    <div>
    

    {/* <div className='container'>{goBack()}
            </div> */}
    <div className='container'>
    <SearchProperty searchTerm = {childToParent}/>
    </div>
    <table  className='col-lg-10 col-md-10 col-sm-12'>
   
    <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Service</th>
            <th>Price</th>
            <th>Email</th>
            <th>City</th>
            <th>Update Order</th>
        </tr>
    </thead>
    <tbody>

    {q ? filteredCustomers.map(customer => {
        return(
            <tr key = {customer._id}> 
                 
                 <td>{customer.name}</td>
                 <td>{customer.lastName}</td>
                 <td>{customer.date}</td>
                 <td>{customer.service}</td>
                 <td>{customer.price}</td>
                 <td>{customer.email}</td>
                 <td>{customer.city}</td>

                 </tr>
            
        )
    }) : (
    orders.map(order => {
            
            return( 
                
                <tr key = {order._id}> 
                 
                 <td>{order.name}</td>
                 <td>{order.lastName}</td>
                 <td>{order.date}</td>
                 <td>{order.service}</td>
                 <td>{order.price}</td>
                 <td>{order.email}</td>
                 <td>{order.city}</td>
                 
                 <td><Link to={`/updateOrder/${order._id}`}> <button   type="button" className='badge rounded-pill bg-warning text-dark'>Update</button>
                 </Link>  </td>
                 </tr>
            
             
            )
    })
    )}

    </tbody>

    </table>
        {showUpdate ? 
        
        <UpdateOrder /> : null }
    </div>
    </Layout>
)

}




export default GetOrders;
