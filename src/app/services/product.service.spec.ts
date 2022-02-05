import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Product } from '../common/types';
import { ProductService } from './product.service';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { TableComponent } from '../table/table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
		declarations: [
			TableComponent 
		],
      // Import the HttpClient mocking services
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      // Provide the service-under-test and its dependencies
      providers: [
        ProductService,
        HttpErrorHandler,
        MessageService,
		HttpClient
      ]
    });

    // Inject the http, test controller, and service-under-test
    // as they will be referenced by each test.
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    productService = TestBed.inject(ProductService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  /// ProductService method tests begin ///

  describe('#getProducts', () => {
    let expectedProducts: Product[];

    beforeEach(() => {
      productService = TestBed.inject(ProductService);
      expectedProducts = [
			{
				"id": 1,
				"name": "product 1",
				"cost": 5,
				"price": 9,
				"margin": 4,
				"moneda": "PEN",
				"unidad": "docena",
				"ranking": "A"
			},
			{
				"id": 2,
				"name": "product 2",
				"cost": 9,
				"price": 13,
				"margin": 4,
				"moneda": "PEN",
				"unidad": "docena",
				"ranking": "C"
			}
       ] as Product[];
    });

    it('should return expected products (called once)', () => {

      productService.getProducts().subscribe(
        products => expect(products).toEqual(expectedProducts, 'should return expected products'),
        fail
      );

      // ProductService should have made one request to GET products from expected URL
      const req = httpTestingController.expectOne(productService.productsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock products
      req.flush(expectedProducts);
    });

    it('should be OK returning no products', () => {

      productService.getProducts().subscribe(
        products => expect(products.length).toEqual(0, 'should have empty products array'),
        fail
      );

      const req = httpTestingController.expectOne(productService.productsUrl);
      req.flush([]); // Respond with no products
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty products result', () => {
	

		productService.getProducts().subscribe(
			products =>{ 
			
				expect(products.length).toEqual(0, 'should return empty products array')},
			fail
		);

		const req = httpTestingController.expectOne(productService.productsUrl);

	//	respond with a 404 and the error message in the body
		const msg = 'deliberate 404 error';
		req.flush(msg, { status: 404, statusText: "not found" });
		  
    });

    it('should return expected products (called multiple times)', () => {

      productService.getProducts().subscribe();
      productService.getProducts().subscribe();
      productService.getProducts().subscribe(
        products => expect(products).toEqual(expectedProducts, 'should return expected products'),
        fail
      );

      const requests = httpTestingController.match(productService.productsUrl);
      expect(requests.length).toEqual(3, 'calls to getProducts()');

      // Respond to each request with different mock products results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedProducts);
    });
  });

//   describe('#updateProduct', () => {
//     // Expecting the query form of URL so should not 404 when id not found
//     const makeUrl = (id: number) => `${productService.productsUrl}/?id=${id}`;

//     it('should update a product and return it', () => {

//       const updateProduct: Product = { id: 1, name: 'A' };

//       productService.updateProduct(updateProduct).subscribe(
//         data => expect(data).toEqual(updateProduct, 'should return the product'),
//         fail
//       );

//       // ProductService should have made one request to PUT product
//       const req = httpTestingController.expectOne(productService.productsUrl);
//       expect(req.request.method).toEqual('PUT');
//       expect(req.request.body).toEqual(updateProduct);

//       // Expect server to return the product after PUT
//       const expectedResponse = new HttpResponse(
//         { status: 200, statusText: 'OK', body: updateProduct });
//       req.event(expectedResponse);
//     });

//     // This service reports the error but finds a way to let the app keep going.
//     it('should turn 404 error into return of the update product', () => {
//       const updateProduct: Product = { id: 1, name: 'A' };

//       productService.updateProduct(updateProduct).subscribe(
//         data => expect(data).toEqual(updateProduct, 'should return the update product'),
//         fail
//       );

//       const req = httpTestingController.expectOne(updateProduct.productsUrl);

//       // respond with a 404 and the error message in the body
//       const msg = 'deliberate 404 error';
//       req.flush(msg, {status: 404, statusText: 'Not Found'});
//     });
//   });

  // TODO: test other ProductService methods
});


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/