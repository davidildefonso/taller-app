import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TablesService } from './tables.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';

describe('TablesService', () => {
	let service: TablesService;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;
 

	beforeEach(() => {
		TestBed.configureTestingModule({   
			imports: [ HttpClientTestingModule ],
			providers: [   
				TablesService,
				HttpErrorHandler,
				MessageService,  
				HttpClient
			]
		});
		
		service = TestBed.inject(TablesService);
		httpClient = TestBed.inject(HttpClient);
    	httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
	expect(service).toBeTruthy();
	});
});
