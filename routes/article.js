var express = require('express');
var router = express.Router();

var Article=require('../models/articleSchema')
var Comment=require('../models/commentSchema')


/* GET users listing. */
router.get('/', function(req, res, next) {
    //get list of articles
    Article.find({},
        (err,listOfArticles)=>{
            err?next(err):res.json(listOfArticles);
     }
    )
})
.get("/:articleId",(req, res, next)=>{
    //all info about that article
    //populate the schema
Article.findById(req.params.articleId).populate("comments").exec((err,articleInfo)=>{
        err?next(err):res.json(articleInfo)
    })
})
.post("/post",(req, res, next)=>{
    //post an articles
    console.log(req.body)
    Article.create(req.body,(err,createdArticle)=>{
        err?next(err):res.redirect('/article')
    })

})
.post("/:articleId/comment",(req, res, next)=>{
    //post a comment on articlePage
    var articleId=req.params.articleId;
    req.body.articleId=articleId
    console.log(req.body,"is the comment")
    Comment.create(req.body,(err,createdComment)=>{
        console.log(createdComment,'is the created comment')
        Article.findByIdAndUpdate(articleId,{$push:{comments:createdComment.id}},(err,Article)=>{
            console.log(Article)
            err?next(err):res.redirect(
                `/article/${articleId}`
            )

        })
       
    })
})

module.exports = router;