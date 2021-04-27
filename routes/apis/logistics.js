

module.exports = function(app) {

    app.get('/getAllDelieries', async (req, res) => {
      
        var query = `SELECT T0.logisticsId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.supplierName,T0.cost,T0.totalCost,T0.weight,T0.description,T0.docCurrency,T3.currencyISO from logisticsIn T0 inner join suppliers T1 on T0.supplierId = T1.supplierId inner join currencies T3 on T0.docCurrency = T3.currencyId`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

    app.get('/getAllCreatedProducts', async (req, res) => {
      
      var query = `SELECT T0.stockCreationId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.productName,T0.materialUsed,T0.createdBags FROM zim_meal.stockCreation T0 inner join products T1 on T0.productId = T1.productId;`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.get('/getAllCreatedProductsToday', async (req, res) => {
      
    var query = `SELECT T0.stockCreationId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.productName,T0.materialUsed,T0.createdBags FROM zim_meal.stockCreation T0 inner join products T1 on T0.productId = T1.productId where T0.docDate >= curdate();`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})


app.get('/getAllCreatedProductsSpecific', async (req, res) => {
      
  var query = `SELECT T0.stockCreationId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.productName,T0.materialUsed,T0.createdBags FROM zim_meal.stockCreation T0 inner join products T1 on T0.productId = T1.productId where T0.docDate >= curdate();`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getRawStock', async (req, res) => {
      
  var query = `SELECT * FROM zim_meal.rawStock;`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

    app.get('/getAllDelieriesToday', async (req, res) => {
      
      var query = `SELECT T0.logisticsId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.supplierName,T0.cost,T0.totalCost,T0.weight,T0.description,T0.docCurrency,T3.currencyISO from logisticsIn T0 inner join suppliers T1 on T0.supplierId = T1.supplierId inner join currencies T3 on T0.docCurrency = T3.currencyId WHERE T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.post('/getAllDelieriesSpecific', async (req, res) => {
      
    var query = `SELECT T0.logisticsId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.supplierName,T0.cost,T0.totalCost,T0.weight,T0.description,T0.docCurrency,T3.currencyISO from logisticsIn T0 inner join suppliers T1 on T0.supplierId = T1.supplierId inner join currencies T3 on T0.docCurrency = T3.currencyId WHERE T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

    


      app.post('/addDeliveryIn', async (req, res) => {
        
          var query = `BEGIN;INSERT INTO logisticsIn (supplierId,weight,cost,docCurrency,docDate,description,totalCost,createdBy) VALUES ('${req.body.supplierId}',${req.body.weight},${req.body.cost},'${req.body.docCurrency}','${req.body.docDate}','${req.body.description}',${req.body.totalCost},'${req.body.createdBy}');
                      INSERT INTO salesLedger (debit,credit,description,docId,currency,docDate,createdBy) VALUES ('0','${req.body.totalCost}','${req.body.description}',LAST_INSERT_ID(),'${req.body.docCurrency}','${req.body.docDate}','${req.body.createdBy}');
                      UPDATE rawStock SET tonnes = tonnes + ${req.body.weight} WHERE rawStockId = 1;
                      COMMIT;`;
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
             
      }) 

      app.post('/addNewStocks', async (req, res) => {
        
        var query = `BEGIN;INSERT INTO stockCreation (productId,materialUsed,createdBags,docDate,createdBy) VALUES (${req.body.productId},${req.body.materialUsed},'${req.body.createdBags}','${req.body.docDate}','${req.body.createdBy}');
                    UPDATE products SET stock = stock + ${req.body.createdBags} WHERE productId = ${req.body.productId};
                    UPDATE rawStock SET tonnes = tonnes - ${req.body.materialUsed} WHERE rawStockId = 1;
                    COMMIT;`;
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
           
    })

      app.post('/removeDeliveryIn', async (req, res) => {
        
        var query = `DELETE FROM logisticsIn WHERE logisticsId = ${req.body.logisticsId};`;
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
           
    })

 

      

      app.post('/updateDeliveryIn', async (req, res) => {
        
          var query = `UPDATE salesOrders SET customerName = '${req.body.customerName}',customerAddress = '${req.body.customerAddress}',customerEmail = '${req.body.customerEmail}',customerPhone = '${req.body.customerPhone}',driverId = '${req.body.driverId}',truckNo = '${req.body.truckNo}',VATNumber = '${req.body.VATNumber}' WHERE customerId = '${req.body.logisticsId}'`;
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

