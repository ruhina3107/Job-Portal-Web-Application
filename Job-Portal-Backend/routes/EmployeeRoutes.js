

module.exports = function(app) {
  const { Result } = require('express-validator');
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })
    const AdminAuthService = require('../services/EmployeeService')
    const Common = require('../Utils/common')
    require('dotenv').config()
  
    var adminAuthService = new AdminAuthService();
    var common = new Common();
  
  
    app.post(`/employee/login`, [
        // validator.check('Email').isEmail()
        // .withMessage('INVALID: $[1],Email Id'),
        // validator.check('Password').isLength({ min: 8, max: 15 })
        // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
    ],  (req, res) => {
        var response = {}
        var data = req.body 
        console.log(data)
        adminAuthService.adminVerifyPwd(data, (result) => {
           
            if (result.error) {
              response.status = 0
           
            } else {
                console.log("in")
              response.status = 1
              response.data = result.data
            }
            console.log("final ",response)
            return res.send(response)
        })

        
        
    })


    app.get(`/employees/getjobs/:userId`, [
        // validator.check('Email').isEmail()
        // .withMessage('INVALID: $[1],Email Id'),
        // validator.check('Password').isLength({ min: 8, max: 15 })
        // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
    ],  (req, res) => {
        var response = {}
        var data = req.body 
        data.userId = req.params.userId
        console.log(data)
        adminAuthService.getAllJobs(data, (result) => {
           
            if (result.error) {
              response.length = 0
              response.message = 0
           
            } else {
                console.log("in")
              response.length = 1
              response.data = result.data
            }
            console.log("final ",response)
            return res.send(response)
        })

       
        
    })

    

    app.get(`/employees/appliedlist/:userId`, [
      // validator.check('Email').isEmail()
      // .withMessage('INVALID: $[1],Email Id'),
      // validator.check('Password').isLength({ min: 8, max: 15 })
      // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
  ],  (req, res) => {
      var response = {}
      var data = req.body
      data.userId = req.params.userId
      console.log(data)
      adminAuthService.getAppliedJobs(data, (result) => {
         
          if (result.error) {
            response.status = 0
            response.message = 'No Jobs Applied '
         
          } else {
              console.log("in")
            response.status = 1
            response.data = result.data
            response.message = ''
          }
          console.log("final ",response)
          return res.send(response)
      })

   
      
  })


    app.post(`/employees/apply/:userId/:jobId`, [
      // validator.check('Email').isEmail()
      // .withMessage('INVALID: $[1],Email Id'),
      // validator.check('Password').isLength({ min: 8, max: 15 })
      // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
  ],  (req, res) => {
      var response = {}
      var data = req.body 
      data.userId = parseInt(req.params.userId)
      jobId = req.params.jobId
      data.status = 'applied'
      console.log(data)
      adminAuthService.updatejobstatus(data, (result) => {
         
          if (result.error) {
            response.status = 0
            response.message = 'No Jobs Found'
         
          } else {
              console.log("in")
            response.status = 1
            response.message = 'Job Applied successfully'
          }
          console.log("final ",response)
          return res.send(response)
      }) 
  })

  
  app.post(`/addemployee`, [
    // validator.check('Email').isEmail()
    // .withMessage('INVALID: $[1],Email Id'),
    // validator.check('Password').isLength({ min: 8, max: 15 })
    // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
],  (req, res) => {
    var response = {}
    var data = req.body 
    console.log(data)
    adminAuthService.addemployee(data, (result) => {
       
        if (result.error) {
          response.status = 0
       
        } else {
            console.log("in")
          response.status = 1
          response.data = result.data
        }
        console.log("final ",response)
        return res.send(response)
    })        
})
  


app.post(`/employee/uploadresume/:userId`, [
  // validator.check('Email').isEmail()
  // .withMessage('INVALID: $[1],Email Id'),
  // validator.check('Password').isLength({ min: 8, max: 15 })
  // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
],  (req, res) => {
  var response = {}
  console.log(req)
  var data = req.body 
  console.log(data)
  adminAuthService.providerFileUploadService(data, (result) => {
     
      if (result.error) {
        response.status = 0
     
      } else {
          console.log("in")
        response.status = 1
        response.data = result.data
      }
      console.log("final ",response)
      return res.send(response)
  })        
})

app.post('/file', upload.single('file'), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error('No File')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file);
})



app.get(`/employees/profile/:userId`, [
  // validator.check('Email').isEmail()
  // .withMessage('INVALID: $[1],Email Id'),
  // validator.check('Password').isLength({ min: 8, max: 15 })
  // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
],  (req, res) => {
  var response = {}
  //console.log(req)
  var data = req.body 
  //console.log(data)
  data.Id = req.params.userId
  adminAuthService.getProfile(data, (result) => {
     console.log(result)
      if (result.error) {
        response.status = 0
     
      } else {
          console.log("in")
        response.status = 1
        response.data = result.data
      }
      console.log("final ",response)
      return res.send(response)
  })        
})

app.put(`/employees/editprofile/:userId`, [
  // validator.check('Email').isEmail()
  // .withMessage('INVALID: $[1],Email Id'),
  // validator.check('Password').isLength({ min: 8, max: 15 })
  // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
],  (req, res) => {
  var response = {}
  var data = req.body 
  var userId = req.params.userId
  console.log(data)
  adminAuthService.updateProfile(data,userId, (result) => {
     
      if (result.error) {
        response.status = 0
     
      } else {
          console.log("in")
        response.status = 1
        response.data = result.data
      }
      console.log("final ",response)
      return res.send(response)
  })
})

app.get(`/employees/companyname/:companyname`, [
  // validator.check('Email').isEmail()
  // .withMessage('INVALID: $[1],Email Id'),
  // validator.check('Password').isLength({ min: 8, max: 15 })
  // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
],  (req, res) => {
  var response = {}
  var data = req.body 
  data.companyName = req.params.companyname
  console.log(data)
  adminAuthService.search(data, (result) => {
     
      if (result.error) {
        response.status = 0
        response.data = result.data
     
      } else {
          console.log("in")
        response.status = 1
        response.data = result.data
      }
      console.log("final ",response)
      return res.send(response)
  })    
})


  app.get(`/employees/jobrole/:jobrole`, [
    // validator.check('Email').isEmail()
    // .withMessage('INVALID: $[1],Email Id'),
    // validator.check('Password').isLength({ min: 8, max: 15 })
    // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
  ],  (req, res) => {
    var response = {}
    var data = req.body 
    data.jobRole = req.params.jobrole
    console.log(data)
    adminAuthService.search(data, (result) => {
       
        if (result.error) {
          response.status = 0
          response.data = result.data
       
        } else {
            console.log("in")
          response.status = 1
          response.data = result.data
        }
        console.log("final ",response)
        return res.send(response)
    })    
  })
  
}



