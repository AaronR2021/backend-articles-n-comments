var express = require("express");
var router = express.Router();

/* GET home page. */
router
  .get("/abc", function (req, res, next) {
    console.log("index page");
    console.log(req.query);
  })
  .post("/abc", (req, res, next) => {
    console.log(req.body, req.query);
    var qs = Object.keys(req.query)
      .map((key) => key + "=" + req.query[key])
      .join("&");
    console.log(req.url + "?" + qs.toString());
  });

module.exports = router;
