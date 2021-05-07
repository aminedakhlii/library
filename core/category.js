const pool = require('./pool');
function Category(){};
Category.prototype = {

    find: function(item = null , callback)
    {


        let sql = `SELECT * FROM category WHERE id = ?`;


        pool.query(sql,item, function(err, result) {
            if(err) console.log(err);

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },


    create: function(body, callback)
    {


        var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }

        let sql = `INSERT INTO category(name,user,createdAt) VALUES ( ? , ? , ?)`;

        pool.query(sql, bind, function(err, result) {
            if(err) console.log(err);
            else
              callback(result.insertId);
        });
    },



    update:function(old,body,callback){

        var self = this ;

        self.find(old , function(result) {

          if(result) {

            var bind = [] ;

            for(prop in body){
                bind.push(body[prop]);
            }

            bind.push(old);

            let sql = `UPDATE category SET name = ?, user = ? ,updatedAt = ?  WHERE id= ?`;

            pool.query(sql, bind, function(err, ret) {

                console.log(this.sql);
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



    delete : function(id,callback) {

        let sql = `DELETE FROM category WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) console.log(err);
          callback();
        });

    },

}

module.exports = Category ;
