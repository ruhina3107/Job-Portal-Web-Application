import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ForseekerService {
  token :any = {};
  id :any = localStorage.getItem('sId')
  username:any = localStorage.getItem('username')
  url = 'http://localhost:3000/'
  constructor(private httpCli:HttpClient) { }
  
  login(body:any){
    return this.httpCli.post(`${this.url}employee/login`,body
    ,{
      observe:'body',
      //withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }
  employee_register(body:any){
    return this.httpCli.post(`${this.url}addemployee`,body,
    {
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    }
    );
  }
  getjobs()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    console.log(httpOptions);
    console.log(this.id)
    return this.httpCli.get(`${this.url}employees/getjobs/${this.id}`,httpOptions);
  }
  searchbycompany(companyname)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    console.log(companyname)
    return this.httpCli.get(`${this.url}employees/companyname/${companyname}`,httpOptions);
  }
  searchbyrole(jobrole:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    return this.httpCli.get(`${this.url}employees/jobrole/${jobrole}`,httpOptions);
  }
  searchlatestjobs()
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json, text/plain, */*',
         'Content-Type':'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      })
    };
    return this.httpCli.get(`${this.url}employees/latest`,httpOptions);
  }
   applyjob(jobs:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer'+' '+this.gettoken()
      })
    };
    let job_id:any=jobs.jobId;
    let emp_id:any=localStorage.getItem('sId')
    return this.httpCli.post(`${this.url}employees/apply/${emp_id}/${job_id}`,jobs,httpOptions);
  }
  getappliedjobs()
  {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Bearer'+' '+ this.gettoken()
      })
    };
    console.log(this.id)
    return this.httpCli.get(`${this.url}employees/appliedlist/${this.id}`,httpOptions);
  }

  fileupload(data)
  {
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer'+' '+this.gettoken()
      })
    };
   console.log(data)
   // return this.httpCli.post(`${this.url}employee/uploadresume/${this.id}`,data,httpOptions);
   return this.httpCli.post(`${this.url}file`,data);
   
  }
gettoken()
{
  return localStorage.getItem('token');
}
getpayload()
{
  // this.token = this.gettoken();
  // //let token:any=this.gettoken();
  // this.token.id = 1
  // // console.log(JSON.parse(token))
  // // console.log(JSON.parse(window.atob(token.split('.')[1])))
  // return this.token
  let token=this.gettoken();
  return JSON.parse(window.atob(token.split('.')[1])); 
}
Empupdateprofile(body:any)
{
  console.log(body)
  return this.httpCli.put(`${this.url}employees/editprofile/${this.id}`,body,
  {
    
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    
  });
}
getprofile()
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization': `Bearer${this.gettoken()}`
    })
  };
  return this.httpCli.get(`${this.url}employees/profile/${this.id}`,httpOptions);
}
logout()
{
  localStorage.removeItem('token');
  localStorage.removeItem('currentemployee');
  localStorage.removeItem('currentemployeeid')
  localStorage.removeItem('sId')
  localStorage.removeItem('username')
}
}
