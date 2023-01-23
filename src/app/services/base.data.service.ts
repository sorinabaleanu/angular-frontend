import { environment } from '../../environments/environment'
import { Injectable } from '@angular/core';
import { Observable, EMPTY, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';

/** Base class for the a data service object, to be extended and used by all services that do standard CRUD request to the backend */
@Injectable({ providedIn: 'root' })
export abstract class BaseDataService<T> {
  /*To be overriden by child classes*/
  serviceURL: string = '';

  /*Subject that can be used by components or other classes to subscribe to "data" changed by this service trough all the requests defined bellow */
  dataChange$: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);

  /*Construct the complete URL for the service using hte base api URL and the URL defined in the child class */
  public get apiURL(): string {
    return `${environment.apiUrl}${this.serviceURL}`;
  }

  httpOptions = {
      headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private baseHttpClient: HttpClient) { }

  /*executes a GET request to the backend to the endpoint define in the child class */
  getData(): void {
    this.baseHttpClient
      .get<T[]>(this.apiURL, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        })
      )
      .subscribe(
        (data: T[]) => {
          this.dataChange$.next(data);
          return data;
        },
        (err: HttpErrorResponse) => {
          alert(`Error: ${err.name} ${err.message}`);
        }
      );
  }

  getDataById(id: string): Observable<T> {
   
    return this.baseHttpClient
      .get<T>(`${this.apiURL}/${id}`, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        })
      )
  }

  /*executes a POST request to the backend to the endpoint define in the child class */
  addItem(item: T): Observable<T> {
    return this.baseHttpClient
      .post<T>(this.apiURL, item , this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
          console.log(data);
        }),
        catchError((err, caught) => {
          //handle error here
          return EMPTY;
        })
      );
  }

  /*executes a PUT request to the backend to the endpoint define in the child class */
  updateItem(item: T): Observable<T> {
    return this.baseHttpClient
      .put<T>(this.apiURL, item)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err, caught) => {
          //handle error here
          return EMPTY;
        })
      );
  }

  /*executes a DELETE request to the backend to the endpoint define in the child class */
  deleteItem(itemId: string): Observable<T[]> {
    return this.baseHttpClient
      .delete<T[]>(`${this.apiURL}/${itemId}`, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError((err, caught) => {
          //handle error here
          return EMPTY;
        })
      );
  }
}
