const {pool} = require('../../storage/connection');

module.exports = {
    registerUser: (req, res) => {             
        var sql = `INSERT INTO users (firstName, lastName, username, email, password, repeatPassword)
            VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            req.body.firstName, req.body.lastName, req.body.username, req.body.email, req.body.password, req.body.repeatPassword
        ];
        
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            connection.query(sql,values, function (error, results, fields) {
                console.log(results);
                if(results){
                    res.json({
                        message: `Successfully added new user, Customer ID- ${req.body}`,
                    });
                }
                // When done with the connection, release it.
                connection.release();
            
                // Handle error after the release.
                if (error){
                    console.log("err-->",error);
                    res.status(400).send("Error in saving user")
                }
            
                // Don't use the connection here, it has been returned to the pool.
            });
        });
        pool.on('acquire', function (connection) {
            console.log('Connection %d acquired', connection.threadId);
        });
    }
}