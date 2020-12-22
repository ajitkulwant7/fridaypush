import { Component, OnInit, EventEmitter } from '@angular/core';
import {Location} from '@angular/common';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  
  constructor(private _location: Location) { }

  ngOnInit(): void {
  }
  backToHome() {
    this._location.back();
    setTimeout(() => window.location.reload(), 500);
  }


}
