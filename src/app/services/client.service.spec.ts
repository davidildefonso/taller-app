import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { Client } from '../common/types';
import { ClientService } from './client.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { TableComponent } from '../table/table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let clientService: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		declarations: [
			TableComponent 
		],
		// Import the HttpClient mocking services
		imports: [ HttpClientTestingModule, RouterTestingModule ],
		// Provide the service-under-test and its dependencies
		providers: [
			ClientService,
			HttpErrorHandler,
			MessageService,
			HttpClient
		]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    clientService = TestBed.inject(ClientService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// ClientService method tests begin ///

  describe('#getAll clients', () => {
    let expectedClients: Client[];

    beforeEach(() => {
      clientService = TestBed.inject(ClientService);
      expectedClients = [
			{
				"id": 1,
				"name1": "client 1",
				"name2": "alias",
				"phone": 996565,
				"phone2": 964616,
				"phone3": 964616,
				"email1": "client1@gmail.com",
				"email2": "client1@outlook.com",
				"address1": "1525 jr gamarra 2do piso dep 10",
				"neighborhood1": "la victoria",
				"city1": "lima",
				"region1": "lima",
				"country1": "Perú",
				"address2": "1525 jr gamarra 2do piso dep 10",
				"neighborhood2": "la victoria",
				"city2": "lima",
				"region2": "lima",
				"country2": "Perú",
				"business": false,
				"legalId": 1562652656,
				"legalAddress":  "1525 jr gamarra 2do piso dep 10",
				"legalAddressNeighborhood": "la victoria",
				"legalAddressCity": "lima",
				"legalAddressRegion": "lima",
				"legalAddressCountry": "Perú",
				"ranking": "B",
				"facebook": null,
				"businessRepresentative": null,
				"businessRepresentativePhone": null,
				"businessRepresentativeEmail": null
			},
			{
				"id": 2,
				"name1": "emmpresa 1",
				"name2": "empresa 1",
				"phone": 9115156,
				"phone2": "01-4775500",
				"phone3": "01-4775501",
				"email1": "empresa@gmail.com",
				"email2": "empresa@outlook.com",
				"address1": "875 jr gamarra ",
				"neighborhood1": "la victoria",
				"city1": "lima",
				"region1": "lima",
				"country1": "Perú",
				"address2": "121 jr pucara ",
				"neighborhood2": "santa",
				"city2": "piura",
				"region2": "piura",
				"country2": "Perú",
				"business": true,
				"legalId": 2051525105,
				"legalAddress":  "875 jr gamarra",
				"legalAddressNeighborhood": "la victoria",
				"legalAddressCity": "lima",
				"legalAddressRegion": "lima",
				"legalAddressCountry": "Perú",
				"ranking": "A",
				"facebook": "fb.com/empresa1",
				"businessRepresentative": "the boss",
				"businessRepresentativePhone": 966565,
				"businessRepresentativeEmail": "theboss@gmail.com"
			}
       ] as Client[];
    });

    it('should return expected clients (called once)', () => {

      clientService.getAll().subscribe(
        clients => expect(clients).toEqual(expectedClients, 'should return expected clients'),
        fail
      );

      // ClientService should have made one request to GET clients from expected URL
      const req = httpTestingController.expectOne(clientService.url);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock clients
      req.flush(expectedClients);
    });

    it('should be OK returning no clients', () => {

      clientService.getAll().subscribe(
        clients => expect(clients.length).toEqual(0, 'should have empty clients array'),
        fail
      );

      const req = httpTestingController.expectOne(clientService.url);
      req.flush([]); // Respond with no clients
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty clients result', () => {
	

		clientService.getAll().subscribe(
			clients =>{ 
			
				expect(clients.length).toEqual(0, 'should return empty clients array')},
			fail
		);

		const req = httpTestingController.expectOne(clientService.url);

	//	respond with a 404 and the error message in the body
		const msg = 'deliberate 404 error';
		req.flush(msg, { status: 404, statusText: "not found" });
		  
    });

    it('should return expected clients (called multiple times)', () => {

      clientService.getAll().subscribe();
      clientService.getAll().subscribe();
      clientService.getAll().subscribe(
        clients => expect(clients).toEqual(expectedClients, 'should return expected clients'),
        fail
      );

      const requests = httpTestingController.match(clientService.url);
      expect(requests.length).toEqual(3, 'calls to getAll() clients');

      // Respond to each request with different mock clients results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedClients);
    });
  });
});