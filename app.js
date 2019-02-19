var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");


mongoose.connect("mongodb://localhost:27017/restfullBlog_app", { useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(expressSanitizer());


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//     {
//         title: "Grist", 
//         image: "data:image/jpeg;base64,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",
//         description: "This is a huge Granite Hill, no bathrooms, no water. Beautiful Granite"
//         }
//     ,function(err, blog){
//         if(err){
    //         console.log(err);
    //     }else{
    //         console.log("New Campground Created");
    //         console.log(campground);
    //     }
//     });

app.get("/", function(req,res){
    res.redirect("blogs");
});

app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        }else{
            res.render("index", {blogs: blogs});
        }
    });
});


app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.create(req.body.blog, function(err, newBlog){
       if(err){
           res.render("new");
       }else{
           res.redirect("/blogs");
       }
   }); 
});


app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("show", { blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else{
            res.redirect("/blogs");
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started!");
});