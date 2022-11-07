import './styles/App.css';

// import {Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from './components/Navigation';
import AddPurchase from './components/AddPurchase';
import Customer from './components/NewUser'
import NewUser from './components/NewUser'
import GetCustomers from './components/ViewCustomers';
import GetOrders from './components/History'
import UpdateOrder from './components/UpdateOrder'
import NewService from './components/AddService'
import UpdateService from './components/UpdateService'

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
export default App;
