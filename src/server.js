require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connect = require("./db");
const studentRouter = require("./routes/student");
const teacherRouter = require("./routes/teacher");
const lessonsRouter = require("./routes/lessons");

const port = process.env.PORT || 8000;
const app = express();
connect();
//verify()

app.use(express.json());
app.use(cors(
//{origin: process.env.FRONTEND_URL || 'http://192.168.20.21:8000'}  
));

   
app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.json( message , "muy conectado")
  console.log(req)
})

app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);
app.use("/lessons", lessonsRouter);
app.listen(port, () => {
  console.log(`App runnig at http://localhost:${port}`);
});
