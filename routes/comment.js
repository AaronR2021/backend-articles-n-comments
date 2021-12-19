var express = require('express');
var router = express.Router();

var Article=require('../models/articleSchema')
var Comment=require('../models/commentSchema')

/* GET users listing. */
router.get('/', function(req, res, next) {
    //useless route
    // ->/comment
  res.send('respond with a resource');
   
})
.post("/:commentId/edit",(req, res, next)=>{
    //edit a comment
    Comment.findByIdAndUpdate(req.params.commentId,req.body,{new:true},(err,updatedComment)=>{
        console.log(updatedComment);
        err?next(err):res.redirect(`/article/${updatedComment.articleId}`)
    })


})
.post("/:commentId/delete",(req, res, next)=>{
    //delete a comment
    Comment.findByIdAndDelete(req.params.commentId,(err,deletedComment)=>{
        if(err){
           return next(err)
        }
        else{
            Article.findByIdAndUpdate(deletedComment.articleId,{pull:{comments:deletedComment._id}},(err,ArticleInfoPostDelete)=>{
                console.log(ArticleInfoPostDelete)
                if(err){
                    next(err)
                }
                else{
                    return res.redirect(`/article/${ArticleInfoPostDelete.id}`)
                }
            })

        }
    })
})

module.exports = router;