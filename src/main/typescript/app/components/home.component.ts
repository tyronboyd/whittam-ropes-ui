import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: 'views/home.html'
})

export class HomeComponent {
    barcode: string;

    constructor() { }

 ngOnInit() { }

 onKey() {
   console.log(event);
    // this.barcode = event.target.value;
 }


}
