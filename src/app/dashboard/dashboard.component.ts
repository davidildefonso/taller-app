import { Component, OnInit } from '@angular/core';
import { Widget } from '../common/types';
import  {WIDGETS} from '../common/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	widgets = WIDGETS;
	constructor() { }

	ngOnInit(): void {
	
	}

}
