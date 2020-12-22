import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidenav',
  templateUrl: './user-sidenav.component.html',
  styleUrls: ['./user-sidenav.component.scss'],
})
export class UserSidenavComponent implements OnInit {
  public isMenuOpen: boolean = false;
  username:string = sessionStorage.getItem("username");
  constructor(private _location: Location, private router: Router) {}
  ngOnInit(): void {}
  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  backToHome() {
    // this._location.back();
    // setTimeout(() => window.location.reload(), 100);
    // window.location.reload();
    this.router.navigateByUrl('');
    setTimeout(() => window.location.reload(), 100);
  }
}
