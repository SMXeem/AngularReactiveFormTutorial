import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularReactiveFormTutorial';
  registrationForm=new FormGroup({
    userName:new FormControl('Sayed'),
    password:new FormControl(''),
    confirmPassword:new FormControl(''),
    address:new FormGroup({
      city:new FormControl(''),
      state:new FormControl(''),
    })
  });

  loadSetData(){
    this.registrationForm.setValue({
      userName: 'Sayed Al Zawad',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city:'Dhaka',
        state:'Mohammadpur'
      }
    })
  }

  loadPatchData(){
    this.registrationForm.patchValue({
      userName: 'Al Zawad',
      password: 'test',
      confirmPassword: 'test',
    })
  }
}
