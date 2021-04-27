

module.exports = function(app) {

    app.get('/getAllProducts', async (req, res) => {
      
        var query = `SELECT * from products`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

 
      app.post('/addProduct', async (req, res) => {
        
          var query = `INSERT INTO products (productName,stock,productSize,productCurrency,createdBy) VALUES ('${req.body.productName}','${req.body.stock}','${req.body.productSize}','${req.body.productCurrency}','${req.body.createdBy}')`;
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
       
         
       
      })

      

      app.post('/updateProduct', async (req, res) => {
        
          var query = `UPDATE products SET productName = '${req.body.productName}',stock = '${req.body.stock}',productSize = '${req.body.productSize}',productCurrency = '${req.body.productCurrency}' WHERE productId = '${req.body.productId}'`;
          veritassys.query(query, function (error, results, fields) {
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

