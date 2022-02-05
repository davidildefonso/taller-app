import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Table } from '../common/types';
import { catchError, retry } from 'rxjs/operators';
import{ GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

	private tablesUrl = `${GlobalConstants.BASE_URL}tables`;

	constructor(
		private http: HttpClient
	) { }


	getColumns(url: string): Observable<Table>{
		return this.http.get<Table>(`${this.tablesUrl}/${url}`)
			.pipe(
				retry(3),
				catchError(this.handleError)
			)
		;
	}


	private handleError(error: HttpErrorResponse){
		if(error.status === 0){
			console.error(`An error ocurred ${error.error} `);
		}else{
			console.error(`backend returned code  ${error.status}, body was: ${error.error}`);
		}

		return throwError("Something bad happenned; please try again later.")
	}

}
