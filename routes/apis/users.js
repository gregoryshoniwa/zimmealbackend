

module.exports = function(app) {

  app.get('/getAdmin', async (req, res) => {
      
    var query = `SELECT (DATE(createdAt) - DATE(updatedAt)) as leftDays FROM zim_meal.admin where DATE(createdAt) > DATE(updatedAt)`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

    app.get('/getAllUsers', async (req, res) => {
      
        var query = `SELECT B.userId,B.firstName,B.lastName,B.emailAddress,B.status,CONCAT(A.firstName,' ',A.lastName) as createdBy,T0.id as userTypes FROM users A,users B inner join userTypes T0 on B.userType = T0.id WHERE A.userId = B.createdBy`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

    app.get('/getAllDrivers', async (req, res) => {
      
      var query = `SELECT CONCAT(B.firstName,' ',B.lastName) as fullName,B.userId,B.firstName,B.lastName,B.emailAddress,B.status,CONCAT(A.firstName,' ',A.lastName) as createdBy,T0.id as userTypes FROM users A,users B inner join userTypes T0 on B.userType = T0.id WHERE A.userId = B.createdBy AND B.userType = 4`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

    app.post('/getUser', (req, res) => {
      
          var query = `SELECT B.userId,B.firstName,B.lastName,B.emailAddress,B.status,CONCAT(A.firstName,' ',A.lastName) as createdBy,T0.id as userTypes FROM users A,users B inner join userTypes T0 on B.userType = T0.id WHERE A.userId = B.createdBy AND B.emailAddress = '${req.body.emailAddress}' AND B.userPassword = '${req.body.userPassword}' and B.status = 1`;
         
          
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error); 
              }
          });
        
      }) 

      app.post('/addUser', async (req, res) => {
        
          var query = `INSERT INTO users (firstName,lastName,emailAddress,userPassword,createdBy,userType,status,nationalId,driversId) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.emailAddress}','${req.body.userPassword}',${req.body.createdBy},${req.body.usertype},1,'${req.body.nationalId}','${req.body.driversId}')`;
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
       
         
       
      })

      

      app.post('/updateUser', async (req, res) => {
        
          var query = `UPDATE users SET firstName = '${req.body.firstName}',lastName = '${req.body.lastName}',emailAddress = '${req.body.emailAddress}',userType = '${req.body.usertype}',nationalId = '${req.body.nationalId}',driversId = '${req.body.driversId}' WHERE userId = '${req.body.userId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

      app.post('/updatePassword', async (req, res) => {
        
          var query = `UPDATE users SET userPassword = '${req.body.userPassword}' WHERE userId = '${req.body.userId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      })

      app.get('/updateAdmin', async (req, res) => {
        
        var query = `UPDATE admin SET login = '${Date.now()}' WHERE id = 1`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
      
    })

      app.post('/updateStatus', async (req, res) => {
      
          var query = `UPDATE users SET status = '${req.body.status}' WHERE userId = '${req.body.userId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      })

      app.post('/removeUser', async (req, res) => {
        
        var query = `DELETE FROM users WHERE userId = ${req.body.userId};`;
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
           
    })


}

 function queryHandler(query) {
   
  
    veritassys.query(query, function (error, results, fields) {
      // When done with the connection, release it.
      if (!error) {
          
          return error;
          
				} else {
          
          return results;
				}
    });
 
  
}

