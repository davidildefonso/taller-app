import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Sale } from '../common/types';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { TableComponent } from '../table/table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SalesService } from './sales.service';

describe('SalesService', () => {
	let service: SalesService;
	let httpClient: HttpClient;
  	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TableComponent 
			],
		
			imports: [ HttpClientTestingModule, RouterTestingModule ],
	
			providers: [
				SalesService,
				HttpErrorHandler,
				MessageService,
				HttpClient
			]
		
		
		});

		httpClient = TestBed.inject(HttpClient);
    	httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(SalesService);
	});

	afterEach(() => {
		httpTestingController.verify();
	});


	describe('#getAll Sales', () => {
		let expectedItems: Sale[];

		beforeEach(() => {
			service = TestBed.inject(SalesService);
			expectedItems = [
					{
						"id": 1,
						"dateCreated": new Date("2022-0-31"),
						"orderId": 1,
						"status": "completed",
						"dateModified": new Date("2022-0-31"),
						"type": "delivery",
						"description": "processed without issues",					
					},
					{
						"id": 2,
						"dateCreated": new Date("2022-02-08"),
						"orderId": 2,
						"status": "completed",
						"dateModified": new Date("2022-02-08"),
						"type": "online",
						"description": "processed without issues",		
					},					
					{
						"id": 3,
						"dateCreated": new Date("2022-01-11"),
						"orderId": 3,
						"status": "cancelled",
						"dateModified": new Date("2022-01-15"),
						"type": "online",
						"description": "payment was not made within allowable timeframe for order id 3",			
					},					
					{
						"id": 4,
						"dateCreated": new Date("2022-01-21"),
						"orderId": 4,
						"status": "completed",
						"dateModified": new Date("2022-01-21"),
						"type": "delivery",
						"description": "processed without issues",				
					},					
					{
						"id": 5,
						"dateCreated": new Date("2022-01-28"),
						"orderId": 5,
						"status": "partially paid",
						"dateModified": new Date("2022-01-28"),
						"type": "credit",
						"description": "pay advanced of 50%",

					},
			] as Sale[];
		});

		it('should return expected sales (called once)', () => {

			service.getAll().subscribe(
				items => expect(items).toEqual(expectedItems, 'should return expected sales'),
				fail
			);

			const req = httpTestingController.expectOne(service.url);
			expect(req.request.method).toEqual('GET');

			req.flush(expectedItems);
		});

		it('should be OK returning no sales', () => {

			service.getAll().subscribe(
				items => expect(items.length).toEqual(0, 'should have empty sales array'),
				fail
			);

			const req = httpTestingController.expectOne(service.url);
			req.flush([]); 
		});

	
		it('should turn 404 into an empty sales result', () => {	
			service.getAll().subscribe(
				items =>{
					expect(items.length).toEqual(0, 'should return empty sales array')},
				fail
			);
			const req = httpTestingController.expectOne(service.url);
			const msg = 'deliberate 404 error';
			req.flush(msg, { status: 404, statusText: "not found" });
			
		});

		it('should return expected sales (called multiple times)', () => {
			service.getAll().subscribe();
			service.getAll().subscribe();
			service.getAll().subscribe(
				items => expect(items).toEqual(expectedItems, 'should return expected sales'),
				fail
			);

			const requests = httpTestingController.match(service.url);
			expect(requests.length).toEqual(3, 'calls to getAll() sales');

			requests[0].flush([]);
			requests[1].flush([{id: 1, name: 'bob'}]);
			requests[2].flush(expectedItems);
		});
	});
});
