const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const graphqlHTTP = require('express-graphql');
const helmet = require('helmet');
const graphQLSchema = require('./graphql/schema/index');
const graphQLResolver = require('./graphql/resolvers/index');
const { IpDeniedError } = require('express-ipfilter');
const indexRouter = require('./routes/index');


const app = express();
app.use(helmet());
app.use(compression());
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLResolver,
  graphiql: true
}));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//   if (err instanceof IpDeniedError) {
//     res.status(401);
//     let ipAddress = '';
//     if (req.headers['x-real-ip']) {
//       ipAddress = req.headers['x-real-ip'];
//     } else if (req.header['x-forwarded-for']) {
//       ipAddress = req.headers['x-forwarded-for'].split(',')[0];
//     } else if (req.socket.remoteAddress) {
//       ipAddress = req.socket.remoteAddress;
//     }
//     res.json({
//       err: true,
//       message: `${ipAddress} tidak diizinkan mengakses server.`,
//     });
//   } else {
//     res.status(err.status || 500);
//     res.render('error');
//   }

  render the error page
  res.status(err.status || 500);
  res.render('error');
  res.json(err);
});

console.log(`Server started from ${new Date().toISOString()}`)

module.exports = app;
