import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { passwordValidator } from './shared/password.validator';
//import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'AngularReactiveFormTutorial';
  registrationForm: FormGroup;
  get userName(){
    return this.registrationForm.get('userName');
  }
  get email(){
    return this.registrationForm.get('email');
  }
  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }
  addAlternateEmails(){
    this.alternateEmails.push(this.formB.control(''));
  }

  constructor(private formB: FormBuilder){}

  ngOnInit(){
    this.registrationForm=this.formB.group({
      userName: ['Sayed', [Validators.required,Validators.minLength(3),forbiddenNameValidator(/password/)]],
      password: ['test'],
      confirmPassword: ['test'],
      email:[''],
      subscribe: [false],
      address: this.formB.group({
        city: [''],
        state: ['']
      }),
      alternateEmails: this.formB.array([])
    },{validator: passwordValidator});
    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
        const email=this.registrationForm.get('email');
        if(checkedValue){
          email.setValidators(Validators.required);
        }else{
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }

  
  // registrationForm=new FormGroup({
  //   userName:new FormControl('Sayed'),
  //   password:new FormControl(''),
  //   confirmPassword:new FormControl(''),
  //   address:new FormGroup({
  //     city:new FormControl(''),
  //     state:new FormControl(''),
  //   })
  // });

  loadSetData(){
    this.registrationForm.setValue({
      userName: 'Sayed Al Zawad',
      password: 'test',
      confirmPassword: 'test',
      email:'',
      subscribe: false,
      address: {
        city:'Dhaka',
        state:'Mohammadpur'
      }
    })
  }

  loadPatchData(){
    this.registrationForm.patchValue({
      userName: 'Sayed Al Zawad',
      password: 'test',
      confirmPassword: 'test',
      email:'',
      subscribe: false,
      address: {
        city:'Dhaka',
        state:'Mohammadpur'
      }
    })
  }

  onSubmit(){
    console.log(this.registrationForm.value);
  }
}
