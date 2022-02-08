import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Provider } from '../common/types';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { TableComponent } from '../table/table.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProviderService } from './provider.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ProviderService', () => {
	let service: ProviderService;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [
				TableComponent 
			],
			// Import the HttpClient mocking services
			imports: [ HttpClientTestingModule, RouterTestingModule ],
			// Provide the service-under-test and its dependencies
			providers: [
				ProviderService,
				HttpErrorHandler,
				MessageService,
				HttpClient
			]
		});

		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
		service = TestBed.inject(ProviderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	afterEach(() => {
		// After every test, assert that there are no more pending requests.
		httpTestingController.verify();
	});


	 describe('#getAll Providers', () => {
    let expectedProviders: Provider[];

    beforeEach(() => {
		service = TestBed.inject(ProviderService);
		expectedProviders = [
				{
					"id": 1,
					"name1": "Confecciones Cuzco",
					"name2": "timoteo cuzco",
					"phone": "984653232",
					"phone2": "017254656",
					"phone3": "99946469",
					"email1": "confcuzco@gmail.com",
					"email2": "tcuzco@outlook.com",
					"address1": "Av Aviacion  485 ",
					"neighborhood1": "la victoria",
					"city1": "lima",
					"region1": "lima",
					"country1": "Perú",
					"address2": "Jiron Hipolito Unanue 154",
					"neighborhood2": "la victoria",
					"city2": "lima",
					"region2": "lima",
					"country2": "Perú",
					"business": true,
					"legalId": 226261161,
					"legalAddress":  "Av Aviacion  485",
					"legalAddressNeighborhood": "la victoria",
					"legalAddressCity": "lima",
					"legalAddressRegion": "lima",
					"legalAddressCountry": "Perú",
					"ranking": "A",
					"facebook": null,
					"businessRepresentative": null,
					"businessRepresentativePhone": null,
					"businessRepresentativeEmail": null
				},
				{
					"id": 2,
					"name1": "Manuel Zavaleta",
					"name2": "",
					"phone": "9115156",
					"phone2": "9932311",
					"phone3": undefined,
					"email1": "zavaleta@gmail.com",
					"email2": undefined,
					"address1": "Av Aviacion 565",
					"neighborhood1": "la victoria",
					"city1": "lima",
					"region1": "lima",
					"country1": "Perú",
					"address2": "",
					"neighborhood2": "",
					"city2": "",
					"region2": "",
					"country2": "",
					"business": false,
					"legalId": 13212151,
					"legalAddress":  "Av Aviacion 565",
					"legalAddressNeighborhood": "la victoria",
					"legalAddressCity": "lima",
					"legalAddressRegion": "lima",
					"legalAddressCountry": "Perú",
					"ranking": "A",
					"facebook": "fb.com/zavaleta",
					"businessRepresentative": "",
					"businessRepresentativePhone":undefined,
					"businessRepresentativeEmail": ""
				}
			] as Provider[];
		});

		it('should return expected providers (called once)', () => {

			service.getAll().subscribe(
				providers => expect(providers).toEqual(expectedProviders, 'should return expected providers'),
				fail
			);

			
			const req = httpTestingController.expectOne(service.url);
			expect(req.request.method).toEqual('GET');

		
			req.flush(expectedProviders);
		});

		it('should be OK returning no providers', () => {

			service.getAll().subscribe(
				providers => expect(providers.length).toEqual(0, 'should have empty providers array'),
				fail
			);

			const req = httpTestingController.expectOne(service.url);
			req.flush([]); // Respond with no providers
		});

		// This service reports the error but finds a way to let the app keep going.
		it('should turn 404 into an empty providers result', () => {
		

			service.getAll().subscribe(
				providers =>{ 
				
					expect(providers.length).toEqual(0, 'should return empty providers array')},
				fail
			);

			const req = httpTestingController.expectOne(service.url);

		//	respond with a 404 and the error message in the body
			const msg = 'deliberate 404 error';
			req.flush(msg, { status: 404, statusText: "not found" });
			
		});

		it('should return expected providers (called multiple times)', () => {

			service.getAll().subscribe();
			service.getAll().subscribe();
			service.getAll().subscribe(
				providers => expect(providers).toEqual(expectedProviders, 'should return expected providers'),
				fail
			);

			const requests = httpTestingController.match(service.url);
			expect(requests.length).toEqual(3, 'calls to getAll() providers');

			// Respond to each request with different mock providers results
			requests[0].flush([]);
			requests[1].flush([{id: 1, name: 'bob'}]);
			requests[2].flush(expectedProviders);
		});
	});
});
