import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CourseModel } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import moment from "moment";
import { from, fromEvent } from "rxjs";
import {
  concatMap,
  distinctUntilChanged,
  exhaustMap,
  filter,
  mergeMap,
} from "rxjs/operators";

@Component({
  selector: "course-dialog",
  templateUrl: "./course-dialog.component.html",
  styleUrls: ["./course-dialog.component.css"],
  standalone: false,
})
export class CourseDialogComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  course: CourseModel;

  @ViewChild("saveButton", { static: true, read: ElementRef })
  saveButton: ElementRef;

  @ViewChild("searchInput", { static: true, read: ElementRef })
  searchInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) course: CourseModel
  ) {
    this.course = course;

    this.form = fb.group({
      description: [course.description, Validators.required],
      category: [course.category, Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: [course.longDescription, Validators.required],
    });
  }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        filter(() => this.form.valid),
        mergeMap((changes) => this.saveCourse(changes))
      )
      .subscribe();
  }

  saveCourse(changes) {
    // return fromPromise(
    //   fetch(`/api/courses/${this.course.id}`, {
    //     method: "PUT",
    //     body: JSON.stringify(changes),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   })
    // );

    return from(
      fetch(`/api/courses/${this.course.id}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }

  ngAfterViewInit() {
    fromEvent(this.saveButton.nativeElement, "click")
      .pipe(exhaustMap(() => this.saveCourse(this.form.value)))
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }

  save() {}
}
