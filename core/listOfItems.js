const pool = require('./pool');
function ListOfItems(){};
ListOfItems.prototype = {

    find: function(list = null , callback)
    {


        let sql = `SELECT * FROM listOfItems WHERE list = ?`;


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

        let sql = `INSERT INTO listOfItems(list,item) VALUES ( ? , ? )`;

        pool.query(sql, bind, function(err, result) {
            if(err) console.log(err);
            else
              callback(result.insertId);
        });
    },




    delete : function(id,callback) {

        let sql = `DELETE FROM listOfItems WHERE id = ?`;
        pool.query(sql,id,function(err , ret) {
          if(err) console.log(err);
          callback();
        });

    },

}

module.exports = ListOfItems ;
