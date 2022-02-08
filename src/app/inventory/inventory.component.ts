import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../services/inventory.service';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';
import { InventoryItem } from '../common/types';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  providers: [InventoryService, HttpErrorHandler, MessageService],
})
export class InventoryComponent implements OnInit {

	items : InventoryItem[]  = [];

	constructor( private service : InventoryService) { }

	ngOnInit(): void {
		this.getProviders();	
	}

	getProviders(): void {
		this.service.getAll()
			.subscribe(items => {
				(this.items = items);
				console.log(this.items);
			})

		
	}

}
