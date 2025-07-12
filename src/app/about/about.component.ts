import { Component, OnInit } from "@angular/core";
import { concat, interval, merge, noop, of } from "rxjs";
import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
  standalone: false,
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    /*   const interval$ = interval(1000);

    const sub = interval$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 5000); */

    const http$ = createHttpObservable("api/courses");

    const sub = http$.subscribe(console.log);

    setTimeout(() => sub.unsubscribe(), 0);
  }
}
