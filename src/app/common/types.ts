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
	id?: string ;
	columns?: [TableItem] 
}

export interface TableItem{
	key: string
	real: string
}



export interface Client{
	id	:	number
	name1	:	string
	name2?	:	string
	phone	:	number
	phone2?	:	string
	phone3?	:	string
	email1	:	string
	email2?	:	string
	address1?	:	string
	neighborhood1?	:	string
	city1?	:	string
	region1?	:	string
	country1?	:	string
	address2?	:	string
	neighborhood2?	:	string
	city2?	:	string
	region2?	:	string
	country2?	:	string
	business	:	boolean
	legalId?	:	number
	legalAddress?	:	string
	legalAddressNeighborhood?	:	string
	legalAddressCity?	:	string
	legalAddressRegion?	:	string
	legalAddressCountry?	:	string
	ranking	:	string
	facebook?	:	string
	businessRepresentative?	:	string
	businessRepresentativePhone?	:	number
	businessRepresentativeEmail?	:	string

}

export type TablesColumns =
  ( Client[]  | Product[])
  | undefined;