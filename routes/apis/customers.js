

module.exports = function(app) {

    app.get('/getAllCustomers', async (req, res) => {
      
        var query = `SELECT * from customers`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })


      app.post('/addCustomer', async (req, res) => {
        
          var query = `INSERT INTO customers (customerName,customerAddress,customerEmail,customerPhone,VATNumber,createdBy,status) VALUES ('${req.body.customerName}','${req.body.customerAddress}','${req.body.customerEmail}','${req.body.customerPhone}','${req.body.VATNumber}','${req.body.createdBy}',1)`;
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
       
         
       
      })

      

      app.post('/updateCustomer', async (req, res) => {
        
          var query = `UPDATE customers SET customerName = '${req.body.customerName}',customerAddress = '${req.body.customerAddress}',customerEmail = '${req.body.customerEmail}',customerPhone = '${req.body.customerPhone}',VATNumber = '${req.body.VATNumber}' WHERE customerId = '${req.body.customerId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })


      app.post('/updateCustomerStatus', async (req, res) => {
      
          var query = `UPDATE customers SET status = '${req.body.status}' WHERE customerId = '${req.body.customerId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      })
      app.post('/removeCustomer', async (req, res) => {
        
        var query = `DELETE FROM customers WHERE customerId = ${req.body.customerId};`;
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

