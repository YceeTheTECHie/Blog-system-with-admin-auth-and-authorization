const models = require("../models");

const createPosts = (req,res, next) => {
    const post = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.imageUrl,
        categoryId : req.body.category_id,
        userId : 1
    }

    models.Post.create(post).then(result => {
            res.status(201).json({
                message : "posts created successfully",
                post : result
            })
    }).catch(error => {
        res.status(500).json({
            message : "Oops!, something went wrong",
            post: error
        })
        return next(error);
    })
} 

const showPost = (req,res,next) => {
    const id = req.params.id;
    models.Post.findByPk(id).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message : "Oops!, something went wrong",
        })
        return next(error);

    })
}

const index = (req,res,next) => {
    models.Post.findAll().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        res.status(500).json({
            message : "Oops!, something went wrong",
        })
        return next(error);

    })
}

const update = (req,res,next) => {
    const id = req.params.id;
    const updatedPost = {
        title : req.body.title,
        content : req.body.content,
        imageUrl : req.body.imageUrl,
        categoryId : req.body.category_id,
    }

    const userId = 1;

    models.Post.update(updatedPost, {where : {id:id,userId:userId}})
    .then(result => {
        res.status(200).json({
            message : "post updated successfully",
            post : updatedPost
        })
    }).catch(error => {
        res.status(500).json({

            message : "something went wrong"

        })
        return next(error);

    })

}

const destroy = (req,res,next) => {
    const id = req.params.id;
    const userId = 1;
    // models.Post.destroy({where : {id:id,userId:userId}}).then(result => {console.log("found nothing",result);}).catch(error => {console.log(error);})
    models.Post.destroy({where : {id,userId}})
    .then(result => {
        if (result != 0){
        res.status(200).json({
            message : "Posts deleted successfully",
            id
        });}
        else{
            res.status(404).json({
                message : "Post not found"
            });
        }
    })
    .catch(error => {
        console.log(error);
            res.status(500).send({
                message: error.message || "INTERNAL SERVER ERROR"
            });

        return next(error);

    });
}

module.exports =  {
    createPosts,
    showPost,
    index,
    update,
    destroy,

}