import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClientsComponent } from './clients.component';
import { HttpClientTestingModule,  } from '@angular/common/http/testing';
import { HttpErrorHandler } from '../services/http-error-handler.service';
import { MessageService } from '../services/message.service';
import { TableComponent } from '../table/table.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
		imports: [ HttpClientTestingModule , RouterTestingModule], 
		declarations: [ ClientsComponent, TableComponent  ],
		providers: [
			HttpErrorHandler,
        	MessageService,
			HttpClient
		]
    })
    .compileComponents();

	
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
