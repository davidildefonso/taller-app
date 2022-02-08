import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provider } from '../common/types';
import { map, catchError } from 'rxjs/operators';
import { GlobalConstants } from '../common/global-constants';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
	public url = `${GlobalConstants.BASE_URL}providers`;

	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) { 
		this.handleError = httpErrorHandler.createHandleError('ProviderService');
	}


	getAll(): Observable<Provider[]>{

		return this.http.get<Provider[]>(this.url)
			.pipe(
				map( response => { 				
					return response; 
				}),
				catchError(this.handleError('getAll', []))
			)
		;
	}
}
