const express           = require('express');
const app               = express();
const mongoose          = require('mongoose');
const multer            = require('multer'); 
const cors              = require('cors');
const helmet            = require('helmet');
const morgan            = require('morgan');
const bodyParser        = require('body-parser');
const verifyToken       = require("./middleware/auth.js");
const controller        = require("./controllers/Controller.js");
const path              = require('path');
const blogRoutes        = require("./routes/Routes.js");
const url               = require('url');

require('dotenv').config();


const port              = process.env.PORT;
const dataBaseUrl       = process.env.USERS_DATABASE_URL;
app.use(cors({
        origin:"https://6512ef1e9649bb12326419fc--thriving-cranachan-4a295d.netlify.app/"
}));

        

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));



app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use("/assets", express.static(path.join(__dirname,"public/assets")));

const storage = multer.diskStorage({
    
    destination:function(req,file,cb)
    {
        cb(null,"./public/assets");
    },
    filename:function(req,file,cb)
    {
        cb(null,file.originalname);
    }
   
}) 

const upload = multer({storage:storage});






app.post("/blog/v1/user/posts", verifyToken, upload.single("imageContent"),controller.createPost);
app.patch("/blog/v1/editpost", verifyToken, upload.single("imageContent"),controller.updatePost);


app.use("/blog/v1",blogRoutes);

mongoose.connect(dataBaseUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });




const db = mongoose.connection;

db.once('connected',()=>
{
    console.log('Database is connected');
})

db.on('error',(error)=>
{   console.log("Datbase is not connected");
    console.log(error);
})

app.listen(port,()=>{
 console.log(`Server is running on port ${port}`)});







