import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventoryService } from './inventory.service';
import { HttpClient } from '@angular/common/http';
import { InventoryItem } from '../common/types';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { TableComponent } from '../table/table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InventoryService', () => {
  	let service: InventoryService;
	let httpClient: HttpClient;
  	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TableComponent 
			],
		
			imports: [ HttpClientTestingModule, RouterTestingModule ],
	
			providers: [
				InventoryService,
				HttpErrorHandler,
				MessageService,
				HttpClient
			]
		
		});

		httpClient = TestBed.inject(HttpClient);
    	httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(InventoryService);
	});

	afterEach(() => {
		httpTestingController.verify();
	});


	describe('#getAll inventory', () => {
		let expectedItems: InventoryItem[];

		beforeEach(() => {
			service = TestBed.inject(InventoryService);
			expectedItems = [
					{
						"id": 1,
						"type": "materia prima",
						"name": "tela gasa color blanco económica",
						"quantity": 500,
						"unit": "metros",
						"isProduct": false,
						"productId": null,
						"isMaterial": false,
						"materialId": null,
						"isMainResource": true,
						"mainResourceId": 1,					
					},
					{
						"id": 2,
						"type": "producto terminado",
						"name": "tela gasa color blanco económica",
						"quantity": 55,
						"unit": "docenas",
						"isProduct": true,
						"productId": 1,
						"isMaterial": false,
						"materialId": null,	
						"isMainResource": false,
						"mainResourceId": null,			
					},					
					{
						"id": 3,
						"type": "producto terminado",
						"name": "pañal gasa blanca color blanco económico ",
						"quantity": 12,
						"unit": "docenas",
						"isProduct": true,
						"productId": 2,
						"isMaterial": false,
						"materialId": null,
						"isMainResource": false,
						"mainResourceId": null,				
					},					
					{
						"id": 4,
						"type": "materia prima",
						"name": "tela popelina color blanco económica",
						"quantity": 350,
						"unit": "metros",
						"isProduct": false,
						"productId": null,
						"isMaterial": false,
						"materialId": null,
						"isMainResource": false,
						"mainResourceId": null,					
					},					
					{
						"id": 5,
						"type": "materiales indirectos",
						"name": "bolsas para pañales de gasa",
						"quantity": 100,
						"unit": "unidad",
						"isProduct": false,
						"productId": null,
						"isMaterial": true,
						"materialId": 1,
						"isMainResource": false,
						"mainResourceId": null,

					},
			] as InventoryItem[];
		});

		it('should return expected invetory items (called once)', () => {

			service.getAll().subscribe(
				items => expect(items).toEqual(expectedItems, 'should return expected inventory items'),
				fail
			);

			const req = httpTestingController.expectOne(service.url);
			expect(req.request.method).toEqual('GET');

			req.flush(expectedItems);
		});

		it('should be OK returning no inventory items', () => {

			service.getAll().subscribe(
				items => expect(items.length).toEqual(0, 'should have empty inventory items array'),
				fail
			);

			const req = httpTestingController.expectOne(service.url);
			req.flush([]); 
		});

	
		it('should turn 404 into an empty inventory items result', () => {	
			service.getAll().subscribe(
				items =>{
					expect(items.length).toEqual(0, 'should return empty inventory items array')},
				fail
			);
			const req = httpTestingController.expectOne(service.url);
			const msg = 'deliberate 404 error';
			req.flush(msg, { status: 404, statusText: "not found" });
			
		});

		it('should return expected inventory items (called multiple times)', () => {
			service.getAll().subscribe();
			service.getAll().subscribe();
			service.getAll().subscribe(
				items => expect(items).toEqual(expectedItems, 'should return expected inventory items'),
				fail
			);

			const requests = httpTestingController.match(service.url);
			expect(requests.length).toEqual(3, 'calls to getAll() inventory items');

			requests[0].flush([]);
			requests[1].flush([{id: 1, name: 'bob'}]);
			requests[2].flush(expectedItems);
		});
	});
});
