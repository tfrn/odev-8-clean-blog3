const express = require('express');
const ejs = require('ejs');
const path = require('path');
const Post = require("./models/Post");
const { default: mongoose } = require('mongoose');
const app = express();
// connect db
mongoose.connect("mongodb://127.0.0.1/cleanblog-test-db");

app.set('view engine', 'ejs');
//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/', async (req, res) => {
  const posts= await Post.find({})
  res.render("index", {
    posts:posts
  });
});

app.get('/about', (req, res) => {
  res.render("about.ejs");
});
app.get('/add_post', (req, res) => {
  res.render("add_post.ejs");
});
app.post('/post', async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
