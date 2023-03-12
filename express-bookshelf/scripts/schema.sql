CREATE TABLE booking.hotels (
	id INT auto_increment NOT NULL,
	name varchar(100) NULL,
	address varchar(100) NULL,
	CONSTRAINT hotels_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;