import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class WarningService {

    public constructor(private http: HttpClient){}

    public fetchWarnings () {
         return this.http.get<any>('http://localhost:8080/warnings');
    }
}