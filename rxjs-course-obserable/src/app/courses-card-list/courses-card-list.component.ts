import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { CourseModel } from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";

@Component({
  selector: "courses-card-list",
  templateUrl: "./courses-card-list.component.html",
  styleUrls: ["./courses-card-list.component.css"],
  standalone: false,
})
export class CoursesCardListComponent implements OnInit {
  @Input()
  courses: CourseModel[];

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  editCourse(course: CourseModel) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);
  }
}
