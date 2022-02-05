import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { TablesService } from './tables.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('TablesService', () => {
  let service: TablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({   
		imports: [ HttpClientTestingModule ],
		providers: [     
			HttpClient
		]
    });
    service = TestBed.inject(TablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
