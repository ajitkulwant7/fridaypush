import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/test/http.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  Name= "";

  users: any[] = [];



  constructor(private userServ: HttpService) {
    this.userServ.getUsers().subscribe((result) => {
      this.users = result;
    });
  }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  addUser() {
    this.userServ.postUsers().subscribe(() => {
      console.log('added successfully');
    });
  }
}
