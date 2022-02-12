const { Result } = require('express-validator');

module.exports = function(app) {
    const AdminAuthService = require('../services/RecruiterService')
    const Common = require('../Utils/common')
    require('dotenv').config()
  
    var adminAuthService = new AdminAuthService();
    var common = new Common();
  
    //recruiter login
  
    app.post(`/recruiter/login`, [],  (req, res) => {
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

  
    //Post a Job

    app.post(`/recruiters/addjob`, [],  (req, res) => {
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

    
    //Get Posted Jobs 

    app.get(`/recruiters/jobs/:Id`, [],  (req, res) => {
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
    

    //Register Recruiter
    app.post(`/addrecruiter`, [],  (req, res) => {
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

  //Get Jobs Applied By Employees with name 

  app.get(`/recruiters/seekers/:Id`, [],  (req, res) => {
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



