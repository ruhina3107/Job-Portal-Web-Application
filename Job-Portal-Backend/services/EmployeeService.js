module.exports = function () {
    const AdminAuthRepository = require('../repository/EmployeeRepository')
    const Common = require('../Utils/common')
    require('dotenv').config()
  
    var adminAuthRepository = new AdminAuthRepository();
    var common = new Common();
  
    this.adminVerifyPwd = async (data, callback) => {
      var response = {}
      try {
        var admin = {}
        admin.username = data.username
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
           
            adminList.username = adminDetails.username
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

    this.getAllJobs = async (data, callback) => {
      var response = {}
      try {
          var getUserAppliedJobs = await adminAuthRepository.appliedjobs(data)
          console.log("applied jobs",getUserAppliedJobs)
          if(getUserAppliedJobs.error == false)
          {
            var x= getUserAppliedJobs.data.length
            var newList = getUserAppliedJobs.data.map(e => e.jobId);
            var newLIst1 = parseInt(newList)
            console.log(newLIst1)
          
            var appsliderInsertData = await adminAuthRepository.alljobs(newList)
          
            if (appsliderInsertData.error === false) {
              response.error = false
              response.data = appsliderInsertData.data
              response.msg = 'VALID'
            } else {
              response.error = true
              response.msg = 'FAILED'
            }
          }
          else{
            var appsliderInsertData = await adminAuthRepository.getalljobs(newList)
          
            if (appsliderInsertData.error === false) {
              response.error = false
              response.data = appsliderInsertData.data
              response.msg = 'VALID'
            } else {
              response.error = true
              response.msg = 'FAILED'
            }
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
            var appsliderInsertData = await adminAuthRepository.appliedjobs(data)
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

    this.updatejobstatus = async (data, callback) => {
      var response = {}
      try {

            console.log("request",data)
            var getapplieduser = await adminAuthRepository.getAppliedUsers(data.jobId)
            //console.log(getapplieduser)
            if(getapplieduser.data[0].userId == data.userId)
            {
              response.error = true
              response.msg = 'Already applied'
            }
          //   //console.log("user",getapplieduser.data)
          //   var x= getapplieduser.data.length
          //       var newList = getapplieduser.data.map(e => e.userId);
          //       newList.push(data.userId)
          //       console.log(newList)
          //       data.userId = newList
          // //  var updateJobseekrs = await adminAuthRepository.adduserId(data)
            var appsliderInsertData = await adminAuthRepository.updatejobs(data)
            console.log(appsliderInsertData)
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


    this.addemployee = async (data, callback) => {
      var response = {}
      try {
          
            var appsliderInsertData = await adminAuthRepository.employeeRegister(data)
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

    this.providerFileUploadService = async (data, callback) => {
      var response = {}
      try {
          var dir = 'provider'
          var file = await common.fileUpload(data, dir)
          if (file.error) {
              response.error = true
              response.msg = 'UPDATE_ERROR: $[1],file'
          } else {
              response.error = false
              response.msg = 'VALID'
              response.data = { imageUrl: file.msg }
          }
          callback(response)
      } catch (err) {
          err.error = true
          err.msg = 'OOPS'
          callback(err)
      }
  }

  
  this.getProfile= async (data, callback) => {
    var response = {}
    try {
      var admin = {}
       admin.Id = parseInt(data.Id)
       
        var profileDetails = await adminAuthRepository.fetchadminDetails(admin)
        console.log(profileDetails)
        if (profileDetails.error) {
            response.error = true
            response.msg = 'UPDATE_ERROR: $[1],file'
        } else {
            response.error = false
            response.msg = 'VALID'
            response.data = profileDetails.data[0]
        }
        callback(response)
    } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
    }
  }

  this.updateProfile = async (data, userId,callback) => {
    var response = {}
    try {

          console.log("request",data)
          var appsliderInsertData = await adminAuthRepository.updateEmployeeProfile(data,userId)
          console.log(appsliderInsertData)
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

  this.search= async (data, callback) => {
    var response = {}
    try {
      console.log(data)
        var profileDetails = await adminAuthRepository.searchData(data)
        console.log(profileDetails)
        if (profileDetails.error) {
            response.error = true
            response.msg = 'UPDATE_ERROR: $[1],file'
        } else {
            response.error = false
            response.msg = 'VALID'
            response.data = profileDetails.data
        }
        callback(response)
    } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
    }
  }
  }
  