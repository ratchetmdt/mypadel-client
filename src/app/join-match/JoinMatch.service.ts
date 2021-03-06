import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { environment } from '../../environments/environment';
import { JoinMatch } from './JoinMatch';
import {Match} from '../match/Match';

@Injectable()
export class JoinMatchService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {}

  // GET /joinMatches
  getAllJoinMatches(): Observable<JoinMatch[]> {
    return this.http.get(`${environment.API}/joinMatches`)
      .map((res: Response) => res.json()._embedded.joinMatches.map(json => new JoinMatch(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /joinMatches/id/player
  getJoinMatchByPlayer(player: string): Observable<JoinMatch[]> {
    return this.http.get(`${environment.API}/joinMatches/search/findByPlayerUsername?text=${player}`)
      .map((res: Response) => res.json()._embedded.joinMatches.map(json => new JoinMatch(json)))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /joinMatches/id
  getJoinMatch(id: string): Observable<JoinMatch> {
    return this.http.get(`${environment.API}/joinMatches/${id}`)
      .map((res: Response) => new JoinMatch(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
  // GET /joinMatches/id/match
  getMatchFromJoinMatch(id: string): Observable<Match> {
    return this.http.get(`${environment.API}/joinMatches/${id}/match`)
      .map((res: Response) => new Match(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /joinMatches
  addJoinMatch(joinMatch: JoinMatch): Observable<JoinMatch> {
    const body = JSON.stringify(joinMatch);
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.post(`${environment.API}/joinMatches`, body, options)
      .map((res: Response) => new JoinMatch(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /joinMatches/{id}
  deleteJoinMatch(joinMatches: JoinMatch): Observable<Response> {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    const options = new RequestOptions({headers: headers});

    return this.http.delete(`${environment.API}${joinMatches.uri}`, options)
      .map((res: Response) => res)
      .catch((error: any) => Observable.throw(error.json()));
  }
}

