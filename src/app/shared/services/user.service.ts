import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public currentUser: Observable<any>;

  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  fetchAllComics() {
    return this.http.get<{ results: any }>(
      `${environment.host}/characters/?api_key=${environment.API_KEY}&resources=characters&format=json`
    );
  }

  fetchComicDetail(url: string) {
    return this.http.get<{ results: any }>(
      `${url}?api_key=${environment.API_KEY}&format=json`
    );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
