import { Component } from '@angular/core';
import { Router, NavigationEnd   } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'admin-app';	
	public location : string = "";

	constructor(private router: Router) {		
		router.events.subscribe((event:any) => {
			if(event instanceof NavigationEnd){
				console.log(event)
				this.location = event.url;
			}		 
		});    	
	}
}
