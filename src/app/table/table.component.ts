import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablesColumns, TableItem } from '../common/types';
import  {TablesService}  from '../services/tables.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  providers: [TablesService],
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

	public location : string = "";
	public columns : TableItem[]  = [];

	@Input() data: TablesColumns | any;  // doesnt work without any

	constructor(private activatedRoute: ActivatedRoute, private tableService : TablesService) { }

	ngOnInit(): void {
		this.activatedRoute.url
			.subscribe(url => {
				this.location = url.toString();
				console.log(this.location);
				this.getColumns(this.location);
			});

			
	}

	getColumns(url: string): void {
		console.log(url)
		this.tableService.getColumns(url)
			.subscribe(value => { 
				console.log(value.columns)
				if(value?.columns){
					this.columns = value.columns;
				}
			
			})
	}

}
