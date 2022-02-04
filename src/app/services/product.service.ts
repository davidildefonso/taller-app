import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../common/types';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

	private productsUrl = "http://localhost:3001/products";

	constructor(
		private http: HttpClient
	) { }


	getProducts(): Observable<Product[]>{

		return this.http.get<Product[]>(this.productsUrl)
			.pipe(
				retry(3),
				map( response => { 				
					return response; 
				}),
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
