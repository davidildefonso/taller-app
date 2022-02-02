import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from '../common/types';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

	private productsUrl = "http://localhost:3001/tables/products";

	constructor(
		private http: HttpClient
	) { }


	getProducts(): Observable<Product[]>{
		return this.http.get<Product[]>(this.productsUrl)
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
