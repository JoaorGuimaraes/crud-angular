import { Location } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';

import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  course!: Course;

  form = this.formBuilder.group({
    id: [''],
    name: [''],
    category: ['']
  });

  constructor(private formBuilder: NonNullableFormBuilder, private coursesService: CoursesService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      id: course.id,
      name: course.name,
      category: course.category,
    })
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.coursesService.save(this.form.value).subscribe(result => console.log(result), error => this.onError());
    this.onCancel();
  }

  private onError() {
    this.snackBar.open("erro ao salvar curso", '', { duration: 2000 })
  }
}
