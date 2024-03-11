const { Router } = require('express');
const Post = require('../Models/post.model');
const crudController = require('../Controler/crudcontroler');
const authorize = require('../middlewares/authorization');
const { update , remove ,findParticular ,findByUser } = require('../Controler/Post');

const router = Router();
 
router.get('/', authorize, async (req, res)=> {
    const searchtext = req.query.keyword; 

    try {
        if(searchtext){
            const regex = new RegExp(searchtext, 'i');
            const posts = await Post.find({ blog: { $regex: regex } });
            console.log(posts)
            res.send({
                success:true,
                posts
            })

        }else{
            const posts = await Post.find({ });
            console.log(posts)
            res.send({
                success: true,
                posts
            })
        }
        
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})
router.get('/:id', authorize, async (req, res)=> {
        findByUser(req,res,Post)
})

router.post('/', authorize, async (req, res)=> {
    let post = req.body;
    post.author_id = req.user._id;
    
    req.body = post;
    crudController(Post).post(req, res);
})

router.patch('/update/:id', authorize, async (req, res)=> {
    update(req, res, Post);
})
router.get('/single/:id', authorize, async (req, res)=> {
    findParticular(req, res, Post);
})
router.delete('/delete/:id', authorize, async (req, res)=> {
    remove(req, res, Post);
})


module.exports = router;