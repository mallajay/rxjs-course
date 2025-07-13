Here is a **quick revision-friendly list** of commonly used **RxJS operators**, tailored for **interview preparation**. Each operator includes a short, clear **purpose/usage** and a **reference to the corresponding markdown note number** from your image.

---

# ✅ RxJS Operators – Quick Revision Guide

---

### 🔁 Creation & Transformation

| Operator                          | Purpose / Use Case                                                    | 📄 Notes                              |
| --------------------------------- | --------------------------------------------------------------------- | ------------------------------------- |
| `of`, `from`, `interval`, `timer` | Create observables from values, arrays, promises, or intervals.       | 01.Streams.md, 02.RXJS-Observables.md |
| `map`                             | Transform each emitted value (like `.map()` in JS).                   | 05.map-Operator.md                    |
| `concatMap`                       | Queue and map inner observables sequentially.                         | 08.concatMap.md                       |
| `mergeMap`                        | Map and **flatten concurrently**; good for HTTP calls.                | 09.merge-mergemap.md                  |
| `switchMap`                       | Cancel previous observable on new emission (great for typeaheads).    | 13.switchMap-and-concat.md            |
| `exhaustMap`                      | Ignores new emissions if one is in progress (ideal for login clicks). | 10.exhaustMap.md                      |
| `custom observable`               | Manually create observable using `new Observable()`.                  | 04.Custom-Observable.md               |

---

### 🔄 Combination Operators

| Operator         | Purpose / Use Case                                                | 📄 Notes              |
| ---------------- | ----------------------------------------------------------------- | --------------------- |
| `concat`         | Combine observables sequentially.                                 | 07.concat-Operator.md |
| `merge`          | Combine observables **concurrently**.                             | 09.merge-mergemap.md  |
| `forkJoin`       | Wait for **all observables** to complete, then emit final values. | 20.forkJoin.md        |
| `withLatestFrom` | Combine source with **latest values** from other observables.     | 25.withLatestFrom.md  |

---

### ⛔ Filtering & Control

| Operator                       | Purpose / Use Case                                                 | 📄 Notes                                |
| ------------------------------ | ------------------------------------------------------------------ | --------------------------------------- |
| `first`                        | Emit only the **first** value (optionally with a condition).       | 24.first-take-Operator.md               |
| `take`                         | Emit **first N** values and then complete.                         | 24.first-take-Operator.md               |
| `debounceTime`                 | Wait for silence; useful in **search input** or **scroll** events. | 12.debounceTime-distinctUntilChanged.md |
| `distinctUntilChanged`         | Prevent emitting same consecutive values (for optimization).       | 12.debounceTime-distinctUntilChanged.md |
| `filter`                       | Allow values through **based on condition**.                       | (Add in future for filtering ops)       |
| `startWith`                    | Emit an initial value before anything else.                        | 17.startWith.md                         |
| `throttleTime`, `debounceTime` | Throttle or delay emission of fast streams.                        | 18.Throttling-vs-Debouncing.md          |

---

### ⚙️ Utility & Error Handling

| Operator             | Purpose / Use Case                                           | 📄 Notes                         |
| -------------------- | ------------------------------------------------------------ | -------------------------------- |
| `catchError`         | Handle errors in stream; return fallback observable.         | 14.catchError.md                 |
| `retry`, `retryWhen` | Retry a failed observable, optionally with delay/backoff.    | 16.Retry-Strategy.md             |
| `tap` (was `do`)     | Perform side effects (e.g., logging/debugging).              | 19.custom-rxjs-debug.operator.md |
| `finalize`           | Run logic on stream completion or error (e.g., hide loader). | Not yet listed                   |

---

### 🎯 Subjects & Multicasting

| Type              | Purpose / Use Case                                                       | 📄 Notes                         |
| ----------------- | ------------------------------------------------------------------------ | -------------------------------- |
| `Subject`         | Multicast source to multiple observers (like an event emitter).          | 21.RXJS-Subject.md               |
| `BehaviorSubject` | Subject that holds a **current value**; emits latest to new subscribers. | 22.BehaviorSubject.md            |
| `ReplaySubject`   | Subject that **replays old values** to new subscribers.                  | 23.AsyncSubject-ReplaySubject.md |
| `AsyncSubject`    | Emits **only last value** upon `complete()`.                             | 23.AsyncSubject-ReplaySubject.md |

---

### 🔁 Error Recovery

| Operator          | Purpose / Use Case                              | 📄 Notes                 |
| ----------------- | ----------------------------------------------- | ------------------------ |
| `catchError`      | Recover from error, return fallback observable. | 14.catchError.md         |
| `catchAndRethrow` | Custom handling then rethrowing.                | 15.Catch-and-Rethrow\.md |

---

## 🧪 Advanced Debugging

| Operator / Tool      | Purpose / Use Case                                     | 📄 Notes                         |
| -------------------- | ------------------------------------------------------ | -------------------------------- |
| `tap`, custom logger | For side effects like logging without altering stream. | 19.custom-rxjs-debug.operator.md |

---

### 📁 Reference by Note Number (from image)

| Note # | Topic                                |
| ------ | ------------------------------------ |
| 01     | Streams.md                           |
| 02     | RXJS-Observables.md                  |
| 04     | Custom-Observable.md                 |
| 05     | map-Operator.md                      |
| 06     | HTTP-Observables.md                  |
| 07     | concat-Operator.md                   |
| 08     | concatMap.md                         |
| 09     | merge-mergemap.md                    |
| 10     | exhaustMap.md                        |
| 11     | unsubscription.md                    |
| 12     | debounceTime-distinctUntilChanged.md |
| 13     | switchMap-and-concat.md              |
| 14     | catchError.md                        |
| 15     | Catch-and-Rethrow.md                |
| 16     | Retry-Strategy.md                    |
| 17     | startWith.md                         |
| 18     | Throttling-vs-Debouncing.md          |
| 19     | custom-rxjs-debug.operator.md        |
| 20     | forkJoin.md                          |
| 21     | RXJS-Subject.md                      |
| 22     | BehaviorSubject.md                   |
| 23     | AsyncSubject-ReplaySubject.md        |
| 24     | first-take-Operator.md               |
| 25     | withLatestFrom.md                    |

---

Would you like this list in **Markdown**, **PDF**, or a **printable cheat sheet format** for interviews or team handouts?
