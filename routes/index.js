const usersRoute = require('./apis/users')
const beneficiariesRoute = require('./apis/beneficiaries')
const estatesRoute = require('./apis/estates')
const financialsRoute = require('./apis/financials')
const personsRoute = require('./apis/persons')
const documentsRoute = require('./apis/documents')
const customerRoute = require('./apis/customers')
const supplierRoute = require('./apis/suppliers')
const productRoute = require('./apis/products')
const salesRoute = require('./apis/salesorders')
const logisticsRoute = require('./apis/logistics')
const accountsRoute = require('./apis/accounts')
const siloRoute = require('./apis/silo')



module.exports = (app) => {
  
    usersRoute(app);
    beneficiariesRoute(app);
    estatesRoute(app);
    financialsRoute(app);
    personsRoute(app);
    documentsRoute(app);
    customerRoute(app);
    supplierRoute(app);
    productRoute(app);
    salesRoute(app);
    logisticsRoute(app);
    accountsRoute(app);
    siloRoute(app);
   
}