const pool = require('./pool');
function List(){};
List.prototype = {

    find: function(item = null , callback)
    {


        let sql = `SELECT * FROM List WHERE id = ?`;


        pool.query(sql,list, function(err, result) {
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

        let sql = `INSERT INTO List(name,user,createdAt) VALUES ( ? , ? , ?)`;

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

            let sql = `UPDATE List SET name = ?, updatedAt = ?  WHERE id= ?`;

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



    delete : function(id,callback) {

        let sql = `DELETE FROM List WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) console.log(err);
          callback();
        });

    },

}

module.exports = List ;
