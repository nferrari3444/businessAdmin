import './App.css';

// import {Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from './Navigation';
import Home from './Home'
import AddPurchase from './AddPurchase';
import Customer from './NewUser'
import NewUser from './NewUser'
import GetCustomers from './ViewCustomers';
import GetOrders from './History'
import UpdateOrder from './UpdateOrder'
import NewService from './AddService'
import UpdateService from './UpdateService'

//const App = () => (<div>Hello from React</div>)

function App() {

  return (
    <Router>
     
      <Routes>
      <Route exact path='/' element={<AddPurchase/>} />
      <Route exact path='/newUser' element={<Customer/>} />
      <Route exact path='/viewCustomers' element={<GetCustomers/>} />
      <Route exact path='/history' element={<GetOrders/>} />
      <Route exact path='/updateOrder/:orderId' element = {<UpdateOrder/>} />
      <Route exact path='/updateService/:serviceId' element = {<UpdateService/>} />
      <Route exact path='/newService' element = {<NewService/>} />
      </Routes>
      {/* <Navigation/> */}
    </Router>
  )
}
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );


export default App;
