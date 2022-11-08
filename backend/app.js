const express= require("express")
require('dotenv').config();
const mongoose = require("mongoose");
const logger = require('morgan');
const cors= require('cors');
const Customer = require("./models/customers");
const Order = require("./models/orders");
const orders = require("./models/orders");
const Product = require("./models/product");
const {isRegistered} = require("./userRegistered")

//const user = require("./models/orders");
//const Router = require("./routes");

const app = express();

//use cors to allow cross origin resource sharing
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// const username = "nferrari3444";
// const password = "Alfabeta1984%";
// const cluster = "cluster name";
// const dbname = "smallBusiness";

//mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@currencycluster.1y7ya.mongodb.net/currencyUsers`, {useNewUrlParser: true});
//mongodb+srv://nferrari3444:<password>@cluster1.iyhew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster1.iyhew.mongodb.net/smallBusiness`

mongoose.connect(process.env.DATABASE,
{useNewUrlParser: true
}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("Connected successfully");

})


app.get('/viewCustomers', function(req,res) {

        Customer.find((error, data) => {
            if (error) {
                return res.status(400).json({
                    error
                })
            }
            else {
                res.json(data)
            }
        })

})

app.get('/history', function(req,res) {
    orders.find((error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        } else {
            console.log(data)
            res.json(data)
        }
    })
})

app.get('/services', function(req,res) {
    Product.find((error, data) => {
        if (error) {
            return res.status(400).json({
                error
            })
        } else {

            console.log(data)
            res.json(data)
        }
    })
})

app.post('/newCustomer', function(req,res) {

    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body);

    const customer = new Customer(req.body)

    customer.save((err,user) => {       // use the callback function to handle whatever took place
        // when the user logged in
        if (err) {
        console.log(err)
        return res.status(400).json({
         err
        //error: err.msg
        })
    } console.log('New Customer Added');
        res.json({
            customer
        })
    })                               
    
});

app.post('/createOrder', isRegistered, function(req,res){
    console.log('Email')
    console.log(req.body.email)

    const order = new Order(req.body)

    order.save((err, order) =>{
        if(err){
            console.log(err);
            //return res.json({
            //    err
            //})
        } console.log('New Order Created');
        res.json({order})
    });

});

app.put('/updateOrder/:orderId', function(req,res) {

    const orderId = req.params.orderId 

    console.log('reqbody is')
    console.log(req.body.orderToUpdate)
    console.log(orderId)
    Order.update({_id: orderId}, {$set: req.body.orderToUpdate} , (err,order) => {
       
        
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(order)
        res.json(order)
    }

)
    
   
})


app.put('/updateService/:serviceId', function(req,res) {

    const serviceId = req.params.serviceId
    console.log(serviceId)
    Product.update({_id: serviceId}, {$set: req.body.serviceToUpdate} , (err, service) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        console.log(service)
        res.json(service)
    }
    )
})

app.post('/newService', function(req,res) {

    const service = new Product(req.body)

    service.save((err, service) => {
        if (err) {
            return res.status(400).json({
                error: err
            })

        }

        console.log('New Service was Created')
         res.json(service)
    })

})

app.get('/service/:serviceId', function(req,res) {
    const serviceId = req.params.serviceId

    Product.findById(serviceId)
    .exec((err, service) => {
        if (err| !service) {
            return res.status(400).json({
                error: errorHandler(err)})
            }
            console.log(service)
            res.json(service)
})
});

app.delete('/deleteService/:serviceId', function(req,res)  {

    const serviceId = req.params.serviceId
    console.log(serviceId)
    console.log('service Id borrado')
    Product.deleteOne({_id: serviceId })
    .exec((err, service) => {
        if (err | !service) {
            return res.status(400).json({
                error: errorHandler(err)})
            }
            console.log('Service Deleted')
            console.log(service)
            res.status(200).json({message: "'The item got successfully deleted"}) } 
    )
    });

app.get('/order/:orderId', function(req,res) {

    const orderId = req.params.orderId 
    console.log(req.params.orderId)

Order.findById(orderId)
.exec((err,order) => {
    if(err || !order) {
        return res.status(400).json({
            error: errorHandler(err)
        });
    }
    console.log(order)
    res.json(order)
})
})

app.get('/user/:email', function(req,res)  {

    const email = req.params.email

    console.log(email)

})

//     // We make the order available on the request object
//     req.order = order
//     const {name, lastName, country, city, service, price,  date} = order


app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html' ));
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Server listening on port 8000');
});