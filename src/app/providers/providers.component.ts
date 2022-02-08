import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';
import { Provider } from '../common/types';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css'],
  providers: [ProviderService, HttpErrorHandler, MessageService],
})
export class ProvidersComponent implements OnInit {

	providers : Provider[]  = [];

	constructor( private providerService : ProviderService) { }

	ngOnInit(): void {
		this.getProviders();	
	}

	getProviders(): void {
		this.providerService.getAll()
			.subscribe(providers => {
				(this.providers = providers);
				console.log(this.providers);
			})

		
	}

}
