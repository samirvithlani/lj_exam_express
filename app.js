const express = require("express"); // import
//express application create
const app = express(); //call express function
//express -> app

//GET
//http://localhost:3000/test
app.get("/test", (req, res) => {
  //response.. res.json,res.send --> cont
  //res.set("content-type","text/plain")
  //res.type("text/plain")
  res.setHeader("content-type", "text/plain");
  res.send("Test APi Called..");
});

const student = {
  id: 1,
  name: "amit",
  age: 23,
  status: true,
};

//http://localhost:3000/student
app.get("/student", (req, res) => {
  //res.write(JSON.stringify(student))
  //res.send()
  res.json(student);
});

const students = [
  { id: 1, name: "amit", age: 23, status: true },
  { id: 2, name: "raj", age: 22, status: true },
  { id: 3, name: "parth", age: 25, status: true },
];

app.get("/students", (req, res) => {
  res.json({
    message: "students data fetched",
    students: students,
  });
});

app.get("/student1", (req, res) => {
  res.write("Hello");
  res.send();
});

//table using write
app.get("/studenttable", (req, res) => {
  res.set("content-type", "text/html");
  res.write(
    "<center><table cellspacing='5px' cellpadding='8px' border='1px solid'><tr><th>Name</th><th>ID</th></tr>",
  );
  for (i of students) {
    res.write("<tr><td>" + i.name + "</td>");
    res.write("<td>" + i.id + "</td></tr>");
  }
  res.write("</table></center>");
  res.send();
});

app.get("/studentsort", (req, res) => {
  res.set("content-type", "text/html");
  //const desc = students.sort((a,b)=>a.age-b.age) //asc
  const desc = students.sort((a, b) => b.age - a.age); //asc
  //a-->{} b -->{}
  //desc array
  res.write(
    "<center><table cellspacing='5px' cellpadding='8px' border='1px solid'><tr><th>Name</th><th>ID</th><th>AGE</th></tr>",
  );
  for (i of desc) {
    res.write("<tr><td>" + i.name + "</td>");
    res.write("<td>" + i.id + "</td>");
    res.write("<td>" + i.age + "</td></tr>");
  }
  res.write("</table></center>");
  res.send();
});

//route paraams
//params,query

//:id -->req.params
//http://localhost:3000/employee/101
app.get("/employee/:id", (req, res) => {
  console.log(req.params.id);
  res.send("ok");
});

//http://localhost:3000/cal/mon/event/blackday
app.get("/cal/:day/event/:name/plcae/:pname", (req, res) => {
  res.send(req.params);
});

//req.query
//http://localhost:3000/employee1?id=1&name=ram&age=23&city=ahmedabad
//localhost:3000/employee1?id=1&name=ram
http: app.get("/employee1", (req, res) => {
  //res.send(req.query)
  var name = req.query.name;
  var age = req.query.age;
  res.send("Name :" + name + " Age: " + age);
});

//req.body
//json,urlencodeddata,formdata
app.use(express.urlencoded({ extends: true })); //express global middleware apply
app.use(express.json()); //json
app.post("/user", (req, res) => {
  console.log(req.body);
  res.send("ok");
});

app.get("/form", (req, res) => {
  res.send(`<h1>User Form</h1>
<h3>Create User</h3>
<form action="/formuser" method="POST">
<input type="text" name="firstName" placeholder="Enter name" />
<button type="submit">Create</button>
</form>`);
});

app.get("/formuser",(req,res)=>{

    const name = req.query.firstName;
    res.send(`Hlelo ${name } welcome to application`)

})

app.post("/formuser",(req,res)=>{

    const name = req.body.firstName;
    res.send(`Hlelo ${name } welcome to application`)

})


//express custome milldeware.. filter: api call function middleware..

const addNameMiddleware = (req,res,next)=>{

    if(req.body.name){
    
        next() // -->it will go to api..
    }
    else{
        res.send("name is required !!")
    }

}

const addCOllageMiddleware = (req,res,next)=>{

    req.collage = "LJ"
    next()
}
const addTotalMiddleware = (req,res,next)=>{

    req.total = 40+50
    next()
}

app.post("/book",addNameMiddleware,addCOllageMiddleware,addTotalMiddleware,(req,res)=>{

    console.log(req.collage)
    console.log(req.body)
    
    console.log(req.total)
    res.send("book created..")

})







//server creation.
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
