import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";

import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public apiService: ApiService,
    public router: Router
  ) {
    this.loginForm= this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  ngOnInit() { }

  loginUser() {
    this.apiService.LoginUser(this.loginForm.value)
  }
}
