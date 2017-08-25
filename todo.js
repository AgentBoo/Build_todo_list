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

app.use('/public', express.static('public'));             // express.static() middleware serves all files in the public dir (put static files in public)

// NOTE: Route handlers

let todo = ['Poop'];
let complete = [];

app.get("/", (req, res) => {                                                // render index.mustache upon GET http request to root / + #todo and #complete hashes for mustache
  if(req.body) { res.render('index', { 'todo': todo, 'complete': complete }) };
});

app.post("/", (req, res) => {                                              // all my buttons do POST http request to root /
  if(req.body.todo) { todo.push(req.body.todo) }                           // if POST request body exists + input field is filled with a TODO text --> add the TODO to a todo array
  else if(req.body.btnMark) { complete.push(todo.splice(todo.findIndex((element) => {
      if(req.body.btnMark == element){ return element };                   // if POST body has empty todo + filled btnMark field --> find index of array item that has btnMark[i] value === todo[i];
    }), 1)); }
  else if(req.body.btnDelete) { todo.splice(todo.findIndex((element) => {
      if(req.body.btnDelete == element){ return element }                 // if POST body has empty todo + filled btnDelete field --> find index of array item that has btnDelete[i] value === todo[i];
    }), 1); }
  else if(req.body.complDelete) { complete.splice(complete.findIndex((element) => {
    if(req.body.complDelete == element){ return element };                // if POST body has empty todo + filled complDelete field --> find index of array item that has complDelete[i] value === complete[i];
  }), 1); }
  else {};
  res.redirect("/");
});

// NOTE: The above note does not seem to work at all for duplicate TODOs

app.listen(3000, () => { console.log('Blackpink: Boombayah') });
