
const get = (model) => async (req, res)=> {
    try {
        let result = await model.find({ });
        return result;
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}

const post = (model) => async (req, res)=> {
    try {
        let result = await model.create(req.body);
        res.send({
            success: true,
            message: 'Data posted successfully',
            data: result
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}




module.exports = (model)=> {
    return {
        get: get(model),
        post: post(model),

    }
}