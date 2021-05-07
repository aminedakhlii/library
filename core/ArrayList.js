const pool = require('./pool');
function ArrayList(){};
ArrayList.prototype = {



    create: function(body, callback)
    {


        var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }

        let sql = `INSERT INTO ArrayList(name,user,createdAt) VALUES ( ? , ? , ?)`;

        pool.query(sql, bind, function(err, result) {
            if(err) console.log(err);
            else
              callback(result.insertId);
        });
    },






    delete : function(id,callback) {

        let sql = `DELETE FROM ArrayList WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) console.log(err);
          callback();
        });

    },

}

module.exports = ArrayList ; 
