import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPageComponent } from './auth-page.component';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ElementRef } from '@angular/core';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule,],
      providers: [
        FormBuilder
      ],
      declarations: [ AuthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Debe de asegurarse cuando hallan datos erroneos
  it('Return inavalid form', () => {
    const  mockCredentials ={
      email:"10101010001",
      password:"0001010101001001010"
    }
    const emailForm:any = component.formLogin.get('email')
    const PassForm:any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    PassForm.setValue(mockCredentials.password)
    expect(component.formLogin.invalid).toEqual(true);
  });


  it('Return valid form', () => {
    const  mockCredentials ={
      email:"darguinbarbosa22@gmail.com",
      password:"1234567"
    }
    const emailForm:any = component.formLogin.get('email')
    const PassForm:any = component.formLogin.get('password')

    emailForm.setValue(mockCredentials.email)
    PassForm.setValue(mockCredentials.password)
    expect(component.formLogin.invalid).toEqual(false);
  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Button is start Session',()=>{
    const element = fixture.debugElement.query(By.css('.form-action Button'))
    const getInnerTxt = element.nativeElement.innerText
    expect(getInnerTxt).toEqual('Iniciar sesión')
  })
});
