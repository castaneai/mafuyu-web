
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';




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
            .get<IGetTagInfosResponse>(`${environment.apiUrl}/tag?q=${keyword}`).pipe(
            map(res => res.tags))
            .toPromise();
    }
}