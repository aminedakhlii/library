const pool = require('./pool');
const bcrypt = require('bcrypt');

function User() {};

User.prototype = {

    find : function(user = null , callback)
    {

        if(user) {

            var field = Number.isInteger(user) ? 'id' : 'username';
        }

        let sql = `SELECT * FROM users WHERE ${field} = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) console.log(err);

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },



    create : function(body, callback)
    {

        var pwd = body['password'];

        console.log(pwd);

        body.password = bcrypt.hashSync(pwd,10);


        var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }

        let sql = `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`;

        pool.query(sql, bind, function(err, result) {
            if(err) console.log(err);
            else
              callback(result.insertId);
        });
    },

    login : function(username, password, callback)
    {

        this.find(username, function(user) {

            if(user) {

                if(bcrypt.compareSync(password, user.password)) {

                    callback(user);
                    return;
                }
            }

            callback(null);
        });

    },

    modify : function(old,body,callback){

      var self = this ;

      self.find(old , function(result) {

        if(result) {

          var bind = [] ;

          for(prop in body){
              bind.push(body[prop]);
          }

          bind.push(old);

          let sql = `UPDATE users SET username = ?,  email = ? WHERE id = ?`;

          pool.query(sql, bind, function(err, ret) {
              if(err) console.log(err);

              self.find(bind[0], function(user) {

                  if(user) {
                          callback(user);
                          return;
                  }

                  callback(null);
              });

          });
        }
      });
    },


    delete: function(id,callback) {

        let sql = `DELETE FROM users WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) console.log(err);
          callback();
        });

    },



}

module.exports = User;
