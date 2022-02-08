import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryItem } from '../common/types';
import { map, catchError } from 'rxjs/operators';
import { GlobalConstants } from '../common/global-constants';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  	public url = `${GlobalConstants.BASE_URL}inventory`;

	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) { 
		this.handleError = httpErrorHandler.createHandleError('InventoryService');
	}


	getAll(): Observable<InventoryItem[]>{

		return this.http.get<InventoryItem[]>(this.url)
			.pipe(
				map( response => { 				
					return response; 
				}),
				catchError(this.handleError('getAll', []))
			)
		;
	}
}
