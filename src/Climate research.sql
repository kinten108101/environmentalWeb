DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

-- DROP TABLE STATION CASCADE;
-- DROP TABLE EMPLOYEE CASCADE;
-- DROP TABLE PROVINCE CASCADE;
-- DROP TABLE REPORT CASCADE;
-- DROP TABLE COLLABORATION CASCADE;

-- DROP ROLE admin;
-- DROP ROLE manager;
-- DROP ROLE employee;
CREATE TABLE PROVINCE(
	Name		VARCHAR(100)	NOT NULL,
	PRIMARY KEY (Name)
);
CREATE TABLE STATION(
	ID			CHAR(5)					NOT NULL,
	Codename	INT							UNIQUE,
	PName		VARCHAR(100)				NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN KEY (PName) REFERENCES PROVINCE(Name) ON DELETE CASCADE 	ON UPDATE CASCADE
);

CREATE TABLE EMPLOYEE(
	SSN			INT				NOT NULL,
	FName		VARCHAR(50),
	Minit		VARCHAR(50),
	LName		VARCHAR(50),
	StationID			CHAR(5),	
	BDate		Date,			-- BONUS FROM ORIGINAL
	PhoneNumber		VARCHAR(50),
	
	PRIMARY KEY (SSN),
	FOREIGN KEY (StationID) REFERENCES STATION(ID) ON DELETE CASCADE 	ON UPDATE CASCADE
);

CREATE TABLE REPORT(
	UUID			INT				NOT NULL,
	Timestamp		Date,
	Temperature		FLOAT,					-- if have temp measure
	VeloX			FLOAT,					-- if have wind measure
	VeloY			FLOAT,
	VeloZ			FLOAT,
	eSSN			INT				NOT NULL,
	StationID		CHAR(5)				NOT NULL,
	PRIMARY KEY (UUID),
	FOREIGN KEY (eSSN) REFERENCES EMPLOYEE(SSN) ON DELETE CASCADE 	ON UPDATE CASCADE,
	FOREIGN KEY (StationID) REFERENCES STATION(ID) ON DELETE CASCADE 	ON UPDATE CASCADE
);

CREATE TABLE COLLABORATOR(
	Name		VARCHAR(100)	NOT NULL,
	Organizaion	VARCHAR(100),
	eSSN		INT				NOT NULL,
	PRIMARY KEY (Name, eSSN),
	FOREIGN KEY (eSSN) REFERENCES EMPLOYEE(SSN) ON DELETE CASCADE 	ON UPDATE CASCADE
);

-- -- ROLES
-- -- admin: Create table, add, modify and delete data
-- CREATE ROLE admin;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;

--  -- manager: Read and update data.
-- CREATE ROLE manager;
-- GRANT SELECT, UPDATE ON ALL TABLES IN SCHEMA public TO manager;

--  -- employee: Only read data.
-- CREATE ROLE employee;
-- GRANT SELECT ON ALL TABLES IN SCHEMA public TO employee;

-- ADD DATA
INSERT INTO PROVINCE VALUES
	('Ho Chi Minh'), ('Ha Noi'), ('Can Tho'), ('Da Nang');
INSERT INTO STATION VALUES
	('AAAAA', 0, 'Ho Chi Minh'), ('AAAAB', 1, 'Ho Chi Minh'), ('AAAAC', 2, 'Ho Chi Minh'), ('AAAAD', 3, 'Ho Chi Minh'),
	('AAAAE', 4, 'Ha Noi'), ('AAAAF', 5, 'Ha Noi'), ('AAAAG', 6, 'Ha Noi'), ('AAAAH', 7, 'Ha Noi'),
	('AAAAI', 8, 'Can Tho'), ('AAAAJ', 9, 'Can Tho'), ('AAAAK', 10, 'Can Tho'), ('AAAAL', 11, 'Can Tho'),
	('AAAAM', 12,'Da Nang'), ('AAAAN', 13, 'Da Nang'), ('AAAAO', 14, 'Da Nang'), ('AAAAP', 15, 'Da Nang');
