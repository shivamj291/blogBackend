
const crudController = require('./crudcontroler.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (obj)=> {
    let token = jwt.sign(obj, process.env.JWT_CLIENT_SECRET);
   
    return token;
}
const profile= async (req,res,model)=>{
    const id = req.params.id;
    console.log(id)
    try {
        let result = await model.find({});
        console.log(result);
        return res.send({
            success:true,
            result
        })
     
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}
const profilebyid = async (req,res,model)=>{
    const id = req.params.id;
    console.log(id)
    try {
        let result = await model.find({_id:id});
        console.log(result);
        return res.send({
            success:true,
            result
        })
     
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}
const register  = async (req, res, model)=> {
    let user = req.body;
    try {
        let existingUser = await model.findOne({ email: user.email });
        if(existingUser){
            return res.send({
                success: false,
                message: 'User with this email already exist!'
            })
        }
        let pass = bcrypt.hashSync(user.password, 10);
        user.password = pass;
        req.body = user;
        crudController(model).post(req, res);
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}

const login  = async (req, res, model)=> {
    let user = req.body;
    try {
        let existingUser = await model.findOne({ email: user.email });
        if(!existingUser){
            return res.send({
                success: false,
                message: "User doesn't exist!"
            })
        }
        if(!bcrypt.compareSync(user.password, existingUser.password)){
            return res.send({
                success: false, 
                message: "Incorrect Password"
            })
        }
        let obj = {
            _id: existingUser._id,
            email: existingUser.email
        }

        let token =  generateToken(obj);

        res.send({
            success: true,
            token,obj
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    register,
    login,
    profile,
    profilebyid
}