import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpService } from 'src/app/test/http.service';
import { MatTableDataSource } from '@angular/material/table';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-user-favourite',
  templateUrl: './user-favourite.component.html',
  styleUrls: ['./user-favourite.component.scss']
})
export class UserFavouriteComponent implements OnInit, AfterViewInit {
  // this.favourite = new MatTableDataSource(this.favourite);
  displayedColumns: string[] = ['quizid', 'acion'];
  dataSource;


  displayedColumnTwo: string[] = ['Quizname', 'Category', 'Add','Remove'];
  //user id passed externally
  param:number = JSON.parse(sessionStorage.getItem("userid"));
  // param=1;
  allQuiz: any;
  favourite: any;
  flag: boolean;
  quizId: any;

  constructor(private userServ: HttpService) {}
  ngAfterViewInit(): void {}

  public removeFavourite = async (id: number) => {
    console.log(id);
    await this.userServ.removeFromFavourites(id).subscribe(() => {});
    this.userServ.getFavourite(this.param).subscribe((data) => {
      this.favourite = data;
    });
  };

  public addToFavourite = async (qid: number) => {

    console.log(qid);
    await this.userServ
      .addToFavourites(this.param, qid)
      .subscribe((data) => {});
    this.userServ.getFavourite(this.param).subscribe((data) => {
      this.favourite = data;
    });
  };

  //create a function wich will sed user id and check if the quiz is present in the favourites if present disable add to favourite button
  public isFavourite = (quiz: any) => {
    // this.flag = false;
    // console.log(this.favourite[0].quizid);
    for (var i = 0; i < this.favourite.length; i++) {
      if (this.favourite[i].quizid === quiz) {

        return true;
        // this.flag=true;
        //  console.log(this.favourite[i]);
        //  console.log(this.flag);
      }
    }
    return  false;

  };

  applyFilterTwo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    //  for(var i = 0; i < this.allQuiz.length; i++) {

    //   }
    console.log(this.allQuiz);
  }

  ngOnInit(): void {
    // this.param=JSON.parse(sessionStorage.getItem('user'));
    //console.log(this.param);

    this.userServ.getFavourite(this.param).subscribe((data) => {
      this.favourite = data;
    });

    this.userServ.getAllQuizzes().subscribe((data) => {
      this.allQuiz = data;
      this.dataSource=new MatTableDataSource(data);
    });
  }


  // to apply filter on particular column
    // this.dataSource.filterPredicate = (data: Element, filter: string) => {
    //   return data.id == filter;
    //  };

  // applyFilter(filterValue: string) {
  //   // filterValue = filterValue.trim(); // Remove whitespace
  //   // filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }



}
