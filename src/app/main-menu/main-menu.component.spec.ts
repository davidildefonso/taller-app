import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 	it('should render all the section names', () => {		
		const compiled = fixture.nativeElement as HTMLElement;
		const items = compiled.querySelectorAll('.menu-list li') ;	
		expect(Array.from(items).map(i => i.textContent).join(",")).toEqual("DASHBOARD,PRODUCTOS,VENTAS,INVENTARIO,CLIENTES,PROVEEDORES,REPORTES");
	});
});
