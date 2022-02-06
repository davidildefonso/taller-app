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
		cy.contains('sales works!');

		cy.contains('Acciones');
		cy.contains('Ayuda');
		cy.contains('Soporte técnico');
	});

	it("Navigates to the inventory page", () => {
		cy.contains("INVENTARIO").click();
		cy.location("href").should("contain","inventario");
		cy.contains('inventory works!');

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
		cy.contains('providers works!');

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


})
