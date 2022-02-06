import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Table } from '../common/types';
import { catchError, retry } from 'rxjs/operators';
import{ GlobalConstants } from '../common/global-constants';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

	private tablesUrl = `${GlobalConstants.BASE_URL}tables`;

	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) {
		this.handleError = httpErrorHandler.createHandleError('TablesService');
	}


	getColumns(url: string): Observable<Table>{
		console.log(`${this.tablesUrl}/${url}`)
		return this.http.get<Table>(`${this.tablesUrl}/${url}`)
			.pipe(
			//	retry(3),
				catchError(this.handleError('getColumns', { }))
			)
		;
	}


}
