import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../user.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  // Local reference to the input with => #username
  @ViewChild('username') username: ElementRef;
  // Local reference to the input with => #email
  @ViewChild('email') email: ElementRef;
  // Local reference to the input with => #secretQuestion
  @ViewChild('secretQuestion') secretQuestion: ElementRef;

  // Local reference to the input with => #userForm
  @ViewChild('userForm') userForm: NgForm;
  // User model for data storage
  user: UserModel;
  // Genders choices
  genders: string[] = ['Male', 'Female'];
  // submitted variable to check if the form is submitted or not
  submitted: boolean = false;

  constructor() {
    this.user = new UserModel(
      '',
      '',
      '',
      '',
      '');
  }


  ngOnInit() {
  }
  suggestUsername() {
    const suggestedUsername = 'Superuser';
    // Using setValue() method push us to override all fields of the form
    /* this.userForm.setValue({
       userData: {
         username: suggestedUsername,
         email: 'superuser@mail.ru'
       },
       secret: 'pet',
       questionAnswer: 'Great!',
       gender: 'Male'
     });*/
    // The above method seems to be uncomfortable for everyone. Solution is patchValue
    // The patchValue does not force us to update all field. Instead, we can update as much fields as we want or need
    this.userForm.form.patchValue({
        userData: {
          username: suggestedUsername
        }
      }
    );
  }

  /*ngForm is used because it is added to the localReference
  of the form as a default value to handle the submitted value as an ANGULAR form*/
  onSubmit() {
    /* console.log('Username: ' + this.username.nativeElement.textContent);
     console.log('Email: ' + this.email.nativeElement.textContent);
     console.log('Secret Question: ' + this.secretQuestion.nativeElement.textContent);
     console.log('-------------------------------------------');*/
    console.log(this.userForm);
    console.log('Username from ngModelGroup: ' + this.userForm.value.userData.username);
    this.user.username = this.userForm.value.userData.username;
    this.user.email = this.userForm.value.userData.email;
    this.user.secretQuestion = this.userForm.value.secret;
    this.user.questionAnswer = this.userForm.value.questionAnswer;
    this.user.gender = this.userForm.value.gender;
    this.submitted = true;
    /*The advantages of using reset() method from userForm object that the default classes will be
    reset too to the Default values from ANGULAR such as ng-valid, ng-untouched .... */
    setTimeout(
      () => {
        this.userForm.reset();
      }, 5);
  }

}