INSERT INTO EMPLOYEE (SSN, FName, Minit, LName, StationID) VALUES
	(0, 'Phung', 'Gia Minh', 'Khoi', 'AAAAA'),
	(1, 'Le', 'Nguye Gia', 'Bao', 'AAAAB'),
	(2, 'Phan', 'Quang', 'Minh', 'AAAAC'),
	(3, 'Nguyen', 'Van', 'A', 'AAAAD'),
	(4, 'Nguyen', 'Van', 'B', 'AAAAE'),
	(5, 'Nguyen', 'Van', 'C', 'AAAAF'),
	(6, 'Nguyen', 'Van', 'D', 'AAAAG'),
	(7, 'Nguyen', 'Van', 'E', 'AAAAH'),
	(8, 'Nguyen', 'Van', 'F', 'AAAAI'),
	(9, 'Nguyen', 'Van', 'G', 'AAAAJ'),
	(10, 'Nguyen', 'Van', 'H', 'AAAAK'),
	(11, 'Nguyen', 'Van', 'I', 'AAAAL'),
	(12, 'Nguyen', 'Van', 'J', 'AAAAM'),
	(13, 'Nguyen', 'Van', 'K', 'AAAAN'),
	(14, 'Nguyen', 'Van', 'L', 'AAAAO'),
	(15, 'Nguyen', 'Van', 'M', 'AAAAP'),
	(16, 'Nguyen', 'Van', 'N', 'AAAAA'),
	(17, 'Nguyen', 'Van', 'O', 'AAAAB'),
	(18, 'Nguyen', 'Van', 'P', 'AAAAC'),
	(19, 'Nguyen', 'Van', 'Q', 'AAAAD'),
	(20, 'Nguyen', 'Van', 'R', 'AAAAE');
INSERT INTO REPORT (uuid, eSSN, StationID, Timestamp, Temperature, VeloX, VeloY, VeloZ) VALUES
	(0, 15, 'AAAAA', '2024-11-16', 37, 4, 5, 8), (1, 10, 'AAAAI', '2024-11-15', 32, 4, 5, 8),
	(16, 2, 'AAAAG', '2024-11-14', 36, NULL, NULL, NULL), (17, 7, 'AAAAI', '2024-11-15', NULL, 6, 4, 5),
	(18, 15, 'AAAAC', '2024-11-16', 29, NULL, NULL, NULL), (19, 10, 'AAAAB', '2024-11-15', 32, 4, 5, 8); 
INSERT INTO REPORT (uuid, eSSN, StationID) VALUES
	(2, 6, 'AAAAB'), (3, 13, 'AAAAJ'),
	(4, 7, 'AAAAC'), (5, 8, 'AAAAK'),
	(6, 2, 'AAAAD'), (7, 5, 'AAAAL'),
	(8, 1, 'AAAAE'), (9, 13, 'AAAAM'), 
	(10, 3, 'AAAAF'), (11, 9, 'AAAAN'),
	(12, 2, 'AAAAG'), (13, 11, 'AAAAO'), 
	(14, 14, 'AAAAH'), (15, 6, 'AAAAP');
INSERT INTO COLLABORATOR  VALUES
	('Nguyen Van B', 'HCMUT', 14), ('Nguyen Van C', 'HCMUT', 6), ('Nguyen Van D', 'HCMUT', 10),
	('Nguyen B', 'HCMUTE', 12), ('Nguyen C', 'HCMUTE', 8), ('Nguyen D', 'HCMUTE', 5),
	('Van B', 'HCMUE', 9), ('Van C', 'HCMUE', 4), ('Van D', 'HCMUE', 6),
	('B', 'HCMUS', 1), ('C', 'HCMUS', 2), ('D', 'HCMUS', 3);
-- TEST/SELECT DATA
-- SELECT *
-- 	FROM STATION;
-- DELETE DATA
-- DELETE FROM STATION CASCADE;
-- DELETE FROM EMPLOYEE CASCADE;
-- DELETE FROM PROVINCE CASCADE;
-- DELETE FROM REPORT CASCADE;
-- DELETE FROM COLLABORATION CASCADE;

-- CREATE VIEW emp_view AS
SELECT * 
FROM REPORT
	