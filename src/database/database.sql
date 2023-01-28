CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
	total_price REAL NOT NULL,
	created_at TEXT DEFAULT (DATETIME()) NOT NULL,
	paid INTEGER DEFAULT (0) NOT NULL
);

CREATE TABLE products (
	id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
	price REAL NOT NULL,
	description TEXT NOT NULL,
	image_url TEXT NOT NULL
);

CREATE TABLE purchases_products (
   		purchase_id TEXT NOT NULL,
		product_id TEXT NOT NULL,
		quantify INTEGER NOT NULL,
		FOREIGN KEY (purchase_id) REFERENCES purchases (id),
		FOREIGN KEY (product_id) REFERENCES products (id)
);



INSERT INTO users (id, name, email, password)
VALUES
	("f001", "Maria Silva", "MariaSilva@email.com", "1234123"),
	("f002", "José Rodrigues", "JoséRodrigues@email.com", "425cf32"),
	("f003", "Ana Garcia", "AnaGarcia@email.com", "fulano123"),
	("f004", "Carlos Oliveira", "CarlosOliveira@email.com", "4213sf"),
	("f005", "Juliana Santos", "JulianaSantos@email.com", "4215435f"),
	("f006", "Fernando Lima", "FernandoLima@email.com", "434323gv");

INSERT INTO purchases (id, buyer, total_price)
VALUES
	("pur001", "f001", 40.97),
	("pur002", "f002", 150),
	("pur003", "f003", 500 ),
	("pur004", "f004", 10);
	
INSERT INTO products(id, name, price, description, image_url)
VALUES
	("p01", "Arroz", 15.99, "arroz joão feliz", "http://www.pudim.com.br/pudim.jpg"),
	("p02", "batata feliz", 5.00, "que batata", "http://www.pudim.com.br/pudim.jpg"),
	("p03", "Feijão", 8.99, "Feijão preto orgânico", "http://www.produtos.com/feijao.jpg"),
	("p04", "Macarrão", 4.50, "Macarrão de trigo integral", "http://www.produtos.com/macarrao.jpg"),
	("p05", "Açúcar", 3.99, "Açúcar mascavo orgânico", "http://www.produtos.com/acucar.jpg"),
	("p06", "Leite", 2.99, "Leite orgânico integral", "http://www.produtos.com/leite.jpg"),
	("p07", "Café", 8.99, "Café torrado e moído", "http://www.produtos.com/cafe.jpg"),
	("p08", "Carne", 15.99, "Carne bovina orgânica", "http://www.produtos.com/carne.jpg"),
	("p09", "Frango", 12.99, "Frango orgânico", "http://www.produtos.com/frango.jpg"),
	("p10", "Peixe", 18.99, "Peixe fresco orgânico", "http://www.produtos.com/peixe.jpg"),
	("p11", "Ovos", 4.99, "Ovos orgânicos", "http://www.produtos.com/ovos.jpg"),
	("p12", "Pão", 3.99, "Pão integral orgânico", "http://www.produtos.com/pao.jpg");
	
INSERT INTO purchases_products(purchase_id, product_id, quantify)
VALUES
	("pur001", "p01", 1), 
	("pur001", "p02", 1),
	("pur001", "p08", 1),
	("pur002", "p06", 2),
	("pur002", "p11", 1),
	("pur003", "p04", 1),
	("pur003", "p09", 2);


SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM purchases_products;
SELECT * FROM purchases;

DROP TABLE purchases;