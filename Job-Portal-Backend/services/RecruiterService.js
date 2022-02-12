module.exports = function () {
    const AdminAuthRepository = require('../repository/RecruiterRepository')
    const Common = require('../Utils/common')
    require('dotenv').config()
  
    var adminAuthRepository = new AdminAuthRepository();
    var common = new Common();
  
    this.adminVerifyPwd = async (data, callback) => {
      var response = {}
      try {
        var admin = {}
        admin.companyName = data.companyName
        var adminDetailsData = await adminAuthRepository.fetchadminDetails(admin)
        console.log(adminDetailsData)
        if (adminDetailsData.error === false) {
          var adminDetails = adminDetailsData.data[0]
          var compare = true//await common.comparePassword(data.Password, adminDetails.Password)
          if (adminDetails.Email === data.Email && compare === true) {
            var adminAuth = {}
            adminAuth.Id = adminDetails.Id
            adminAuth.Roles = 'admin'
            var adminList = {}
           
            adminList.companyName = adminDetails.companyName
            adminList.Id = adminDetails.Id
            adminList.token = await common.generateToken(adminAuth, process.env.JWT_SECRET)
            response.error = false
            response.data = adminList
            response.msg = 'VALID'
            console.log("response",response)
          } else {
            response.error = true
            response.msg = 'FAILED: $[1],Password'
          }
        } else {
          response.error = true
          response.msg = 'FAILED: $[1],Email Id'
        }
        callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    }

    
    this.insertJob = async (data, callback) => {
        var response = {}
        try {
            
              var appsliderInsertData = await adminAuthRepository.jobAdd(data)
              if (appsliderInsertData.error === false) {
                response.error = false
                response.data = appsliderInsertData.data[0]
                response.msg = 'VALID'
              } else {
                response.error = true
                response.msg = 'FAILED'
              }
              callback(response)
        } catch (err) {
          err.error = true
          err.msg = 'OOPS'
          callback(err)
        }
      }

      this.getpostedjob = async (data, callback) => {
        var response = {}
        try {
            
              var appsliderInsertData = await adminAuthRepository.getjobs(data.companyId)
              if (appsliderInsertData.error === false) {
                response.error = false
                response.data = appsliderInsertData.data
                response.msg = 'VALID'
              } else {
                response.error = true
                response.msg = 'FAILED'
              }
              callback(response)
        } catch (err) {
          err.error = true
          err.msg = 'OOPS'
          callback(err)
        }
      }

    this.adminVerifyTokenService = async (data, callback) => {
      var response = {}
      try {
        var admin = {}
        switch (data.Roles) {
          case 'admin':
            admin.where = { Id: data.Id }
            admin.role = 'Admin'
            break
          case 'users':
            admin.where = { Id: data.Id }
            admin.role = 'Users'
            break
          case 'providers':
            admin.where = { Id: data.Id }
            admin.role = 'Provider'
            break
          default:
            console.log('Error')
            break
        }
        var adminTokenData = await adminAuthRepository.adminVerifyJwtToken(admin)
        if (adminTokenData.error === false) {
          var adminTokenDetails = adminTokenData.data[0]
          response.error = false
          response.msg = 'VALID'
          response.data = adminTokenDetails
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
        callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    }


    this.addrecruiter = async (data, callback) => {
      var response = {}
      try {
          
            var appsliderInsertData = await adminAuthRepository.recRegister(data)
            if (appsliderInsertData.error === false) {
              response.error = false
              response.data = appsliderInsertData.data[0]
              response.msg = 'VALID'
            } else {
              response.error = true
              response.msg = 'FAILED'
            }
            callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    }

    this.getAppliedJobs = async (data, callback) => {
      var response = {}
      try {
          
            console.log(data)
            var appsliderInsertData = await adminAuthRepository.getEmployeejobs(data.companyId)
            console.log("fff",appsliderInsertData)
            // for(var i =0;i<appsliderInsertData.data;i++)
            // {
            //   var x= providerList.result.length
            //   var newList = providerList.result.map(e => e.providerId);
            //   var newList1 =newList.toString();
            // }
            if (appsliderInsertData.error === false) {
              response.error = false
              response.data = appsliderInsertData.data
              response.msg = 'VALID'
            } else {
              response.error = true
              response.msg = 'FAILED'
            }
            callback(response)
      } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
      }
    }
  }
  