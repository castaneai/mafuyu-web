import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { environment } from '../environments/environment';
import { Post } from './post';
import { TagInfo } from './tag';

interface IGetTagInfosResponse {
    tags: TagInfo[];
}

@Injectable()
export class TagService {

    constructor(private httpClient: HttpClient) { }

    getTagInfos(keyword: string): Promise<TagInfo[]> {
        return this.httpClient
            .get<IGetTagInfosResponse>(`${environment.apiUrl}/tag?q=${keyword}`)
            .map(res => res.tags)
            .toPromise();
    }
}