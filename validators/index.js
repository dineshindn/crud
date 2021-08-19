const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('name', 'name should include').exists(),
        body('role', 'role should include ').exists(),
        body('city', 'city should include ').exists(),
       ]   
    }
    case 'updateUser':{
        return [
            body('id', 'id should include').exists(),
            body('name', 'name should include ').exists()
        ]
    }
  }
}
