import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  genders = ['male', 'female'];

  singupForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.singupForm = new FormGroup({
      'username': new FormControl('Default Username'),
      'email': new FormControl(null),
      'gender': new FormControl('male')
    });
  }

  onSubmit() {
    console.log(this.singupForm);
  }
}
