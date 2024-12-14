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
	UUID			SERIAL				NOT NULL,
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

--DELETE FROM REPORT;
INSERT INTO REPORT (eSSN, StationID, Timestamp, Temperature, VeloX, VeloY, VeloZ) VALUES
	(15, 'AAAAA', '2024-11-16', 37, 4, 5, 8), (10, 'AAAAI', '2024-11-15', 32, 4, 5, 8),
	(2, 'AAAAG', '2024-11-14', 36, NULL, NULL, NULL), (7, 'AAAAI', '2024-11-15', NULL, 6, 4, 5),
	(15, 'AAAAC', '2024-11-16', 29, NULL, NULL, NULL), (10, 'AAAAB', '2024-11-15', 32, 4, 5, 8); 
INSERT INTO REPORT (eSSN, StationID) VALUES
	(6, 'AAAAB'), (13, 'AAAAJ'),
 	(7, 'AAAAC'), (8, 'AAAAK'),
	(2, 'AAAAD'), (5, 'AAAAL'),
	(1, 'AAAAE'), (13, 'AAAAM'), 
	(3, 'AAAAF'), (9, 'AAAAN'),
	(2, 'AAAAG'), (11, 'AAAAO'), 
	(14, 'AAAAH');
INSERT INTO COLLABORATOR  VALUES
	('Nguyen Van B', 'HCMUT', 14), ('Nguyen Van C', 'HCMUT', 6), ('Nguyen Van D', 'HCMUT', 10),
	('Nguyen B', 'HCMUTE', 12), ('Nguyen C', 'HCMUTE', 8), ('Nguyen D', 'HCMUTE', 5),
	('Van B', 'HCMUE', 9), ('Van C', 'HCMUE', 4), ('Van D', 'HCMUE', 6),
	('B', 'HCMUS', 1), ('C', 'HCMUS', 2), ('D', 'HCMUS', 3);

-- FUNCTION
CREATE OR REPLACE FUNCTION wind_calculate(r_id INTEGER)
	RETURNS FLOAT
	AS
	$body$
	DECLARE
		x FLOAT;
		y FLOAT;
		z FLOAT;
	BEGIN
		SELECT VeloX, VeloY, VeloZ INTO x, y, z	-- Get wind variables
		FROM REPORT AS R
		WHERE UUID = r_id;

		IF x IS NULL OR y IS NULL OR z IS NULL THEN
			--RAISE EXCEPTION 'Unable to calculate wind velocity. Wind variables are not entered.';
			RETURN 0;
		END IF;
		
		RETURN sqrt(x^2 + y^2 + z^2);
	END;
	$body$
	LANGUAGE plpgsql;
-- DROP FUNCTION wind_calculate(r_id INTEGER);
-- TEST
SELECT * FROM REPORT
	WHERE uuid = 3;
SELECT wind_calculate(3);	-- no wind
SELECT * FROM REPORT
	WHERE uuid = 1;
SELECT wind_calculate(1);	-- no wind


CREATE OR REPLACE FUNCTION report_in_day(_date DATE)
	RETURNS TABLE(
		o_Timestamp DATE,
		o_Station CHAR,
	 	o_temperature FLOAT,
		o_Wind_Velocity FLOAT
	)
	AS
	$body$
	BEGIN
		RETURN QUERY
			SELECT Timestamp, StationID, temperature, wind_calculate(UUID)
				FROM REPORT
				WHERE Timestamp = _date;
	END;
	$body$
	LANGUAGE plpgsql;
	
-- DROP FUNCTION report_in_day(_date DATE);
-- TEST
SELECT Timestamp, StationID AS Station, temperature, wind_calculate(UUID) AS Wind_Velocity
	FROM REPORT
	WHERE Timestamp = '2024-11-16';

SELECT * FROM report_in_day('2024-11-16');
-- SELECT wind_calculate(UUID) FROM REPORT;

-- RAISE NOTICE 'Value: %', deletedContactId;

-- TRIGGERS
CREATE OR REPLACE FUNCTION wind_variables_check()
	RETURNS TRIGGER
	AS
	$body$
	DECLARE
		x FLOAT;
		y FLOAT;
		z FLOAT;
		other_var BOOLEAN;
	BEGIN
		SELECT VeloX, VeloY, VeloZ INTO x, y, z	-- Get wind variables
		FROM REPORT AS R
		WHERE UUID = new.UUID;

		-- allow both 3 are null or has value	
		IF x IS NULL AND y IS NULL AND z IS NULL THEN	-- if no wind
			RETURN NULL;
		ELSIF x IS NOT NULL AND y IS NOT NULL AND z IS NOT NULL THEN	-- if have wind
			RETURN NULL;
		ELSE
			RAISE 'Unable to store data. Wind variables are not properly entered.';
		END IF;
	END;
	$body$
	LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_wind_variables_check
	AFTER INSERT OR UPDATE OF VeloX, VeloY, VeloZ
	ON REPORT
	FOR EACH ROW
	EXECUTE FUNCTION wind_variables_check();

call create_report(0, 'AAAAB', 27, 8, 5, NULL);
call create_report(0, 'AAAAB', 27, NULL, NULL, NULL);

-- CREATE PROCEDURE: for staff to update their information
CREATE OR REPLACE PROCEDURE update_employee_data(
	IN_SSN INTEGER,
	IN_BDate Date,
	IN_PhoneNumber	CHAR
)
AS
$body$
	BEGIN
		IF IN_BDate IS NOT NULL THEN		-- Only allow update, not delete
			UPDATE EMPLOYEE
			SET BDate = IN_BDate
			WHERE SSN = IN_SSN;
		END IF;
		IF IN_PhoneNumber IS NOT NULL THEN
			UPDATE EMPLOYEE
			SET PhoneNumber = IN_PhoneNumber
			WHERE SSN = IN_SSN;
		END IF;
	END;
$body$
LANGUAGE plpgsql;
-- TEST
CALL update_employee_data(5, '1965-7-23', '0902378589');
SELECT *
	FROM EMPLOYEE
	WHERE SSN = 5;

-- PROCEDURE: to write report
CREATE OR REPLACE PROCEDURE create_report(
	_emp INTEGER,		-- SSN
	_station CHAR,
	_temp INTEGER,
	_veloX FLOAT,
	_veloY FLOAT,
	_veloZ FLOAT
)
AS
$body$
	BEGIN
		INSERT INTO REPORT (timestamp, eSSN, StationID, Temperature, VeloX, VeloY, VeloZ) VALUES
			(current_date, _emp, _station, _temp, _veloX, _veloY, _veloZ);
	END;
$body$
LANGUAGE plpgsql;
-- TEST
call create_report(0, 'AAAAE', 27, 8, 5, 12);

SELECT * FROM REPORT WHERE essn = 0;
-- DELETE FROM REPORT
-- 	WHERE uuid = 23;
		-- SELECT VeloX, VeloY, VeloZ	-- Get wind variables
		-- FROM REPORT AS R
		-- WHERE UUID = 23;



-- INDEX
SELECT COUNT(*) FROM REPORT;

CREATE INDEX report_idx
	ON REPORT(StationID);

DROP INDEX report_idx;

SELECT * FROM REPORT WHERE StationID = 'AAAAG';