/*
// Express利用しない版
var port = process.env.PORT || 8000;
var http = require("http");
http.createServer(function (request, response) {
   response.writeHead(200, {"Content-Type": "text/plain"});
   response.end("Hello World7");
}).listen(port);
*/

const express = require('express');
const app = express();

// CORS設定。異なるドメインからでも呼び出せるようにする
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header(
     "Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept"
   );
   next();
 });

// 起動している箇所
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

app.use(express.json());

// DBの代わり
const courses = [
   { id: 1, name: 'computer science'},
   { id: 2, name: 'information technology'},
   { id: 3, name: 'business intelligence'},
];

// GET /
app.get('/', (req, res) => {
   res.send('Simple REST API');
});

// GET /api/courses
app.get('/api/courses', (req, res) => {
   console.log("/api/courses");
   res.send(courses);
});

// POST /api/courses
app.post('/api/courses', (req, res) => {
   const course = {
       id: courses.length + 1,
       name: req.body.name
   };
   courses.push(course);
   res.send(course);
});

// PUT /api/courses/1
app.put('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (!course) return res.status(404).send('The course with the given ID was not found.');

   course.name = req.body.name;
   res.send(course);
});

// DELETE /api/courses/1
app.delete('/api/courses/:id', (req, res) => {
   const course = courses.find(c => c.id === parseInt(req.params.id));
   if (!course) return res.status(404).send('The course with the given ID was not found.');

   const index = courses.indexOf(course);
   courses.splice(index, 1);

   res.send(course);
});
