import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

	private productsUrl = "http://localhost:3001/products";

	constructor(
		private http: HttpClient
	) { }


	getProducts(): Observable<Product[]>{
		return this.http.get<Product[]>(this.productsUrl);
	}
}
