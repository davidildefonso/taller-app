import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../common/types';
import { map, catchError, retry } from 'rxjs/operators';
import { GlobalConstants } from '../common/global-constants';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

	public productsUrl = `${GlobalConstants.BASE_URL}products`;

	private handleError: HandleError;

	constructor(
		private http: HttpClient,
		httpErrorHandler: HttpErrorHandler
	) { 
		this.handleError = httpErrorHandler.createHandleError('ProductService');
	}


	getProducts(): Observable<Product[]>{

		return this.http.get<Product[]>(this.productsUrl)
			.pipe(
				//retry(3), this makes unit test fail
				map( response => { 				
					return response; 
				}),
				catchError(this.handleError('getProducts', []))
			)
		;
	}

}
