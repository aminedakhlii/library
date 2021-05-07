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

        let sql = `INSERT INTO users(username, email, admin, super_admin, password) VALUES (?, ?, ?, ?, ?)`;

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

          let sql = `UPDATE users SET username = ?, fullname = ?, email = ? WHERE username = ?`;

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

    setAdmin: function(current,target,callback){
      var self = this ;
          if(current.super_admin){
            self.find(target,function(ret_){
              if(ret_){
                console.log(ret_.fullname);
                let sql = `UPDATE users SET admin = true WHERE id = ?`;
                pool.query(sql,ret_.id,function(err , ret){
                  if(err) throw err ;
                  callback(ret_);
                });
              }
            });
          }
          else console.log(current.super_admin);
    },

    delete: function(id,callback) {

        let sql = `DELETE FROM users WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) console.log(err);
          callback();
        });

    },

    getClients : function(callback) {
      let sql = `SELECT * FROM users where admin=false`;
      pool.query(sql, [], function(err, result) {
        if(err) throw err ;

        if(result.length) {
            callback(result);
        }else {
            callback(null);
        }

      });
    },


}

module.exports = User;
