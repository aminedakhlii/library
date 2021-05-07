const express = require('express');
const User = require('../core/user');
const Book = require('../core/book');
const router = express.Router() ;
const multer = require('multer') ;

user = new User() ;
book = new Book() ;

function setStorage(userId) {

  let storage =  multer.diskStorage({
    destination : `${__dirname}/../data/images/user/${userId}`,
    filename : function(req , file , cb){
      cb(null , userId.toString() + '.jpeg' ) ;
    }
  });

  return multer({storage : storage}).single('image') ;

}

router.post('/login' , (req,res,next) => {
  user.login(req.body.username,req.body.password, function(result) {
    if(result) {
      console.log('logged ' + result.username);
      req.session.user = result;
      req.session.opp = 1;
      res.send({"id" : result.id , "admin" : result.admin}) ;

      }
    else res.send(403) ;
  });
});

router.post('/register' , (req,res) => {

  console.log(req.body);

  let input = {
    username  : req.body.username,
    email  : req.body.email,
    admin  : false,
    super_admin  : false,
    password : req.body.password
  }


  user.create(input,function(result){
    if(result) {

      req.session.user = result;
      req.session.opp = 0;
      res.send(200);

    }
    else res.send('error registering!');
  });

});

router.get('/setAdmin/:id', (req , res ) => {
  if(req.session.user) {
    user.setAdmin(req.session.user,parseInt(req.params.id),function(result){
      res.send(result.username + "is admin") ;
    });
  }
});

router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            console.log('disconnected');
            res.redirect('/');
        });
    }
    else {
      console.log('not connected !');
    }
});

router.get('/testsession' , (req , res) =>{
  if(req.session.user) {
    res.send(200) ;
  }
  else res.send(403);
});

router.get('/books' , (req , res) => {
  if(req.session.user) {
    book.getAll(
      (books) => {
          if(books) res.send(books);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/clients' , (req , res) => {
  if(req.session.user) {
    user.getClients(
      (clients) => {
          if(clients) res.send(clients);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/borrowed/:id' , (req , res) => {
  if(req.session.user) {
    book.findByClient(req.params.id,
      (books) => {
          if(books) res.send(books);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/deleteBook/:id' , (req , res) => {
  if(req.session.user) {
    book.delete(req.params.id,
      (books) => {
          if(books) res.send(books);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/borrow/:id' , (req , res) => {
  if(req.session.user) {
    book.borrow(req.session.user.id , req.params.id,
      (books) => {
          if(books) res.send(books.toString());
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/mybooks/:id' , (req , res) => {
  if(req.session.user) {
    book.getBorrowed(req.params.id,
      (books) => {
          if(books) res.send(books);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.post('/createBook' , (req , res) => {
  if(req.session.user) {

    let input = {
      title  : req.body.title,
      description  : req.body.description,
      Nbr : req.body.Nbr
    }

    book.create(
      input, (result) => {
          if(result)res.send(200) ;
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

module.exports = router ;
