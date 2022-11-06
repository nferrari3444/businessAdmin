import React from "react";
import '../styles/App.css';

import {Link} from "react-router-dom"
// This would be our layout, we should be able to see this layout in any of the pages.

// We will be able to pass these properties from any other places where we use this layout and that way we can 
// dynamically display this content. We also send the className as props. The content will be available
// at the children props.


const Layout = ({title = "title" , description = "description", button = false, buttonHistory = false , path = "/", btnDescription = "Home Page", className, children}) => (

// The page is serving the layout so we can have the menu here and get rid of the menu from the Routes.js file
    <div>
        <div className = "jumbotron">

        {buttonHistory ? 
        
            <Link to = "/history">
            
            <button className="btn btn-primary float-end">Orders History</button>
            
            </Link>
            : "" }

        {button ? 
        <Link to = {path}>
            
            <button className="btn btn-primary float-end">{btnDescription}</button>
            
            </Link>
            : "" }

            <h2 className="p-2 display-5">{title}</h2>
            <h4 className="p-2"> {description}</h4>
          
        </div>
        <div className= {className}> {children}</div>
    </div>
    
);




export default Layout;
