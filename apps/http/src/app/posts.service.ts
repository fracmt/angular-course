import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { environment } from "../environments/environment";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  apiUrl = "";
  error = new Subject<string>();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  createStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(this.apiUrl + "posts.json", postData)
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error = error.message;
        }
      );
  }

  fetchPost() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    return this.http
      .get<{ [key: string]: Post }>(this.apiUrl + "posts.json", {
        headers: new HttpHeaders({ "Custom-Header": "Hello" }),
        params: searchParams
        //params: new HttpParams().set('print', 'pretty')
      })
      .pipe(
        //map((responseData: { [key: string]: Post }) => {
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((errorRes) => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(this.apiUrl + "posts.json");
  }
}
