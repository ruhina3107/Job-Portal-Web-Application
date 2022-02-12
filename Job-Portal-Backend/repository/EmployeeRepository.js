module.exports = function () {
    require('dotenv').config()
    const config = {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      },
      pool: {
        min: Number(process.env.DB_POOL_MIN),
        max: Number(process.env.DB_POOL_MAX)
      },
      acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
    }
    var Knex = require('knex')
    
    const seeker = 'Seeker'
    const addJob = 'AddJob'
    const applyJob = 'ApplyJob'

    this.fetchadminDetails = (adminData) => {
      var output = {}
      console.log(adminData)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(seeker)
          .select('*')
          .where(adminData)
          .then((result) => {
            if (result) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }
    this.adminVerifyJwtToken = (admindata) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(admindata.role)
          .select('*')
          .where(admindata.where)
          .then((result) => {
            if (result.length === 1) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.alljobs = (data) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(addJob).select('*')
        // .join(`${applyJob}`, `${addJob}.jobId`, `${applyJob}.jobId`)
        // .whereNot(`${applyJob}.userId`,'=', data)
        .whereNotIn('jobId',data)
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.getalljobs = () => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(addJob).select('*')
        // .join(`${applyJob}`, `${addJob}.jobId`, `${applyJob}.jobId`)
        // .whereNot(`${applyJob}.userId`,'=', data)
       // .whereNotIn('jobId',data)
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.appliedjobs = (data) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(applyJob).select('*')
         .where('userId',data.userId)
         .where('status','applied')
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }


    this.getAppliedUsers = (data) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(addJob).select('*')
         .where('jobId',data)
         
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.updatejobs = (data) => {
      var output = {}
      console.log(data)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(applyJob).select('*')
         .where('jobId',data.jobId)
         .insert(data)
          .then((result) => {
            if (result) {
              output.error = false
              output.data = result
            } else {
              output.error = true
              output.data = result
            }
            console.log(output)
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.updateEmployeeProfile = (data,userId) => {
      var output = {}
      console.log(data)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(seeker).select('*')
         .where('Id',userId)
         .update(data)
          .then((result) => {
            if (result) {
              output.error = false
              output.data = result
            } else {
              output.error = true
              output.data = result
            }
            console.log(output)
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }
    this.adduserId = (data) => {
      var output = {}
      console.log("ddd",data.userId)
      console.log(typeof(data.userId))
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(addJob).select('*')
          .update('userId',data)
          .then((result) => {
            if (result) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.employeeRegister = (data) => {
      var output = {}
      console.log("ddd",data)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(seeker)
          .insert(data)
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.searchData = (data) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(addJob).select('*')
        // .join(`${applyJob}`, `${addJob}.jobId`, `${applyJob}.jobId`)
        // .whereNot(`${applyJob}.userId`,'=', data)
        .where(data)
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    
  }
  