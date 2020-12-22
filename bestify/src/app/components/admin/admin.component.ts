import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  ElementRef,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/service/admin/admin.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isMCQ: boolean = false;
  QueTab: boolean = false;
  gameuserCount: any;
  quizuserCount: any;
  gameHighScoreData: any;
  quizHighScoreData: any;
  displayedColumns: string[] = ['username', 'maxscore'];
  quizarray: any[];
  dataSource1: any;
  dataSource2: any;
  dataSource3:any;
  quizSubmitResponse: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private myElement: ElementRef,
    private _adminServ: AdminService,
    private fb: FormBuilder
  ) {
    this.quizform = this.fb.group({
      quizname: ['', Validators.required],
      quizcategory: ['', Validators.required],
    });
    this.questionform = this.fb.group({
      questionstatement: [''],
      option1: [''],
      option2: [''],
      option3: [''],
      option4: [''],
      answer: [''],
    });
  }

  quizform: FormGroup;
  questionform: FormGroup;

  pie: any = 'PieChart';
  piedata: any[];
  pietitle: any = 'pie chart';
  piecolumns: any[] = ['Games', 'Users Count'];
  pieoptions: any = {
    colors: ['#F4D03F', '#58D68D', '#5DADE2', '#E74C3C', '#8E44AD'],
    is3D: true,
  };
  piewidth: any = 600;
  pieheight: any = 600;

  column: any = 'ColumnChart';
  columndata: any[];
  // columndata: any[] = [
  //   ['London', 8136000],
  //   ['New York', 8538000],
  //   ['Paris', 2244000],
  //   ['Berlin', 3470000],
  //   ['Kairo', 19500000],
  // ];

  columntitle: any = 'column chart';
  columncolumns: any[] = ['Quiz', 'Users Count'];
  columnoptions: any = {
    colors: ['#E74C3C', '#58D68D', '#5DADE2', '#E74C3C', '#8E44AD'],
    is3D: true,
  };
  columnwidth: any = 600;
  columnheight: any = 600;

  ngOnInit(): void {
    this._adminServ.getgameusersCount().subscribe((data) => {
      this.gameuserCount = data;
      console.log(data);
      console.log(this.gameuserCount);
      this.piedata = this.gameuserCount.map((o) =>
        Object.keys(o).map((k) => o[k])
      );
      console.log(this.piedata);
    });

    this._adminServ.getquizusersCount().subscribe((data) => {
      this.quizuserCount = data;
      console.log(data);
      console.log(this.quizuserCount);
      this.columndata = this.quizuserCount.map((o) =>
        Object.keys(o).map((k) => o[k])
      );
      console.log(this.columndata);
    });

    this._adminServ.getUsersWithHighGameScore().subscribe((data) => {
      console.log(data);
      this.gameHighScoreData = data;
      this.dataSource1 = new MatTableDataSource(this.gameHighScoreData);

      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
    });
    this._adminServ.getUsersWithHighQuizScore().subscribe((data) => {
      console.log(data);
      this.quizHighScoreData = data;
      this.dataSource2 = new MatTableDataSource(this.quizHighScoreData);

      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
    });

    this._adminServ.getallQuiz().subscribe((data: any) => {
      this.quizarray = data;
      // this.dataSource3 = new MatTableDataSource(this.quizarray);

      console.log(this.quizarray + '------------------------------');
      // this.quizarray = this.quizarray.map((o) =>
      //   Object.keys(o).map((k) => o[k])
      // );
      // this.quizarray.flatMap(x => [x * 2]);

      console.log(this.quizarray + '------------------------------');
    });
  }

  applyFilter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();

    if (this.dataSource1.paginator) {
      this.dataSource1.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  submitQuiz() {
    if (this.quizform.valid) {
      this.QueTab = true;
      let quiz = {
        quizname: this.quizform.value.quizname,
        category: this.quizform.value.quizcategory,
      };
      this._adminServ.postQuiz(quiz).subscribe((res) => {
        this.quizSubmitResponse = res;
        console.log(this.quizSubmitResponse);
      });
    }
  }
  submitQuetions() {
    if (this.isMCQ) {
      let questions = {
        QuestionStatement: this.questionform.value.questionstatement,
        Option1: this.questionform.value.option1,
        Option2: this.questionform.value.option2,
        Option3: this.questionform.value.option3,
        Option4: this.questionform.value.option4,
        IsMcq: true,
        Answers: this.questionform.value.answer,
        quizname: this.quizform.value.quizname,
        QuizId: this.quizSubmitResponse.id,
      };
      this._adminServ.postQuestions(questions).subscribe();
    } else {
      let questions = {
        QuestionStatement: this.questionform.value.questionstatement,
        Option1: '',
        Option2: '',
        Option3: '',
        Option4: '',
        IsMcq: false,
        Answers: this.questionform.value.answer,
        quizname: this.quizform.value.quizname,
        QuizId: this.quizSubmitResponse.id,
      };
      this._adminServ.postQuestions(questions).subscribe();
    }
  }
  deleteQuiz(id: any) {
    console.log('id' + id);
    this._adminServ.deleteQuiz(id).subscribe((res) => {
      console.log(res + 'hhhhhhhhhhhh');
      this._adminServ.getallQuiz().subscribe((data: any) => {
        this.quizarray = data;
        console.log(this.quizarray + '------------------------------');
        console.log(this.quizarray + '------------------------------');
      });
    });
  }

  gotoSection(id: string) {
    console.log(id);
    let el = this.myElement.nativeElement.querySelector('#' + id);
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
