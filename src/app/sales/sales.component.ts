import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';
import { Sale } from '../common/types';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
  providers: [SalesService, HttpErrorHandler, MessageService],
})
export class SalesComponent implements OnInit {

	sales : Sale[]  = [];

	constructor( private service : SalesService) { }

	ngOnInit(): void {
		this.getProviders();	
	}

	getProviders(): void {
		this.service.getAll()
			.subscribe(sales => {
				(this.sales = sales);
				console.log(this.sales);
			})

		
	}


}
