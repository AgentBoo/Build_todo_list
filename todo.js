// NOTE: Setup modules, setup middleware
const express = require('express');
  const app = express();

const mustacheExpress = require('mustache-express');
  app.engine('mustache', mustacheExpress());              // register .mustache extension with the mustache express
  app.set('view engine', 'mustache');                     // set view engine to mustache templating engine
  app.set('views', __dirname + '/views');                 // allows me to use res.render('filename') instead of res.render('path to filename') because I am setting views folder as where to look for templates with .mustache extension

const bodyParser = require('body-parser');
  app.use(bodyParser.json());                             // for parsing application/json
  app.use(bodyParser.urlencoded({extended: true}))        // <true> more complex algorithm for parsing application/x-www-form-urlencoded

const path = require('path');
  app.use('/public', express.static('public'));

// NOTE: Route handlers

let todo = [];
let complete = [];

app.get("/", (req, res) => {
  if(req.body) { res.render('index', { 'todo': todo, 'complete': complete }) };
});

app.post("/", (req, res) => {
  if(req.body.todo) { todo.push(req.body.todo) }
  else if(req.body.btnMark) { complete.push(todo.splice(todo.findIndex((element) => {
      if(req.body.btnMark == element){ return element };
    }), 1)); }
  else if(req.body.btnDelete) { todo.splice(todo.findIndex((element) => {
      if(req.body.btnDelete == element){ return element }
    }), 1); }
  else if(req.body.complDelete) { complete.splice(complete.findIndex((element) => {
    if(req.body.complDelete == element){ return element };
  }), 1); }
  else {};
  res.redirect("/");
});

app.listen(3000, () => { console.log('BTS : Fire') });
