import { ComponentFixture, TestBed } from '@angular/core/testing';
import{ GlobalConstants } from '../common/global-constants';
import { ToolBarComponent } from './tool-bar.component';


describe('ToolBarComponent', () => {
	let component: ToolBarComponent;
	let fixture: ComponentFixture<ToolBarComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		declarations: [ ToolBarComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ToolBarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});


	it('should render the logo and the Welcome message', () => {		
		const compiled = fixture.nativeElement as HTMLElement;
		const img = compiled.querySelector('.toolbar-img') as HTMLImageElement;	
		expect(img?.src).toEqual(`${GlobalConstants.baseURL}/assets/images/logo.png`);
		const msg = compiled.querySelector('.toolbar-message');
		expect(msg?.textContent).toEqual('Welcome Admin');
		const avatar = compiled.querySelector('.toolbar-avatar') as HTMLImageElement;
		expect(avatar?.src).toBeDefined();
	});


});
