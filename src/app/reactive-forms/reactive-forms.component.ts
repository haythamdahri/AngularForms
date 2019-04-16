import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsername: string[] = ['anna', 'chris', 'taggo'];

  constructor() {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        /*this.forbiddenNames.bind(this) => We use bind to tell ANGULAR that 'this' keyword refers
        to the attribute class and not the formControl itself*/
        username: new FormControl('Default Username', [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      gender: new FormControl('male', Validators.required),
      hobbies: new FormArray([])
    });
    // valueChanges returns an Observables which contains singupForm values
    this.signupForm.valueChanges.subscribe(
      value => {
        console.log(value);
      }
    );
    // statusChanges returns an Observable which contains the status of singupForm if it is VALID or INVALID
    this.signupForm.statusChanges.subscribe(
      status => {
        console.log(status);
      }
    );
    /*to initialize the form data, we use either setValue()
    to set all fields values or just some fields using patchValue()*/
    /*this.signupForm.setValue({
      userData: {
        username: 'haytham',
        email: 'haytham.dahri@gmail.com'
      },
      gender: 'male',
      hobbies: []
    });*/
    this.signupForm.patchValue({
      userData: {
        username: 'haytham'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddedHobby() {
    // set the type of hobbies as FormArray explicitly
    const control = new FormControl(null, Validators.required);
    (<FormArray> this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsername.indexOf(control.value.toString().toLowerCase()) !== -1) {
      return {usernameIsForbidden: true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'haytham.dahri@gmail.com') {
          resolve({emailIsForbidden: true});
        } else {
          return resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
