
module.exports = function(app) {

    app.get('/getAllEstates', async (req, res) => {
      
        var query = `select T0.estateId,T0.estateName,T0.estateValue,CONCAT(T1.firstName,' ',T1.lastName) as estateOwner,T0.createdAt,T0.updatedAt,T2.firstName + ' ' + T2.lastName as createdBy,T0.estateStatus from estates T0
        inner join persons T1 on T0.deathRecordId = T1.personId
        inner join users T2 on T0.createdBy = T2.userId`;
        veritassys.query(query, function (error, results, fields) {
          if (!error) {
            res.send(results);
             
            } else {
              res.status(500).send(error);
            }
        });
    })

    app.post('/getEstate', async (req, res) => {
      
        
          var query = `select T0.estateId,T0.estateName,T0.estateValue,CONCAT(T1.firstName,' ',T1.lastName) as estateOwner,T0.createdAt,T0.updatedAt,T2.firstName + ' ' + T2.lastName as createdBy,T0.estateStatus from estates T0
          inner join persons T1 on T0.deathRecordId = T1.personId
          inner join users T2 on T0.createdBy = T2.userId where T0.deathRecordId = ${req.body.personId}`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      }) 

      app.post('/addEstate', async (req, res) => {
        
          var query = `INSERT INTO estates (estateName,estateValue,deathRecordId,createdBy) VALUES ('${req.body.estateName}','${req.body.estateValue}','${req.body.deathRecordId}','${req.body.createdBy}')`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

      

      app.post('/updateEstate', async (req, res) => {
        
          var query = `UPDATE estates SET estateName = '${req.body.estateName}',estateValue = '${req.body.estateValue}' WHERE estateId = '${req.body.estateId}'`;
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

