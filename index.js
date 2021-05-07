const express = require('express') ;
const session = require('express-session');
const http = require('http');
const path = require('path') ;
const pageRouter = require('./routes/pages');
const chatsRouter = require('./routes/chatroutes');
const app = express() ;
const server = http.createServer(app) ;
const bodyParser = require('body-parser');



app.use(express.static(__dirname + '/data'));
app.use((req , res , next) => {
  console.log(req.url);
  next();
});

app.use(session({
  secret:'<wvTWL.pn:L(WM_q"}uRXp9=uB^=g',
  resave: false,
  saveUninitialized: false,
  cookie : {
    maxAge : Date.now() + (30 * 86400 * 1000)
  }
}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.use('/',pageRouter);
app.use('/messages/',chatsRouter);


app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

server.listen('3000',
  () => console.log('running ..')
);
