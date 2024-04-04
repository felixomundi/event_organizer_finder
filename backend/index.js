const express = require("express");
const cors =require("cors");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const app = express();
const HOSTNAME = "127.0.0.1";

global.__basedir = __dirname;

const whitelist = ['http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
          callback(new Error('Not Allowed by cors'), false)    
      }
    },
    optionSuccessStatus:200,
    
}
// configure cors
app.use(cors(corsOptions));
// pass json data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/', express.static(path.join(__dirname, 'public')))

// app.use('/api/v1/products', require('./src/routes/productRoute.js'));
app.use('/api/v1/users', require('./src/routes/userRoute.js'));
app.use('/api/v1/events', require('./src/routes/eventRoute.js'));
app.use("/api/v1/tickets", require("./src/routes/ticketRoute.js"));
app.use("/api/v1/orders", require("./src/routes/orderRoute.js"));
app.use("/api/v1/payments", require("./src/routes/mpesaRoute.js"));
app.use("/",(req,res)=>{
    res.status(200)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, './src/views', 'index.html'))
    } else if (req.accepts('json')) {
        res.json({ message: 'VAIBU API' });
    } else {
        res.type('txt').send('VAIBU API');
    }
    return
});
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, './src/views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
    return
})



app.listen(
   PORT,
    () => {
        console.log(`Server running on http://${HOSTNAME}:${PORT}/`);
        
    }
);
