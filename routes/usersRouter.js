const { Router } = require('express');
const User = require('../models/user.model');
const { register, login } = require('../Controler/Usercontroler');

const router = Router();

router.post('/register', async (req, res)=> {
    register(req, res, User);
}) 

router.post('/login', async (req, res)=> {
    login(req, res, User);
})
 
module.exports = router;



// {
//     "title":"sfdafsd",
//    "body":"sdklsfa kdasjfkd dasfkj adsfak sdfa",
//    "device": "dasfd",
//    "author_id":"65edc455990e2ae29621a9c8"
//   }

// {
//   "name":"anil",
//   "email":"anil@gmail.com",
//   "password":"anil@123",
//   "gender":"male"
// }
  
  
