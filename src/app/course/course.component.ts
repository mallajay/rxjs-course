import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CourseModel } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll,
  shareReplay,
} from "rxjs/operators";
import { merge, fromEvent, Observable, concat } from "rxjs";
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

    this.course$ = createHttpObservable(`/api/courses/${this.courseId}`);
  }

  ngAfterViewInit() {
    const searchLesson$ = fromEvent<any>(
      this.input.nativeElement,
      "keyup"
    ).pipe(
      map((event) => event.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search))
    );

    const initLessons$ = this.loadLessons();

    this.lessons$ = concat(initLessons$, searchLesson$);
  }

  loadLessons(search: string = ""): Observable<LessonModel[]> {
    return createHttpObservable(
      `/api/lessons/?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
