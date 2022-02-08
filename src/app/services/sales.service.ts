import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../common/types';
import { map, catchError } from 'rxjs/operators';
import { GlobalConstants } from '../common/global-constants';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

	public url = `${GlobalConstants.BASE_URL}sales`;

	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) { 
		this.handleError = httpErrorHandler.createHandleError('SalesService');
	}


	getAll(): Observable<Sale[]>{

		return this.http.get<Sale[]>(this.url)
			.pipe(
				map( response => { 				
					return response; 
				}),
				catchError(this.handleError('getAll', []))
			)
		;
	}
}
