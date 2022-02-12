import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ForrecruiterService {
url ="http://localhost:3000/"
id :any = localStorage.getItem('rId')
  data: any;
constructor(private httpCli:HttpClient) { }
  login(body:any){
    return this.httpCli.post(`${this.url}recruiter/login`,body
    ,{
      observe:'body',
    //  withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }
  recruiter_register(body:any){
    return this.httpCli.post(`${this.url}addrecruiter`,body,
    {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }
//   getjobs()
//   {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Accept': 'application/json, text/plain, */*',
//          'Content-Type':'application/json',
//         'Authorization': 'Bearer '+this.gettoken()
//       })
//     };
//     console.log(httpOptions);
//     return this.httpCli.get(`${PRIVATE}employees/getjobs/${this.getpayload().id}`,httpOptions);
//   }
//    applyjob(jobs:any)
//   {
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type':'application/json',
//         'Authorization': 'Bearer'+' '+this.gettoken()
//       })
//     };
//     let job_id:any=jobs.jobDetails._id;
//     let emp_id:any=this.getpayload().id;
//     return this.httpCli.get(`${PRIVATE}employees/apply/${emp_id}/${job_id}`,httpOptions);
//   }
  getpostedjobs()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.gettoken()
      })
    };
    return this.httpCli.get(`${this.url}recruiters/jobs/${this.id}`,httpOptions);
  }
  getseekers()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': this.gettoken()
      })
    };

    return this.httpCli.get(`${this.url}recruiters/seekers/${this.id}`,httpOptions);
  }

  savepayload(data:any)
  {
    this.data = data;
  }
  getpayloaddata()
  {
    console.log("paylod")
    return this.data
  }
gettoken()
{
  //console.log(localStorage.getItem('log'))
  return localStorage.getItem('token');
}
postjob(body:any)
{
  console.log(body)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.gettoken()
    })
  };
  return this.httpCli.post(`${this.url}recruiters/addjob`,body,httpOptions);
}

EditjobDetails(body:any,jobId)
{
  console.log(body)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.gettoken()
    })
  };
  console.log(jobId)
  return this.httpCli.post(`${this.url}recruiters/EditjobDetails/${jobId}`,body,httpOptions);
}

deleteJob(body)
{
  console.log(body)
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.gettoken()
    })
  };
  return this.httpCli.post(`${this.url}recruiters/deleteJob`,body,httpOptions);
}

EditJob(jobId)
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': this.gettoken()
    })
  };

  return this.httpCli.get(`${this.url}recruiters/EditJob/${jobId}`,httpOptions);
}
getpayload()
{
  let token:any=this.gettoken();
  console.log(token.companyName)
  return token;
}
// getprofile()
// {
//   const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':'application/json',
//       'Authorization': `Bearer${this.gettoken()}`
//     })
//   };
//   return this.httpCli.get(`${PRIVATE}employees/profile/${this.getpayload().id}`,httpOptions);
// }
logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('currentrecruiter');
  // localStorage.removeItem('currentemployeeid')
}


}


