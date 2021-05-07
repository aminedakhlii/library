const pool = require('./pool');
const Room = require('./room')


function Message(){};


Message.prototype = {

  create : function(content,sender,room,callback)
  {

      let sql = `INSERT INTO messages(content,sender,room) VALUES (?, ?, ?)`;

      pool.query(sql, [content,sender,room], function(err, result) {
          if(err) {
            console.log(err);
            callback(null) ; 
          }
          // return the last inserted id. if there is no error
          else callback(result.insertId);

      });
  },

  findById : function(id , callback) {
    let sql = `SELECT * FROM messages WHERE id = ?`;

    pool.query(sql, id, function(err, result) {
        if(err) console.log(err);

        if(result.length) {
            callback(result[0]);
        }else {
            callback(null);
        }
    });

  },

  lastId : function(roomId , callback) {
    let sql = 'SELECT id FROM messages where room = ? ORDER BY id DESC LIMIT 1' ;
    pool.query(sql , roomId, function(err , ret) {
      console.log(this.sql);
      if(err) console.log(err);
      else if (ret.length == 0) {
        callback([{'id' : 0}]);
      }
      else callback(ret) ;
    });
  }

}

module.exports = Message;
