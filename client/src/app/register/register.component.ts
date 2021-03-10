import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public router: Router
  ) {
    this.registerForm= this.formBuilder.group({
      name: [''],
      username: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  registerUser() {
    this.apiService.RegisterUser(this.registerForm.value).subscribe((res) => {
      this.router.navigate(['login'])
    })
  }
}
