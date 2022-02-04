export interface Widget {
  id: number
  name: string
}


export interface Product{
	[k: string]: string | number
	id: number
	name: string
	cost: number
	price: number
	margin: number
	moneda: string
	unidad: string
	ranking: string
}


export interface Table{
	id: string;
	columns: [TableItem]
}

export interface TableItem{
	key: string
	real: string
}