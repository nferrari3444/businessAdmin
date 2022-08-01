const Customer = require("./models/customers");

exports.isRegistered = (req,res,next) => {

    const email = String(req.body.email)


    // exports.userById = (req, res, next, id) => {
    //     User.findById(id).exec((err,user) => {
    //         if (err || !user) {
    //             return res.status(400).json({
    //                 error: "User not found"
    //             });
    //         }
    //         req.profile = user;
    //         next(); // Let it go to the next phase because this is a middleware.
    //               // An application continue it flow and doesn't get stuck
    //     })
    // }

    
    Customer.find({email: email}, function(err,docs) {
        
        //console.log('name')
        //console.log(docs[0].name)
        console.log('email')
        console.log(docs[0])

        if (docs[0] === undefined) {
                console.log('Se debe dar de alta el usuario')
                const error = 'Se debe dar de alta el usuario'
                return res.status(400).json({error: error})
        }
        
    
        next()

})
}