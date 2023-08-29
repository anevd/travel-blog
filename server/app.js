var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
const cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var server = http.createServer(app);
var port = process.env.PORT || '4000';

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//urls
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port, () => {
  console.log('Server has been started on port', port);
});


