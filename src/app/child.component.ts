import { OnInit, Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
    selector: 'child',
    template: `
    <input [(ngModel)]="item"/>
    <button (click)="add()">Add</button>
    <table>
            <tr *ngFor="let i of items">
                <td>{{i}}</td>
            </tr>
        </table>`
})

export class ChildComponent{
    item: string;
    items: string[];

    constructor(private data: DataService){}

    add(){
        this.data.addItem(this.item);
    }

    ngOnInit(){
        this.items = this.data.getData();
    }
}