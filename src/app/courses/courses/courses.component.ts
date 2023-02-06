import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$ !: Observable<Course[]>;

  displayedColumns: string[] = ['name', 'category', 'actions']

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(error => {
        this.onError("Erro ao carregar cursos!")
        //retorna um array vazio caso de algum erro durante a chamada do service
        return of([]);
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route})
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course.id], {relativeTo: this.route})
  }

  onDelete(course: Course){
    this.coursesService.delete(course).subscribe(() => this.refresh());

  }
}
