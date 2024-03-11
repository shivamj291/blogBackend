
const crudController = require('./crudcontroler');
const jwt = require('jsonwebtoken');

const update  = async (req, res, model)=> {
    let id = req.params.id;
    let post = req.body;
   
    try{
        let result = await model.findOneAndUpdate({ _id: id}, {...post} );
        res.send({
            success: true,
            message: 'Post Updated Successfully'
        })
    }
     catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}
const remove = async (req, res,model)=> {
    let id = req.params.id;
    let post = req.body;
   
    try{
        let result = await model.deleteOne({ _id: id} );
        res.send({
            success: true,
            message: 'Post Deleted Successfully'
        })
    }
     catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}
const findByUser  = async (req, res,model)=> {
    let id = req.params.id;
   
    console.log('sh',id)
    try {
        let result = await model.find({author_id:id});
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
const findParticular  = async (req, res,model)=> {
    let id = req.params.id;
    console.log(id)
    try {
        let result = await model.find({_id:id});
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


  
module.exports = {
    update,remove,findParticular,findByUser
}