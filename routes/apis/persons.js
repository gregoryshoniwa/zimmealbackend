

module.exports = function(app) {

    app.get('/getAllPersons', async (req, res) => {
      
        var query = `SELECT T0.personId,T0.firstName,T0.lastName,T0.deathRecordId,T0.createdAt,T0.updatedAt,CONCAT(T1.firstName,' ',T1.lastName) as createdBy FROM persons T0 inner join users T1 ON T0.createdBy = T1.userId`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
	        
     
    })

    app.post('/getPerson', async (req, res) => {
      
      
        var query = `SELECT T0.personId,T0.firstName,T0.lastName,T0.deathRecordId,T0.createdAt,T0.updatedAt,CONCAT(T1.firstName,' ',T1.lastName) as createdBy FROM persons T0 inner join users T1 ON T0.createdBy = T1.userId AND T0.personId = '${req.body.personId}'`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
    }) 

      app.post('/addPerson', async (req, res) => {
        
          var query = `INSERT INTO persons (firstName,lastName,deathRecordId,createdBy) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.deathRecordId}',${req.body.createdBy})`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

      

      app.post('/updatePerson', async (req, res) => {
        
          var query = `UPDATE persons SET firstName = '${req.body.firstName}',lastName = '${req.body.lastName}',deathRecordId = '${req.body.deathRecordId}' WHERE personId = '${req.body.personId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

}

async function queryHandler(query) {
  await pool1Connect; // ensures that the pool has been created
  try {
      const request = pool1.request(); // or: new sql.Request(pool1)
      const result = await request.query(query)
     // console.log(result)
      return result;
  } catch (err) {
      //console.error('SQL error', err);
      return err
  }
}

