const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const groupRoute = require('./routes/groupRoute.js');
const taskRoute = require('./routes/taskRoute.js');
const tagRoute = require('./routes/tagRoute.js');

const app = express();

app.use(bodyParser.json());

//Database
const connectionString = "databaseConnection";
mongoose.connect(process.env.MONGODB_URI || connectionString, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  dbName: "challenger"
}).then(() => {
	console.log("Successfully connected to the database");
}).catch(err => {
	console.log("Could not connect to the database. Exiting now...", err);
	process.exit();
});
mongoose.Promise = global.Promise;

//CORS policy
app.use((req, res, next) => {
    let allowedOrigins = ['http://localhost:3000'];
    let origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header(
        'Access-Control-Allow-Credentials',
        'true'
    );
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});

//Routers
app.use('/group', groupRoute);
app.use('/task', taskRoute);
app.use('/tag', tagRoute); 
  
//Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
  
//Error handler
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log('Server running on port ' + PORT); });
  
module.exports = app;