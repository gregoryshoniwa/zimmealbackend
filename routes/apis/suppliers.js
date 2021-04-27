

module.exports = function(app) {

    app.get('/getAllSuppliers', async (req, res) => {
      
        var query = `SELECT * from suppliers where status = 1`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })


      app.post('/addSupplier', async (req, res) => {
        
          var query = `INSERT INTO suppliers (supplierName,supplierAddress,supplierEmail,supplierPhone,VATNumber,createdBy,status) VALUES ('${req.body.supplierName}','${req.body.supplierAddress}','${req.body.supplierEmail}','${req.body.supplierPhone}','${req.body.VATNumber}',${req.body.createdBy},1)`;
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
       
         
       
      })

      

      app.post('/updateSupplier', async (req, res) => {
        
          var query = `UPDATE suppliers SET supplierName = '${req.body.supplierName}',supplierAddress = '${req.body.supplierAddress}',supplierEmail = '${req.body.supplierEmail}',supplierPhone = '${req.body.supplierPhone}',VATNumber = '${req.body.VATNumber}' WHERE supplierId = '${req.body.supplierId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })


      app.post('/updateSupplierStatus', async (req, res) => {
      
          var query = `UPDATE suppliers SET status = '${req.body.status}' WHERE supplierId = '${req.body.supplierId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
        
      })

      app.post('/removeSupplier', async (req, res) => {
        
        var query = `DELETE FROM suppliers WHERE supplierId = ${req.body.supplierId};`;
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

