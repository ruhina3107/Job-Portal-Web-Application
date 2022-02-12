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
    const recruiter = 'Recruiter'
    const addJob = 'AddJob'
    const applyJob = 'ApplyJob'
    this.fetchadminDetails = (adminData) => {
      var output = {}
      console.log(adminData)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(recruiter)
          .select('*')
          .where(adminData)
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

    this.recRegister = (data) => {
      var output = {}
      console.log("ddd",data)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(recruiter)
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

    this.jobAdd = (data) => {
        var output = {}
        console.log("ddd",data)
        return new Promise(function (resolve) {
          var knex = new Knex(config)
          knex(addJob)
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

      this.getjobs = (id) => {
        var output = {}
        return new Promise(function (resolve) {
          var knex = new Knex(config)
          knex(addJob).select('*')
            .where('companyId', id)
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
        console.log(data)
        return new Promise(function (resolve) {
          var knex = new Knex(config)
          knex(applyJob).select('*')
          .where(data)
          //.join(`${seeker}`, `${applyJob}.userId`, `${seeker}.Id`)
          // .where(`${applyJob}.companyId`,data.companyId)
          // .where('companyId',data.companyId)
         //  .where('status','applied')
            .then((result) => {
              if (result) {
                output.error = false
                output.data = result
              } else {
                output.error = true
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

      this.getEmployeejobs = (id) => {
        var output = {}
        console.log(id)
        return new Promise(function (resolve) {
          var knex = new Knex(config)
          knex(applyJob).select('*')
            .join(`${seeker}`, `${applyJob}.userId`, `${seeker}.Id`)
            .where('companyId', id)
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
  