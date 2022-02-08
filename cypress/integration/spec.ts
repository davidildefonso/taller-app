describe('Admin app', () => {
	it('Visits the  home page', () => {
		cy.visit('/');
		cy.contains('Welcome Admin');
		cy.contains('DASHBOARD');
		cy.contains('Tu Dashboard');
		cy.contains('Personalizar');
		cy.contains('VENTAS GENERAL');
		cy.contains('TOP PRODUCTOS');

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	})


	it("Navigates to the products page", () => {
		cy.contains("PRODUCTOS").click();
		cy.location("href").should("contain","productos");
		cy.get("table").get("tr:first").contains("Código"); // 
		cy.get("table").get("tr:nth-child(2)").contains("Pañales de tela Gasa color blanco");

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates to the sales page", () => {
		cy.contains("VENTAS").click();
		cy.location("href").should("contain","ventas");
	
	

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates to the inventory page", () => {
		cy.contains("INVENTARIO").click();
		cy.location("href").should("contain","inventario");
	

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates to the clients page", () => {
		cy.contains("CLIENTES").click();
		cy.location("href").should("contain","clientes");
		
		cy.get("table").should("exist");
		cy.contains('Código');
		cy.contains('Dirección');
		cy.contains('RUC');

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates to the providers page", () => {
		cy.contains("PROVEEDORES").click();
		cy.location("href").should("contain","proveedores");
		

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates to the reports page", () => {
		cy.contains("REPORTES").click();
		cy.location("href").should("contain","reportes");
		cy.contains('reports works!');

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates back to the home page", () => {
		cy.contains("REPORTES").click();
		cy.location("href").should("contain","reportes");
		cy.contains('reports works!');

		cy.contains("DASHBOARD").click();
		cy.location("href").should("not.contain","dashboard");
		cy.contains('Tu Dashboard');
		cy.contains('Personalizar');
		cy.contains('VENTAS GENERAL');
		cy.contains('TOP PRODUCTOS');

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');

		cy.contains("report works!").should('not.exist');

	});


	describe("Clients page", () => {
		beforeEach(() => {
			cy.contains("CLIENTES").click();		
		});

		it("when page loads it shows the table with the clients information", () => {
			cy.location("href").should("contain","clientes");
			const columnHeaders = 	cy.get("table").get("tr:first");
			columnHeaders.get("th:first").contains("Código"); 
			columnHeaders.get("th:nth-child(2)").contains("Nombre"); 
			columnHeaders.get("th:nth-child(4)").contains("Teléfono"); 
			columnHeaders.get("th:nth-child(7)").contains("Email"); 
			
			cy.get("table").get("tr:nth-child(2)").get("td:first").contains("1"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(2)").contains("client 1"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(4)").contains("996565"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(7)").contains("client1@gmail.com"); 
		
		});

	
	});

	describe("Inventory page", () => {
		beforeEach(() => {
			cy.contains("INVENTARIO").click();		
		});

		it("when page loads it shows the table with the items in the inventory", () => {
			cy.location("href").should("contain","inventario");
			const columnHeaders = 	cy.get("table").get("tr:first");
			columnHeaders.get("th:first").contains("Código"); 
			columnHeaders.get("th:nth-child(2)").contains("Tipo"); 
			columnHeaders.get("th:nth-child(3)").contains("Nombre"); 
			columnHeaders.get("th:nth-child(4)").contains("Cantidad"); 
			columnHeaders.get("th:nth-child(5)").contains("Unidad"); 
			
			cy.get("table").get("tr:nth-child(2)").get("td:first").contains("1"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(2)").contains("Materia Prima"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(3)").contains("Tela gasa color blanco económica"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(4)").contains(500); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(5)").contains("metros"); 
		
		});

	
	});


	describe("Products page", () => {
		beforeEach(() => {
			cy.contains("PRODUCTOS").click();		
		});

		it("when page loads it shows the table with the products information", () => {
			cy.location("href").should("contain","productos");
			const columnHeaders = 	cy.get("table").get("tr:first");
			columnHeaders.get("th:first").contains("Código"); 
			columnHeaders.get("th:nth-child(2)").contains("Nombre"); 
			columnHeaders.get("th:nth-child(3)").contains("Costo Unitario"); 
			columnHeaders.get("th:nth-child(4)").contains("Precio de venta unitario"); 
			
			cy.get("table").get("tr:nth-child(2)").get("td:first").contains(1); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(2)").contains("Pañales de tela Gasa color blanco"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(3)").contains(15); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(4)").contains(20); 
		
		});

	
	});

	describe("Providers page", () => {
		beforeEach(() => {
			cy.contains("PROVEEDORES").click();		
		});

		it("when page loads it shows the table with the providers information", () => {
			cy.location("href").should("contain","proveedores");
			const columnHeaders = 	cy.get("table").get("tr:first");
			columnHeaders.get("th:first").contains("Código"); 
			columnHeaders.get("th:nth-child(2)").contains("Nombre"); 
			columnHeaders.get("th:nth-child(4)").contains("Teléfono"); 
			columnHeaders.get("th:nth-child(7)").contains("Email"); 
			
			cy.get("table").get("tr:nth-child(2)").get("td:first").contains("1"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(2)").contains("Confecciones Cuzco"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(4)").contains("984653232"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(7)").contains("confcuzco@gmail.com"); 
		
		});

	
	});

	describe("Sales page", () => {
		beforeEach(() => {
			cy.contains("VENTAS").click();		
		});

		it("when page loads it shows the table with the sales information", () => {
			cy.location("href").should("contain","ventas");
			const columnHeaders = 	cy.get("table").get("tr:first");
			columnHeaders.get("th:first").contains("Código"); 
			columnHeaders.get("th:nth-child(2)").contains("Fecha"); 
			columnHeaders.get("th:nth-child(3)").contains("Orden Id"); 
			columnHeaders.get("th:nth-child(4)").contains("Estado"); 
			
			cy.get("table").get("tr:nth-child(2)").get("td:first").contains(1); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(2)").contains("2022-01-31"); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(3)").contains(1); 
			cy.get("table").get("tr:nth-child(2)").get("td:nth-child(4)").contains("completed"); 
		
		});

	
	});


})
