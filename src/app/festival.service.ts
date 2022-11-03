import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { MusicFestival } from "./festival-view/festival-view.model";
import { timeout } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class FestivalService {
  httpHeaders = new HttpHeaders().set("Access-Control-Allow-Origin", "**");
  constructor(private http: HttpClient) {}
  private apiRoute = "http://localhost:5000/api";
  getFestivalData() {
    return this.http.get<MusicFestival[]>(`${this.apiRoute}`, { headers: this.httpHeaders }).pipe(timeout(2000));
  }
}
