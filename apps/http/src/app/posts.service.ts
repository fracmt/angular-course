import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import { environment } from "../environments/environment";
import { Post } from "./post.model";

@Injectable({ providedIn: "root" })
export class PostsService {
  apiUrl = "";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  createStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(this.apiUrl + "posts.json", postData)
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchPost() {
    return this.http
      .get<{ [key: string]: Post }>(this.apiUrl + "posts.json")
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
        })
      );
  }

  deletePosts() {
    return this.http.delete(this.apiUrl + "posts.json");
  }
}
