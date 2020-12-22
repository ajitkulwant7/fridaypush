import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var VanillaTilt;
@Component({
  selector: 'app-herosection',
  templateUrl: './herosection.component.html',
  styleUrls: ['./herosection.component.scss'],
})
export class HerosectionComponent implements OnInit {
  @Output() myevent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    VanillaTilt.init(document.querySelectorAll('.card'), {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 1,
    });
  }

  scrollToComponent(str: string) {
    console.log(str);
    this.myevent.emit(str);
  }
}
