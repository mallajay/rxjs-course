import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  delayWhen,
  filter,
  from,
  map,
  Observable,
  retryWhen,
  shareReplay,
  Subject,
  tap,
  timer,
} from "rxjs";
import { Course } from "../model/course";
import { createHttpObservable } from "./util";

@Injectable({
  providedIn: "root",
})
export class Store {
  private subject = new BehaviorSubject<Course[]>([]);

  courses$: Observable<Course[]> = this.subject.asObservable();

  init() {
    const http$ = createHttpObservable("/api/courses");

    http$
      .pipe(
        tap(() => console.log("HTTP request executed")),
        map((res) => Object.values(res["payload"]))
      )
      .subscribe((courses: Course[]) => this.subject.next(courses));
  }

  selectBeginnerCourses() {
    return this.filterByCategory("BEGINNER");
  }

  selectAdvancvedCourses() {
    return this.filterByCategory("ADVANCED");
  }

  filterByCategory(category: string) {
    return this.courses$.pipe(
      map((courses) => courses.filter((course) => course.category == category))
    );
  }

  selectCourseById(courseId: number) {
    return this.courses$.pipe(
      map((courses) => courses.find((course) => course.id == courseId)),
      filter((course) => !!course)
    );
  }

  saveCourse(courseId: number, changes: Course): Observable<any> {
    const courses = this.subject.getValue();

    const courseIndex = courses.findIndex((course) => course.id == courseId);

    const newCourses = courses.slice(0);

    newCourses[courseIndex] = {
      ...courses[courseIndex],
      ...changes,
    };

    this.subject.next(newCourses);

    return from(
      fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify(changes),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  }
}
