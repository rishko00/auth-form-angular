import { Injectable } from '@angular/core';

@Injectable()
export class DataService{
    private data: string[] = ['Apple', 'Samsung', 'Xiaomi'];

    addItem(item: string){
        this.data.push(item);
    }

    getData(){
        return this.data;
    }
}