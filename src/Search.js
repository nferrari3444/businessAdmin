import React, {useEffect, useState} from 'react'
import Home from "./Home";
import './App.css';
import axios from 'axios';
import {Link} from "react-router-dom"

const SearchProperty = (props) => {

    const [search, setSearch] = useState({firstName:"", lastName:""});

    const {firstName, lastName} = search;

    const handleChange = name => event  => {
        console.log('name',name)
        console.log(event.target.value)
        setSearch({...search, [name]:  event.target.value})
       // props.searchTerm({...search, })
         props.searchTerm({...search, [name]:  event.target.value})
    }



//     function handleChange(event) {
//         const {value,name} = event.target;
//         console.log(value)
//         console.log(name)
//         console.log(search)
//         props.searchTerm(value) 
//         setSearch(prevValue => {
//             if(name === "firstName") {
//                 return {
//                 firstName: value,
//                 lastName : prevValue.lastName
//             };
//             } else if  (name === "lastName") {
//             return {
//                 firstName : prevValue.firstName,
//                 lastName : value
//             }
//         }
//     })
    
// }
    // const handleChange = name => event => {
    //     //console.log(e.target.value)
    //     const {name ,value} = event.target
    //     console.log(value)
    //     //const value = e.target.value
    //     // console.log(value)
    //     // console.log(name)            
    //     setSearch({...search, [name]:  event.target.value})
    //     //setSearch({...search, [name] : value})
    //     console.log(search)
    //     props.searchTerm(search)
    // }

    return (
        <div className='col-12'>
        <div className='input-group-text px-2'>
            <div className="input-group-prepend px-2">
                <span className='input-group-text px-5' id='name'>Customer Name</span>
                </div>
           
        <input type="search" className='searchbar px-3 ms-2' onChange={handleChange("firstName")} name = "firstName" value={firstName}  placeholder='Customer Name' aria-label='customer name' aria-describedby='firstName'></input>        
            
        <span className='input-group-text px-5 ms-5' id='lastName'>Customer Last Name</span>
        <input type="search" className='searchbar px-2 ms-3' onChange={handleChange("lastName")} name = "lastName" value={lastName}  placeholder='Customer Last Name' aria-label='customer last name' aria-describedby='lastName'></input>

        </div>
        </div> 
        

    )
}


export default SearchProperty;
