const connection = require("../util/connection");

exports.getUser = (req, res, next) => {
    const sql = "SELECT * FROM users where id = 1";
    var x = connection.query(
        sql,
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
        });
    res.send('respond with a resourceeee');
}