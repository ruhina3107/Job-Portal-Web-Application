import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ForrecruiterService } from '../../forrecruiter.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rprofile',
  templateUrl: './rprofile.component.html',
  styleUrls: ['./rprofile.component.css']
})
export class RprofileComponent implements OnInit {

  postjobForm: FormGroup;
  postedMsg:any;
  alreadyposted:any;
  errormsg:any;
  companyname:any;
  companyId:any;
  paramsid: any;
  jobs: Object;
  jobId: any;
  constructor(private router: Router, private route: ActivatedRoute,private recservice: ForrecruiterService, private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.paramsid = params.Id;})
      console.log(this.paramsid)
   this.getjobs(this.paramsid)

    this.companyname=localStorage.getItem('companyName')
    this.companyId=localStorage.getItem('rId')
    console.log(this.companyId)

    this.postjobForm = this.fb.group({
      companyId: new FormControl(this.companyId),
      companyName:new FormControl(this.companyname),
      jobRole: ['', Validators.required],
      expRequired: ['', Validators.required],
      skills: ['', Validators.required],
      educationalQualifications: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobType: ['', Validators.required]
    })
  }

  getjobs(paramsid)
  {
    this.recservice.EditJob(paramsid).subscribe((response:any)=>{
      console.log(response)
      this.jobs = response.data
      this.jobId = response.data[0].jobId
      this.postjobForm.patchValue({
        companyId: this.jobs[0].companyId,
        companyName:this.jobs[0].companyName,
        jobRole: this.jobs[0].jobRole,
        expRequired: this.jobs[0].expRequired,
        skills: this.jobs[0].skills,
        educationalQualifications: this.jobs[0].jobRole,
        jobDescription: this.jobs[0].jobDescription,
        jobType: this.jobs[0].jobType
       })
    })
    
    
    
  }
  logoutRecruiter() {
    this.recservice.logout();
    this.router.navigate(['login/rec_login'])
  }
  postajob() {
    console.log(this.postjobForm.value);
    this.recservice.EditjobDetails(JSON.stringify(this.postjobForm.value),this.jobId).subscribe(
      (response:any)=>{
        if(response.status && response.status==1)
        {
          this.postedMsg=response.message;
          setTimeout(()=>{
            this.postedMsg='';
            this.router.navigate(['rdashboard/postedjobs']);
          },2000);
        }else{
          this.alreadyposted=response.message;
          setTimeout(()=>{
            this.alreadyposted='';
          },2000);
        }
      },(error)=>{
        this.errormsg="Internal Server Error";
      }
    )
  }


}
function res(res: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}

