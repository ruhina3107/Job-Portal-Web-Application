const { Result } = require('express-validator');

module.exports = function(app) {
    const AdminAuthService = require('../services/RecruiterService')
    const Common = require('../Utils/common')
    require('dotenv').config()
  
    var adminAuthService = new AdminAuthService();
    var common = new Common();
  
  
    app.post(`/recruiter/login`, [
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


    app.post(`/recruiters/addjob`, [
        // validator.check('Email').isEmail()
        // .withMessage('INVALID: $[1],Email Id'),
        // validator.check('Password').isLength({ min: 8, max: 15 })
        // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
    ],  (req, res) => {
        var response = {}
        var data = req.body 
        //data.companyId = req.params.Id
        console.log(data)
        adminAuthService.insertJob(data, (result) => {
           
            if (result.error) {
              response.status = 0
              response.message = 'Duplicate Value found'
           
            } else {
                console.log("in")
              response.status = 1
              response.message ='Job post Successful'
            }
            console.log("final ",response)
            return res.send(response)
        })

        
        
    })


    app.get(`/recruiters/jobs/:Id`, [
        // validator.check('Email').isEmail()
        // .withMessage('INVALID: $[1],Email Id'),
        // validator.check('Password').isLength({ min: 8, max: 15 })
        // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
    ],  (req, res) => {
        var response = {}
        var data = req.body 
        data.companyId = req.params.Id
        console.log(data)
        adminAuthService.getpostedjob(data, (result) => {
           
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
    
    app.post(`/addrecruiter`, [
      // validator.check('Email').isEmail()
      // .withMessage('INVALID: $[1],Email Id'),
      // validator.check('Password').isLength({ min: 8, max: 15 })
      // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
  ],  (req, res) => {
      var response = {}
      var data = req.body 
      console.log(data)
      adminAuthService.addrecruiter(data, (result) => {
         
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

  
  app.get(`/recruiters/seekers/:Id`, [
    // validator.check('Email').isEmail()
    // .withMessage('INVALID: $[1],Email Id'),
    // validator.check('Password').isLength({ min: 8, max: 15 })
    // .withMessage('TEXT_LIMIT: $[1] $[2] $[3],password,8,15')
],  (req, res) => {
    var response = {}
    var data = req.body 
    data.companyId = parseInt(req.params.Id)
    console.log(data)
    adminAuthService.getAppliedJobs(data, (result) => {
       
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



