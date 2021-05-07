const express = require('express');
const router = express.Router() ;
const Room = require('../core/room');
const User = require('../core/user');
const Message = require('../core/message');

room = new Room() ;

router.get('/chats' , (req , res) =>{

  if(req.session.user) {
    let room = new Room() ;
      room.findAll(req.session.user.id ,  function(result){
        res.send(result) ;
      });
  }
});

router.get('/fetchmessages/:id/:lastMessage' , (req , res) =>{
  if(req.session.user) {
    let room = new Room() ;
    room.fetchmessages(req.params.id , req.params.lastMessage , function(messages){
      if(messages) {
        res.send(messages) ;
      }
      else res.send('-1')
    });
  }else res.send(403) ;
});

router.post('/send' , (req , res) =>{
  if(req.session.user){
    let msg = new Message() ;
    msg.create(req.body.content , req.body.sender , req.body.room , function(msg){
      if(msg){
        res.send(200);
      }
      else res.send(500) ;
    });
  }
  else res.send(403) ;
});

router.get('/createRoom/:id' ,  (req , res) => {
  if (req.session.user){
    room.find(req.params.id , req.session.user.id ,  (ret) => {
          if(ret) {
            res.send(ret['id'].toString()) ;
          }
          else room.create(req.session.user.id , req.params.id , 0 , (_ret) => {
            if(_ret) {
              res.send(_ret.toString()) ;
            }
          });
    });
  }
  else res.send(403);
});

module.exports = router ;
