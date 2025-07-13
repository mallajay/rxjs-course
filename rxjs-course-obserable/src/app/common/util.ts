import { Observable, Observer } from "rxjs";

export function createHttpObservable(url: string) {
  return new Observable<any>((observer: Observer<Response>) => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error("Request failed with status code: " + response.status);
        }
      })

      .then((body) => {
        observer.next(body);
        observer.complete();
      })

      .catch((err) => {
        observer.error(err);
      });

    return () => controller.abort();
  });
}
