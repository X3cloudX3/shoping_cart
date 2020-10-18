import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-sign-up-part-two',
  templateUrl: './sign-up-part-two.component.html',
  styleUrls: ['./sign-up-part-two.component.css', '../sign-up-part-one/sign-up.component.css']
})
export class SignUpPartTwoComponent implements OnInit {
  public registerStepTwo
  public errors
  public nextButtonError: Boolean
  public successMessage: String
  @Output() handlePages = new EventEmitter()
  @Output() registerSuccessfully = new EventEmitter()
  constructor(public router: Router, public fb: FormBuilder, public userService: UserService) {
    this.errors = {
      firstNameError: "",
      lastNameError: "",
      cityError: "",
      streetError: ""
    }
    this.successMessage = ""
    this.nextButtonError = true
    this.registerStepTwo = this.fb.group({
      firstName: "",
      lastName: "",
      city: "",
      street: ""
    })
  }

  ngOnInit() {
    if (!this.userService.getUserId()) return this.handlePages.emit()
    this.registerStepTwo.valueChanges.subscribe((registerStepTwoDetails) => {
      this.userService.saveUserPartTwoDetails(registerStepTwoDetails);
      const { firstName, lastName, city, street } = this.registerStepTwo.value
      if (!firstName || !lastName || !city || !street) return this.nextButtonError = true
      return this.nextButtonError = false
    })
  } 
  signUp() {
    this.userService.signUp().subscribe((res) => {
      this.successMessage = res.message
      setTimeout(() => {
        this.registerSuccessfully.emit()
      }, 1000);
    })

  }
  moveBack() {
    this.handlePages.emit()
  }
}
