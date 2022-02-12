import { Component, OnInit } from '@angular/core';
import { ForseekerService } from '../../forseeker.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-emp-profile',
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.css']
})
export class EmpProfileComponent implements OnInit {
  @ViewChild('img') img: ElementRef;
  profileinfo: any;
  EmpProfileForm: FormGroup;
  profilepic: any;
  picexists: boolean = false;
  successmsg: any;
  filename: any;
  imagefile: any;
  constructor(private seekerservice: ForseekerService, private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.getprofile();

  }
  getprofile() {
    this.seekerservice.getprofile().subscribe(
      (response: any) => {
        this.profileinfo = response.data;
        //console.log(JSON.stringify(response.profileimage));
        let image:any = response.data.profileimage;
        //console.log(image);
        if (image != "") {
          this.picexists = true;
        }
        else {
          this.picexists = false;
        }

      }, (error) => {
        console.log("Server Error");
      }
    )
  }
  logout() {
    this.seekerservice.logout();
    this.router.navigate(['login/emp_login']);
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
        this.successmsg = res
      }
      setTimeout(() => {
        this.successmsg = '';
        this.getprofile();
      }, 2000);

      // setTimeout(()=>{
      //   this.router.navigate(['/seeker/eprofile'])
      // },1000);
      this.router.navigate(['seeker/eprofile']);
    }, (error) => {
      if (error) {
        console.log(error);
      }
    })
  }

}
