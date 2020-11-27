import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgModel, NgForm, FormGroup, FormControl, Validators  } from '@angular/forms';
   
export class User{
    name: string;
    surname: string;
    email: string;
    date: string;
    info: string;
}

@Component({
    selector: 'app1',
    template: `
    <form [formGroup]="myForm" (ngSubmit)="submit()">
        <div class="form-group">
            <label>Ім'я:</label>
            <input class="form-control" type="text" name="name" formControlName="name" [(ngModel)]="user.name"/>
            <div class="alert alert-danger"
                *ngIf="myForm.controls['name'].invalid && myForm.controls['name'].touched">
                Вкажіть ім'я
            </div>
        </div>

        <div class="form-group">
            <label>Прізвище:</label>
            <input class="form-control" type="text" name="surname" formControlName="surname" [(ngModel)]="user.surname"/>
            <div class="alert alert-danger"
                *ngIf="myForm.controls['surname'].invalid && myForm.controls['surname'].touched">
                Вкажіть прізвище
            </div>
        </div>

        <div class="form-group">
            <label>Дата народження:</label>
            <input class="form-control" type="text" name="date" formControlName="date" [(ngModel)]="user.date"/>
            <div class="alert alert-danger"
                *ngIf="myForm.controls['date'].invalid && myForm.controls['date'].touched">
                Вкажіть вік
            </div>
        </div>

        <div class="form-group">
            <label>email:</label>
            <input class="form-control" type="text" name="email" formControlName="email" [(ngModel)]="user.email"/>
            <div class="alert alert-danger"
                *ngIf="myForm.controls['email'].invalid && myForm.controls['email'].touched">
                Вкажіть email
            </div>
        </div>

        <div class="form-group">
            <label>Про себе:</label>
            <input class="form-control" type="text" name="info" formControlName="info" [(ngModel)]="user.info"/>
            <div class="alert alert-danger"
                *ngIf="myForm.controls['info'].invalid && myForm.controls['info'].touched">
                Вкажіть вік
            </div>
        </div>

        <input type="submit" class="btn btn-default" 
        [disabled]="myForm.invalid" value="Add user"/>
    </form>
    `,
    styles: [`
    .form-control.ng-touched.ng-valid{ border: 2px solid green;}
    .form-control.ng-touched.ng-invalid{ border: 2px solid red;}

    form{
        padding: 20px;
        width: 400px;
    }
    `]
})

export class AppComponent { 
    user = new User(); 
    myForm: FormGroup;

    constructor(){
        this.myForm = new FormGroup({
            'name': new FormControl("", [Validators.required, Validators.pattern("^[A-Z][a-z]*'?[a-z]+((-| )[A-Z]+'?[a-z]+){0,2}$")]),
            'surname': new FormControl("", [Validators.required, Validators.pattern("^[A-Z][a-z]*'?[a-z]+((-| )[A-Z]+'?[a-z]+){0,2}$")]),
            'email': new FormControl("", [Validators.required, Validators.pattern("^([A-Za-z])([A-Za-z._0-9]*)([A-Za-z0-9])(@)([a-z0-9\\-]+\\.){1,6}([a-z]{2,8})$")]),
            'info': new FormControl("", [Validators.required, Validators.pattern("^\.{3,500}$")]),
            'date': new FormControl("", [Validators.required, this.dateValidator])
        })
    }

    submit(){
        console.log(this.user);
        console.log(this.myForm);
    }

    dateValidator(control: FormControl): {[s:string]:boolean}{
        let date = control.value.trim();
        let regexp = new RegExp("^([1-9]{1}|[0-2][0-9]{1}|[3][0-1]{1})[./-]([1-9]{1}|[0][1-9]{1}|[1][0-2]{1})[./-]([1][9][0-9]{2}|([2][0][0-1]{1}[0-9]{1})|([2][0][2][0])|[0-9]{2})$")
        let res = {'date': true};
        if(!date.match(regexp)) return res;

        else{
            let dateValues = date.split(/-|\./);
            for(let i = 0; i < dateValues.length; i++){
                dateValues[i] = Number(dateValues[i])
            }

            if([2,4,6,9,11].includes(dateValues[1]) && dateValues[0] == 31) return res;
            else if(dateValues[2] % 4 == 0 && dateValues[1] == 2 && dateValues[0] == 29) return null;
            else if(dateValues[1] == 2 && dateValues[0] > 28) return res;
            else return null;
        } 
       
    }
}