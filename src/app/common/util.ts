import { Observable, Observer } from "rxjs";

export function createHttpObservable(url: string) {
  return new Observable<any>((observer: Observer<Response>) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })

      .then((body) => {
        observer.next(body);
        observer.complete();
      })

      .catch((err) => {
        observer.error(err);
      });
  });
}
