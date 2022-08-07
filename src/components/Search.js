import React, {useEffect, useState} from 'react'
import '../styles/App.css';
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


    return (
        <div className='row'>
        <div className='col-12'>
        <div className='input-group px-2'>
            {/* <div className="input-group-prepend px-2"> */}
                <span className='input-group-text px-5' id='name'>Customer Name</span>
                {/* </div> */}
           
        <input type="search" className='searchbar px-3 ms-2' onChange={handleChange("firstName")} name = "firstName" value={firstName}  placeholder='Customer Name' aria-label='customer name' aria-describedby='name'></input>        
            
    
        <span className='input-group-text px-5 ms-5' id='lastName'>Customer Last Name</span>
        <input type="search" className='searchbar px-2 ms-3' onChange={handleChange("lastName")} name = "lastName" value={lastName}  placeholder='Customer Last Name' aria-label='customer last name' aria-describedby='lastName'></input>

        </div>
        </div> 
        </div>
        

    )
}


export default SearchProperty;
