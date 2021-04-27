

module.exports = function(app) {

    app.get('/getAllSalesOrders', async (req, res) => {
      
        var query = `SELECT T0.salesOrderId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.customerName,T4.productName,T4.productId,T0.docTotal,T0.docCurrency,T0.description,T0.itemData,T0.driverName,quantity,T3.currencyISO from salesOrders T0 inner join customers T1 on T0.customerId = T1.customerId inner join currencies T3 on T0.docCurrency = T3.currencyId inner join products T4 on T0.productId = T4.productId`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
    })

    app.get('/getTotalSales', async (req, res) => {
      
      var query = `SELECT COUNT(T0.salesOrderId) as income ,T1.currencyISO from salesOrders T0 inner join currencies T1 on T0.docCurrency = currencyId group by T1.currencyISO`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.get('/getTotalSalesMonth', async (req, res) => {
      
    var query = `SELECT COUNT(T0.salesOrderId) as income ,T1.currencyISO,month(T0.createdAt) as createdMonth from salesOrders T0 inner join currencies T1 on T0.docCurrency = currencyId where month(T0.createdAt) = month(curdate()) group by T1.currencyISO,createdMonth`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

  app.get('/getTotalSalesGraph', async (req, res) => {
      
    var query = `SELECT SUM(debit) as docTotal,month(docDate) as docMonth,T1.currencyISO FROM zim_meal.salesLedger T0 inner join zim_meal.currencies T1 on T0.currency = T1.currencyId where T1.currencyId = 1 group by month(docDate),currency`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

app.get('/getTotalSalesGraph2', async (req, res) => {
      
  var query = `SELECT SUM(debit) as docTotal,month(docDate) as docMonth,T1.currencyISO FROM zim_meal.salesLedger T0 inner join zim_meal.currencies T1 on T0.currency = T1.currencyId where T1.currencyId = 2 group by month(docDate),currency`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

  app.get('/getTotalCreated', async (req, res) => {
      
    var query = `SELECT COUNT(T0.salesOrderId) as sales from salesOrders T0`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})
app.get('/getTotalCreatedMonth', async (req, res) => {
      
  var query = `SELECT COUNT(T0.salesOrderId) as sales from salesOrders T0 where month(T0.createdAt) = month(curdate())`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})
app.get('/getTotalTonnage', async (req, res) => {
      
  var query = `SELECT (SUM(T0.quantity)*10)/1000 as tonnage from salesOrders T0 `;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
    
})
app.get('/getTotalTonnageMonth', async (req, res) => {
      
  var query = `SELECT (SUM(T0.quantity)*10)/1000 as tonnage from salesOrders T0 where month(T0.createdAt) = month(curdate())`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
    
})

  app.get('/getTotalCustomerSales', async (req, res) => {
      
    var query = `SELECT COUNT(T0.salesOrderId) as sales ,T1.customerName from salesOrders T0 inner join customers T1 on T0.customerId = T1.customerId group by T1.customerId order by sales desc`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

app.get('/getTotalCustomerSalesMonth', async (req, res) => {
      
  var query = `SELECT COUNT(T0.salesOrderId) as sales ,T1.customerName from salesOrders T0 inner join customers T1 on T0.customerId = T1.customerId where month(T0.createdAt) = month(curdate()) group by T1.customerId order by sales desc`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalDriverSales', async (req, res) => {
      
  var query = `SELECT COUNT(T0.salesOrderId) as sales ,T0.driverName from salesOrders T0 group by T0.driverName order by sales desc`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalDriverSalesMonth', async (req, res) => {
      
  var query = `SELECT COUNT(T0.salesOrderId) as sales ,T0.driverName from salesOrders T0 where month(T0.createdAt) = month(curdate()) group by T0.driverName order by sales desc`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalSuppliersIn', async (req, res) => {
      
  var query = `SELECT COUNT(T0.logisticsId) as supplies,T1.supplierName from logisticsIn T0 inner join suppliers T1 on T0.supplierId = T1.supplierId group by T0.supplierId order by supplies desc`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalSuppliersInMonth', async (req, res) => {
      
  var query = `SELECT COUNT(T0.logisticsId) as supplies,T1.supplierName from logisticsIn T0 inner join suppliers T1 on T0.supplierId = T1.supplierId where month(T0.createdAt) = month(curdate()) group by T0.supplierId order by supplies desc`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

  app.get('/getTotalIncome', async (req, res) => {
      
    var query = `SELECT SUM(T0.debit) as income,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId group by T1.currencyISO`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})

app.get('/getTotalIncomeMonth', async (req, res) => {
      
  var query = `SELECT SUM(T0.debit) as income,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId where month(T0.createdAt) = month(curdate()) group by T1.currencyISO`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalExpenses', async (req, res) => {
      
  var query = `SELECT SUM(T0.credit) as income,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId group by T1.currencyISO`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalExpensesMonth', async (req, res) => {
      
  var query = `SELECT SUM(T0.credit) as income,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId where month(T0.createdAt) = month(curdate()) group by T1.currencyISO`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalIncomeToday', async (req, res) => {
      
  var query = `SELECT SUM(T0.docTotal) as income,T1.currencyISO from salesOrders T0 inner join currencies T1 on T0.docCurrency = currencyId where T0.docDate >= curdate() group by T1.currencyISO`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})



app.get('/getTotalExpensesToday', async (req, res) => {
    
var query = `SELECT SUM(T0.credit) as expenses,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId where T0.docDate >= curdate() group by T1.currencyISO`;
veritassys.query(query, function (error, results, fields) {
  if (!error) {
    res.send(results);
     
    } else {
      res.status(500).send(error);
    }
});
  
})

app.get('/getTotalNetProfit', async (req, res) => {
      
  var query = `SELECT (SUM(T0.debit) - SUM(T0.credit)) as income,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId group by T1.currencyISO`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

app.get('/getTotalNetProfitMonth', async (req, res) => {
      
  var query = `SELECT (SUM(T0.debit) - SUM(T0.credit)) as income,T1.currencyISO from salesLedger T0 inner join currencies T1 on T0.currency = currencyId where month(T0.createdAt) = month(curdate()) group by T1.currencyISO`;
  veritassys.query(query, function (error, results, fields) {
    if (!error) {
      res.send(results);
       
      } else {
        res.status(500).send(error);
      }
  });
    
})

    app.get('/getAllSalesOrdersToday', async (req, res) => {
      
      var query = `SELECT T0.salesOrderId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.customerName,T4.productName,T4.productId,T0.docTotal,T0.docCurrency,T0.description,T0.itemData,T0.driverName,quantity,T3.currencyISO from salesOrders T0 inner join customers T1 on T0.customerId = T1.customerId inner join currencies T3 on T0.docCurrency = T3.currencyId inner join products T4 on T0.productId = T4.productId WHERE T0.docDate >= curdate()`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.post('/removeSalesList', async (req, res) => {
        
    var query = `DELETE FROM salesOrders WHERE salesOrderId = ${req.body.salesOrderId};`;
    veritassys.query(query, function (error, results, fields) {
      //console.log(error)
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
       
})

  app.post('/getAllSalesOrdersSpecific', async (req, res) => {
      
    var query = `SELECT T0.salesOrderId,DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T1.customerName,T4.productName,T4.productId,T0.docTotal,T0.docCurrency,T0.description,T0.itemData,T0.driverName,quantity,T3.currencyISO from salesOrders T0 inner join customers T1 on T0.customerId = T1.customerId inner join currencies T3 on T0.docCurrency = T3.currencyId inner join products T4 on T0.productId = T4.productId WHERE T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`;
    veritassys.query(query, function (error, results, fields) {
      if (!error) {
        res.send(results);
         
        } else {
          res.status(500).send(error);
        }
    });
      
})


      app.post('/addSalesOrder', async (req, res) => {
        
          var query = `BEGIN;INSERT INTO salesOrders (customerId,description,docCurrency,docDate,docTotal,itemData,driverName,truckNo,quantity,productId,productSize,createdBy) VALUES ('${req.body.customerId}','${req.body.description}','${req.body.docCurrency}','${req.body.docDate}','${req.body.docTotal}','${req.body.itemData}','${req.body.driverId}','${req.body.truckNo}','${req.body.quantity}','${req.body.productId}','${req.body.productSize}','${req.body.createdBy}');
                      INSERT INTO salesLedger (debit,credit,description,docId,currency,docDate,createdBy) VALUES ('${req.body.docTotal}','0','${req.body.description}',LAST_INSERT_ID(),'${req.body.docCurrency}','${req.body.docDate}','${req.body.createdBy}');
                      UPDATE products SET stock = stock - ${req.body.quantity} WHERE productId = ${req.body.productId};
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

      

      app.post('/updateSalesOrders', async (req, res) => {
        
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

