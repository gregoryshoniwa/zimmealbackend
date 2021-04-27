//const { query, response } = require("express");

module.exports = function(app) {

  app.get('/getAllBeneficiary', async (req, res) => {
      
    
      var query = `select T0.beneficiaryId,T0.estateId,T1.estateName,T0.firstName,T0.lastName,T0.nationalId,T0.stake,T0.createdAt,T0.updatedAt,CONCAT(T2.firstName,' ',T2.lastName) as createdBy from beneficiaries T0 
      inner join estates T1 on T0.estateId = T1.estateId
      inner join users T2 on T0.createdBy = T2.userId`;
      veritassys.query(query, function (error, results, fields) {
        if (!error) {
          res.send(results);
           
          } else {
            res.status(500).send(error);
          }
      });
  }) 

    app.post('/getBeneficiary', async (req, res) => {
      
        
          var query = `select T0.beneficiaryId,T0.estateId,T1.estateName,T0.firstName,T0.lastName,T0.nationalId,T0.stake,T0.createdAt,T0.updatedAt,CONCAT(T2.firstName,' ',T2.lastName) as createdBy from beneficiaries T0 
          inner join estates T1 on T0.estateId = T1.estateId
          inner join users T2 on T0.createdBy = T2.userId WHERE T0.estateId = '${req.body.estateId}'`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      }) 

      app.post('/addBeneficiary', async (req, res) => {
         
          var query = `INSERT INTO beneficiaries (firstName,lastName,estateId,nationalId,stake,createdBy) VALUES ('${req.body.firstName}','${req.body.lastName}','${req.body.estateId}','${req.body.nationalId}','${req.body.stake}','${req.body.createdBy}')`;
          veritassys.query(query, function (error, results, fields) {
            if (!error) {
              res.send(results);
               
              } else {
                res.status(500).send(error);
              }
          });
      })

      

      app.post('/updateBeneficiary', async (req, res) => {
        
          var query = `UPDATE beneficiaries SET firstName = '${req.body.firstName}',lastName = '${req.body.lastName}',nationalId = '${req.body.nationalId}',stake = '${req.body.stake}' WHERE beneficiaryId = '${req.body.beneficiaryId}'`;
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

