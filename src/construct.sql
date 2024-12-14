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