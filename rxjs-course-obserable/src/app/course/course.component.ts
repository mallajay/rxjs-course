import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseModel } from "../model/course";
import { map, tap } from "rxjs/operators";
import { forkJoin, fromEvent, Observable } from "rxjs";
import { LessonModel } from "../model/lesson";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  standalone: false,
})
export class CourseComponent implements OnInit, AfterViewInit {
  course$: Observable<CourseModel>;
  lessons$: Observable<LessonModel[]>;

  courseId: string;

  @ViewChild("searchInput", { static: true }) input: ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    const course$ = createHttpObservable(`/api/courses/${this.courseId}`);

    const lessons$ = this.loadLessons();

    forkJoin(course$, lessons$)
      .pipe(
        tap(([course, lesson]) => {
          console.log("course", course);
          console.log("lesson", lesson);
        })
      )

      .subscribe();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, "keyup")
      .pipe(map((event) => event.target.value))
      .subscribe(console.log);
  }

  loadLessons(search: string = ""): Observable<LessonModel[]> {
    return createHttpObservable(
      `/api/lessons/?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
