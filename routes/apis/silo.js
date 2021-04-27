

module.exports = function(app) {

    app.get('/getAllDelieriesSiloIn', async (req, res) => {
      
        var query = `SELECT T0.siloId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.driverName,T0.tonnesIn,T0.description from siloLedger T0 where T0.tonnesIn != 0 order by T0.siloId desc`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

    app.get('/getAllDelieriesSiloOut', async (req, res) => {
      
        var query = `SELECT T0.siloId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.driverName,T0.tonnesOut,T0.description from siloLedger T0 where T0.tonnesOut != 0 order by T0.siloId desc`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

    app.post('/removeJournalSilo', async (req, res) => {
        
      var query = `DELETE FROM siloPayments WHERE siloId = ${req.body.siloId};`;
      veritassys.query(query, function (error, results, fields) {
        //console.log(error)
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
         
  })

  app.post('/removeDeliverySilo', async (req, res) => {
        
    var query = `DELETE FROM siloLedger WHERE siloId = ${req.body.siloId};`;
    veritassys.query(query, function (error, results, fields) {
      //console.log(error)
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
       
})

    app.get('/getAllDelieriesTodaySiloIn', async (req, res) => {
      
        var query = `SELECT T0.siloId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.driverName,T0.tonnesIn,T0.description from siloLedger T0 where T0.docDate >= curdate() and T0.tonnesIn != 0 order by T0.siloId desc`;
        veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.get('/getAllDelieriesTodaySiloOut', async (req, res) => {
      
    var query = `SELECT T0.siloId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.driverName,T0.tonnesOut,T0.description from siloLedger T0 where T0.docDate >= curdate() and T0.tonnesOut != 0 order by T0.siloId desc`;
       veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

  app.post('/getAllDelieriesSpecificSiloIn', async (req, res) => {
      
    var query = `SELECT T0.siloId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.driverName,T0.tonnesIn,T0.description from siloLedger T0 WHERE T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}' and T0.tonnesIn != 0 order by T0.siloId desc`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})



app.post('/getAllDelieriesSpecificSiloOut', async (req, res) => {
    
    var query = `SELECT T0.siloId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.driverName,T0.tonnesOut,T0.description from siloLedger T0 WHERE T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}' and T0.tonnesOut != 0 order by T0.siloId desc`;
    veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

    


      app.post('/addDeliveryInSilo', async (req, res) => {
        
          var query = `INSERT INTO siloLedger (tonnesIn,driverName,truckNo,trailerNo,docDate,description,createdBy) VALUES ('${req.body.tonnesIn}','${req.body.driverId}','${req.body.truckNo}','${req.body.trailerNo}','${req.body.docDate}','${req.body.description}','${req.body.createdBy}')`;
                      
          veritassys.query(query, function (error, results, fields) {
            //console.log(error)
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
            
      })

      app.post('/addDeliveryOutSilo', async (req, res) => {
        
        var query = `INSERT INTO siloLedger (tonnesOut,driverName,truckNo,trailerNo,docDate,description,createdBy) VALUES ('${req.body.tonnesOut}','${req.body.driverId}','${req.body.truckNo}','${req.body.trailerNo}','${req.body.docDate}','${req.body.description}','${req.body.createdBy}')`;
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })


    app.post('/addPaymentInSilo', async (req, res) => {
        
        var query = `INSERT INTO siloPayments (debit,docDate,description,createdBy) VALUES ('${req.body.debit}','${req.body.docDate}','${req.body.description}','${req.body.createdBy}')`;
                    
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })

    app.post('/addPaymentOutSilo', async (req, res) => {
      
      var query = `INSERT INTO siloPayments (credit,docDate,description,createdBy) VALUES ('${req.body.credit}','${req.body.docDate}','${req.body.description}','${req.body.createdBy}')`;
      veritassys.query(query, function (error, results, fields) {
        //console.log(error)
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.get('/getAllPaymentSilo', async (req, res) => {
      
    var query = `SELECT * from siloPayments`;
    veritassys.query(query, function (error, results, fields) {
      //console.log(error)
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

app.get('/getAllPaymentSiloToday', async (req, res) => {
      
    var query = `SELECT * from siloPayments where docDate >= curdate()`;
    veritassys.query(query, function (error, results, fields) {
      //console.log(error)
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

app.post('/getAllPaymentSiloSpecific', async (req, res) => {
      
    var query = `SELECT * from siloPayments WHERE docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`;
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
        
          var query = `UPDATE salesOrders SET customerName = '${req.body.customerName}',customerAddress = '${req.body.customerAddress}',customerEmail = '${req.body.customerEmail}',customerPhone = '${req.body.customerPhone}',driverId = '${req.body.driverId}',truckNo = '${req.body.truckNo}',VATNumber = '${req.body.VATNumber}' WHERE customerId = '${req.body.customerId}'`;
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

