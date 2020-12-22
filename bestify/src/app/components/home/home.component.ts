import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLogin:
  boolean = sessionStorage.getItem('user') ? true : false;
  scrollTo: any = '';
  gamestarted: boolean = false;
  quizpage: boolean = false;
  @Input() contactUs: boolean;
  constructor(private myElement: ElementRef) {}

  ngOnInit(): void {}

  updateScroll(e: any) {
    this.scrollTo = e;
    // var parser = new DOMParser();
    // var doc = parser.parseFromString(this.scrollTo, 'text/html');
    //  doc.body;
    // this.scroll(doc.body);
    // var x : HTMLElement;
    // x = this.scrollTo as HTMLElement;
    // this.scroll(x);
    this.gotoComponent(this.scrollTo);
    console.log(this.scrollTo);
  }
  gotoComponent(id: string) {
    console.log(id);

    let el = this.myElement.nativeElement.querySelector('#' + id);
    el.scrollIntoView({ behavior: 'smooth' });
  }

  gamestatus(e: any) {
    this.gamestarted = e;
    console.log(this.gamestarted);
  }

  hideComponent(event) {
    this.quizpage = event;
  }
}
