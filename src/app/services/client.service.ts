import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../common/types';
import { map, catchError } from 'rxjs/operators';
import { GlobalConstants } from '../common/global-constants';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class ClientService {

	public url = `${GlobalConstants.BASE_URL}clients`;

	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) { 
		this.handleError = httpErrorHandler.createHandleError('ClientService');
	}


	getAll(): Observable<Client[]>{

		return this.http.get<Client[]>(this.url)
			.pipe(
				map( response => { 				
					return response; 
				}),
				catchError(this.handleError('getAll', []))
			)
		;
	}

}
