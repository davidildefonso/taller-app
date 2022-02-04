import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, TableItem } from '../common/types';
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

	@Input() data: Product[] | undefined; 

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
		this.tableService.getColumns(url)
			.subscribe(value => { 
				this.columns = value.columns;
			})
	}

}
