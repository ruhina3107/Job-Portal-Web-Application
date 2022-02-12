import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-empregister',
  templateUrl: './empregister.component.html',
  styleUrls: ['./empregister.component.css']
})
export class EmpregisterComponent implements OnInit {
  profilepic: any;
  successmsg: Object;

  constructor(private router:Router,private fb:FormBuilder,private seekerservice:ForseekerService) { }
  EmpRegisterForm:FormGroup;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  ngOnInit() {
    this.EmpRegisterForm=this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),Validators.minLength(8)])],
      mail:['',Validators.compose([Validators.required,Validators.email])],
      gender: ['',Validators.required],
      mobile: ['',Validators.required],
      // hometown: [''],
      // interests: [''],
      experience: [''],
      // maritalStatus: ['',Validators.required],
      // nationality: [''],
      // languages: [''],
      currentLocation: [''],
      lastjobexp: ['',Validators.required],
      lastjobDesig: ['',Validators.required],
      department: [''],
      // reasonsforleaving: ['']
      });
  }
  registeremployee()
  {
    //console.log(this.EmpRegisterForm.value);
    this.seekerservice.employee_register(JSON.stringify(this.EmpRegisterForm.value)).subscribe(
      (response:any)=>{
        if(response.status===1){
          this.registrationsuccess='Congratulations your now a job seeker';
          this.EmpRegisterForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login/emp_login']);
            }, 3000);
        }else{
          this.regisfail='You are already a job seeker';
          console.log(this.regisfail);
        }
      },
      (error)=>{
          this.regisserver='Internal server error'; 
      }

    );
  }

  selectimage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilepic = file;
    }

    
  }
  upload() {
    const formData = new FormData();
    formData.append('file', this.profilepic)
    // const formdata = new FormData();
    // formdata.append('profileimage', this.profilepic);
    this.seekerservice.fileupload(formData).subscribe((res) => {
      console.log(res)
      if (res) {
        this.registrationsuccess='File Uploaded Successfully';
      }
      // setTimeout(() => {
      //   this.successmsg = '';
      //   this.getprofile();
      // }, 2000);

      // // setTimeout(()=>{
      // //   this.router.navigate(['/seeker/eprofile'])
      // // },1000);
      // this.router.navigate(['/login/emp_login']);
    }, (error) => {
      if (error) {
        console.log(error);
      }
    })
  }
  getprofile() {
    throw new Error('Method not implemented.');
  }


}
