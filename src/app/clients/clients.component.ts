import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../common/types';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  providers: [ClientService, HttpErrorHandler, MessageService],
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

	clients : Client[]  = [];

	constructor(    private clientService : ClientService    ) { }

	ngOnInit(): void {
		this.getClients();	
	}

	getClients(): void {
		this.clientService.getAll()
			.subscribe(clients => {
				(this.clients = clients);
				console.log(this.clients);
			})

		
	}

}
