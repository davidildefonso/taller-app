import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../common/types';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductService],
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

	products : Product[]  = [];
	
	constructor(private productService : ProductService) { }

	ngOnInit(): void {
		this.getProducts();
		
	}

	getProducts(): void {
		this.productService.getProducts()
			.subscribe(products => {
				(this.products = products);
				console.log(this.products);
			})

		
	}

	

}
