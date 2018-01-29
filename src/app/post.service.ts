import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';
import { Post } from './post';

interface IGetPostResponse {
    post: Post;
}

interface ICountPostResponse {
    count : number;
}

interface ISearchPostResponse {
    posts: Post[];
}


@Injectable()
export class PostService {

    constructor(private httpClient: HttpClient) { }

    getPostCount(): Promise<number> {
        return this.httpClient
            .get<ICountPostResponse>(`${environment.apiUrl}/count`)
            .map(res => res.count)
            .toPromise();
    }

    getPost(id: number): Promise<Post> {
        return this.httpClient
            .get<IGetPostResponse>(`${environment.apiUrl}/post/${id}`)
            .map(res => res.post)
            .toPromise()
    }

    searchPost(keyword: string): Promise<Post[]> {
        return this.httpClient
            .get<ISearchPostResponse>(`${environment.apiUrl}/post?q=${keyword}`)
            .map(res => res.posts)
            .toPromise();
    }
}