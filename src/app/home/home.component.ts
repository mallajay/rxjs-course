import { Component, OnInit } from "@angular/core";
import { CourseModel } from "../model/course";
import { interval, noop, Observable, of, timer } from "rxjs";
import {
  catchError,
  delayWhen,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  standalone: false,
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<CourseModel[]>;
  advanceCourses$: Observable<CourseModel[]>;

  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    const courses$ = http$.pipe(
      tap(() => console.log("HTTP request executed")),
      map((res) => Object.values(res["payload"])),
      shareReplay()
    );

    this.beginnerCourses$ = courses$.pipe(
      map((courses: CourseModel[]) =>
        courses.filter((course: CourseModel) => course.category == "BEGINNER")
      )
    );

    this.advanceCourses$ = courses$.pipe(
      map((courses: CourseModel[]) =>
        courses.filter((course: CourseModel) => course.category == "ADVANCED")
      )
    );
  }
}
