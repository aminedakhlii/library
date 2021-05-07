const pool = require('./pool');

function Lost() {};

Lost.prototype = {

  create : function(body, callback)
  {

      var bind = [];

      for(prop in body){
          bind.push(body[prop]);
      }

      let sql = `INSERT INTO books(title, description , nbr)
      VALUES (?, ?, ?)`;

      let self = this ;

      pool.query(sql, bind, function(err, result) {
          if(err) callback(null);
          else callback(result.insertId) ;
      });
  },

  find : function(id,callback) {

      let sql = `SELECT * FROM books WHERE id = ?`;
      pool.query(sql, id, function(err, result) {
        if(err) throw err ;

        if(result.length) {
            callback(result[0]);
        }else {
            callback(null);
        }

      });
  },

  getAll : function(callback) {
    let sql = `SELECT * FROM books`;
    pool.query(sql, [], function(err, result) {
      if(err) throw err ;

      if(result.length) {
          callback(result);
      }else {
          callback(null);
      }

    });
  },

  delete: function(id,callback) {

        let sql = `DELETE FROM books WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) callback(null);

          else callback('1');
        });

  },

  findByClient : function(clientid , callback) {

    let sql = 'SELECT books.* FROM borrows,books where borrows.uid = ? and borrows.bid = books.id';

    pool.query(sql , clientid , function(err , ret) {
      if (err) console.log(err);
      else {
        callback(ret) ;
        }

      }
    );
  },

  borrow : function(uid, bid, callback) {
    let sql = 'insert into borrows(uid,bid) values(?,?)' ;
    pool.query(sql , [uid,bid], function(err , ret) {
      if(err) {
        console.log(err);
        callback(null) ;
      }
      else {
        let _sql = 'update books set Nbr = Nbr -1 where id = ?' ;
        pool.query(_sql , bid, function(err , ret) {
          if(err) {
            console.log(err);
            callback(null) ;
          }
          else callback(200) ;

      });
    }

    });
  },

  getBorrowed : function(uid , callback) {
    let sql = 'select * from books , borrows where borrows.uid = ? and books.id = borrows.bid' ;
    pool.query(sql , uid, function(err , ret) {
      if(err) {
        console.log(err);
        callback(null) ;
      }

      else callback(ret) ;

    });
  },

  lastId : function(callback) {
    let sql = 'SELECT * FROM books ORDER BY id DESC LIMIT 1;' ;
    pool.query(sql , [], function(err , ret) {
      if(err) console.log(err);
      else if (ret.length == 0) {
        console.log('first post');
        callback([{'id' : 0}]);
      }
      else callback(ret) ;

    });
  }


},


module.exports = Lost ;
