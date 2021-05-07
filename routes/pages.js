const express = require('express');
const User = require('../core/user');
const Item = require('../core/item');
const Category = require('../core/category');
const ArrayList = require('../core/arraylist');
const List = require('../core/list');
const ListOfItems = require('../core/listOfItems');
const router = express.Router() ;
const multer = require('multer') ;

user = new User() ;
item = new Item() ;
category = new Category() ;
array = new ArrayList() ;
list = new List();
listOfItems = new ListOfItems() ;


router.post('/login' , (req,res,next) => {
  user.login(req.body.username,req.body.password, function(result) {
    if(result) {
      console.log('logged ' + result.username);
      req.session.user = result;
      req.session.opp = 1;
      res.send({"id" : result.id}) ;

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

router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            console.log('disconnected');
        });
    }
    else {
      console.log('not connected !');
    }
});

// updates

router.put('/updateUser/:id' , (req , res) => {
  if(req.session.user) {
    let input = {
      username  : req.body.username,
      email  : req.body.email,
    }

    user.update(req.params.id,input, function(result) {
      req.session.user = result;
      req.session.opp = 1 ;
      res.sendStatus(200);
    });
  }
});

router.put('/updateItem/:id' , (req , res) => {
  if(req.session.user) {
    let input = {
      name  : req.body.name,
      category  : req.body.category,
      user  : req.body.user,
      note  : req.body.note,
      image  : req.body.image,
      createdAt  : req.body.createdAt,
    }

    items.update(req.params.id,input, function(result) {
      req.session.user = result;
      req.session.opp = 1 ;
      res.sendStatus(200);
    });
  }
});

router.put('/updateList/:id' , (req , res) => {
  if(req.session.user) {
    let input = {
      name  : req.body.name,
      user  : req.body.user,
      createdAt  : req.body.createdAt,
    }

    list.update(req.params.id,input, function(result) {
      req.session.user = result;
      req.session.opp = 1 ;
      res.sendStatus(200);
    });
  }
});

router.put('/updateCategory/:id' , (req , res) => {
  if(req.session.user) {
    let input = {
      name  : req.body.name,
      user  : req.body.user,
      createdAt  : req.body.createdAt,
    }

    user.update(req.params.id,input, function(result) {
      req.session.user = result;
      req.session.opp = 1 ;
      res.sendStatus(200);
    });
  }
});


// deletion

router.delete('/deleteItem/:id' , (req , res) => {
  if(req.session.user) {
    item.delete(req.params.id,
      () => {
          res.send();
      }
    );
  }
  else res.send(403);
});

router.delete('/deleteList/:id' , (req , res) => {
  if(req.session.user) {
    list.delete(req.params.id,
      () => {
          res.send();
      }
    );
  }
  else res.send(403);
});

router.delete('/deleteCategory/:id' , (req , res) => {
  if(req.session.user) {
    category.delete(req.params.id,
      () => {
          res.send();
      }
    );
  }
  else res.send(403);
});

router.delete('/deleteUser/:id' , (req , res) => {
  if(req.session.user) {
    user.delete(req.params.id,
      () => {
          res.send();
      }
    );
  }
  else res.send(403);
});

router.delete('/deleteListOfItems/:id' , (req , res) => {
  if(req.session.user) {
    listOfItems.delete(req.params.id,
      () => {
          res.send();
      }
    );
  }
  else res.send(403);
});

router.delete('/deleteArray/:id' , (req , res) => {
  if(req.session.user) {
    array.delete(req.params.id,
      () => {
          res.send();
      }
    );
  }
  else res.send(403);
});

// finding

router.get('/user/:id' , (req , res) => {
  if(req.session.user) {
    user.find(req.params.id,
      (ret) => {
          if(ret) res.send(ret);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/item/:id' , (req , res) => {
  if(req.session.user) {
    item.find(req.params.id,
      (ret) => {
          if(ret) res.send(ret);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/category/:id' , (req , res) => {
  if(req.session.user) {
    category.find(req.params.id,
      (ret) => {
          if(ret) res.send(ret);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/list/:id' , (req , res) => {
  if(req.session.user) {
    list.find(req.params.id,
      (ret) => {
          if(ret) res.send(ret);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.get('/category/:list_id' , (req , res) => {
  if(req.session.user) {
    listOfItems.find(req.params.list_id,
      (ret) => {
          if(ret) res.send(ret);
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});













// Creation


router.post('/createItem' , (req , res) => {
  if(req.session.user) {

    let input = {
      name  : req.body.name,
      category  : req.body.category,
      user  : req.body.user,
      note  : req.body.note,
      image  : req.body.image,
      createdAt  : req.body.createdAt,
    }

    item.create(
      input, (result) => {
          if(result)res.send(200) ;
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.post('/createCategory' , (req , res) => {
  if(req.session.user) {

    let input = {
      name  : req.body.name,
      user  : req.body.user,
      createdAt  : req.body.createdAt,
    }

    category.create(
      input, (result) => {
          if(result)res.send(200) ;
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.post('/createList' , (req , res) => {
  if(req.session.user) {

    let input = {
      name  : req.body.name,
      user  : req.body.user,
      createdAt  : req.body.createdAt,
    }

    list.create(
      input, (result) => {
          if(result)res.send(200) ;
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.post('/createListOfItems' , (req , res) => {
  if(req.session.user) {

    let input = {
      list  : req.body.list,
      item  : req.body.item,
    }

    listOfItems.create(
      input, (result) => {
          if(result)res.send(200) ;
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

router.post('/createArrayList' , (req , res) => {
  if(req.session.user) {

    let input = {
      list  : req.body.list,
      number  : req.body.number,
    }

    array.create(
      input, (result) => {
          if(result)res.send(200) ;
          else res.send(500) ;
      }
    );
  }
  else res.send(403);
});

module.exports = router ;
