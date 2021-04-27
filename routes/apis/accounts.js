

module.exports = function(app) {



      app.get('/getAllExpenses', async (req, res) => {
      
        var query = `SELECT * from expenses`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })

    app.get('/getJournalExpenses', async (req, res) => {
      
        var query = `SELECT T0.id,T0.credit,T0.debit,T0.currency,T0.description, DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate from zim_meal.salesLedger T0 where T0.docId = 0`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })

    app.get('/getJournalExpensesToday', async (req, res) => {
      
        var query = `SELECT T0.id,T0.credit,T0.debit,T0.currency,T0.description, DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate from zim_meal.salesLedger T0 where T0.docId = 0 and T0.docDate >= curdate()`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })


    app.get('/getLedgerReport', async (req, res) => {
      
      var query = `SELECT T0.id,T0.credit,T0.debit,T0.currency,T0.description, DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.docId from zim_meal.salesLedger T0`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })

  app.get('/getLedgerReportToday', async (req, res) => {
    
      var query = `SELECT T0.id,T0.credit,T0.debit,T0.currency,T0.description, DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.docId from zim_meal.salesLedger T0 where T0.docDate >= curdate()`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })



    app.post('/removeExpenseIdList', async (req, res) => {
        
      var query = `DELETE FROM salesLedger WHERE id = ${req.body.expenseId};`;
      veritassys.query(query, function (error, results, fields) {
        //console.log(error)
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
         
  }) 

    app.post('/getJournalExpensesSpecific', async (req, res) => {
      
        var query = `SELECT T0.id,T0.credit,T0.debit,T0.currency,T0.description, DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate from zim_meal.salesLedger T0 where T0.docId = 0 and T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })

    app.post('/getLedgerReportSpecific', async (req, res) => {
      
      var query = `SELECT T0.id,T0.credit,T0.debit,T0.currency,T0.description, DATE_FORMAT(T0.docDate, "%M %d %Y") as docDate,T0.docId from zim_meal.salesLedger T0 where T0.docDate BETWEEN '${req.body.startDate}' AND '${req.body.endDate}'`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
        
  })


    app.post('/addExpense', async (req, res) => {
        
        var query = `INSERT INTO expenses (expenseName) VALUES ('${req.body.expenseName}')`;
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })


      app.post('/addJournalExpense', async (req, res) => {
        
        var query = `INSERT INTO salesLedger (debit,credit,description,docId,docDate,currency,createdBy) VALUES ('0','${req.body.cost}','${req.body.expenseName}',0,'${req.body.docDate}','${req.body.docCurrency}','${req.body.createdBy}')`;
        veritassys.query(query, function (error, results, fields) {
          //console.log(error)
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
          
    })

      

      app.post('/updateExpense', async (req, res) => {
        
          var query = `UPDATE expenses SET expenseName = '${req.body.expenseName}', WHERE expenseId = '${req.body.expenseId}'`;
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

