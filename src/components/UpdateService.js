import React, {useEffect, useState} from 'react'
import '../styles/App.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Layout from "./Layout";


const UpdateService = (props) => {

    const [serviceToUpdate, setServiceToUpdate] = useState({name:"", price:"", description:"",
    error:false, success:false});
    
    const [successMessage, setSuccessMessage] = useState('');

    let params = useParams()

    const serviceId = params.serviceId
    console.log(serviceId)

    useEffect(() => {
        console.log(params.serviceId)
        // Se obtiene el productId de la ruta utilizando match.params
        init(params.serviceId);
        
    }, [])

    const {name, price, description, error, success} = serviceToUpdate

    const init = (serviceId) => {
    
        axios.get(`http://localhost:3001/service/${serviceId}`)
    .then(data =>  
        { if(data.error) {
            setServiceToUpdate({...serviceToUpdate, error:true, success:false})
            console.log(data.error)
        } 
        console.log(data.data)
    
     //   console.log(Date(data.data.date).format('DD/MM/YYYY'))
            setServiceToUpdate({...serviceToUpdate, name: data.data.name, 
                price: data.data.price, description: data.data.description
            })
        })
    }

    const handleChange = (event) =>
    {
        
        const {name,value} = event.target
        console.log(name)
        console.log(value)
       setServiceToUpdate({...serviceToUpdate, [name] : value})
    }

    const adminPanel = () => (
    
        <Link to ="/newService">            
                    <button className="btn btn-primary ml-2 float-end">Admin Panel</button>
                    </Link>           
        )
    

    const clickSubmit = (event) => {

        event.preventDefault()

        const service = event.target.value
        console.log(service)
        axios({
            method: 'put',
            url: `http://localhost:3001/updateService/${serviceId}`,
            headers : {},
            data: {serviceToUpdate}
        })
        .catch(function(error) {   
            console.log(error)
            if(error.response) {
               setServiceToUpdate({...serviceToUpdate, error: true, success:false})
               console.log(error.response.data)
               setSuccessMessage('')
               
                 }
    })

        setServiceToUpdate({...serviceToUpdate, name:"", price:"", description:"", success: true})

      
}
const showSuccess = () => {
    console.log(success)
    if (success) {
    return (
        <div className='col-6'>
    <div className='alert alert-info' >
        <h2>Service Updated!</h2>
    </div>    
    </div>
        )
    }
}
return (

    <Layout title="Update Service " description="Change Service Information" button={true} path="/newService" btnDescription='Admin Panel' className="container-fluid">


    <div>
   
        
    <div className='container'>
    {showSuccess()}

    <form  onSubmit ={clickSubmit} className='row g-3 mt-3'>
        <div className='row'>
        <div className='form-group col-md-4 mt-5'>
            <label htmlFor="name" className="form-label">Service Name</label>
            <input type="text" onChange={handleChange} name="name" value={serviceToUpdate.name}  className='form-control' id="firstName" required></input>
        </div>
        </div>

        <div className='row'>
        <div className='form-group col-md-4 mt-5'>
            <label htmlFor="price" className="form-label">Price</label>
            <input type="text" onChange={handleChange} name='price' value={serviceToUpdate.price} className='form-control' id="lasttName" required></input>
        </div>
        </div>

        <div className='row'>
        <div className='form-group col-md-8 mt-5'>
                <label>Description
                 <textarea className='form-control' rows='2' cols='250'
                 name="description"
                 value = {serviceToUpdate.description}
                 onChange= {handleChange}
                 />
                </label>
                </div>
                </div>
                <div className='col-4'>
           <button  type= "submit" className='btn btn-lg btn-success mt-5'>Confirm</button>
          </div>
       
        </form>
    </div>
    </div>

    </Layout>
)

}


export default UpdateService;

