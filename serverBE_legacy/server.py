from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import csv
import os
from datetime import datetime, timedelta
import numpy as np

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'

# Define the CSV file path
CSV_FILE = "weather_dataset.csv"

# Ensure the CSV file exists
if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["date", "temperature", "precipitation", "windSpeed"])

# Helper functions
def read_csv_data():
    """Read all records from the CSV file."""
    data = []
    with open(CSV_FILE, mode="r") as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append({
                "date": row["date"],
                "temperature": float(row["temperature"]),
                "precipitation": float(row["precipitation"]),
                "windSpeed": float(row["windSpeed"])
            })
    return data

def write_csv_data(data):
    """Overwrite the CSV file with updated data."""
    with open(CSV_FILE, mode="w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["date", "temperature", "precipitation", "windSpeed"])
        for record in data:
            writer.writerow([record["date"], record["temperature"], record["precipitation"], record["windSpeed"]])

def append_to_csv(record):
    """Append a new record to the CSV file."""
    with open(CSV_FILE, mode="a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([record["date"], record["temperature"], record["precipitation"], record["windSpeed"]])

# Routes
@app.route("/add", methods=["POST"])
def add_data():
    try:
        # Parse new data from the request
        new_data = request.json
        required_keys = {"temperature", "precipitation", "windSpeed"}
        if not required_keys.issubset(new_data):
            return jsonify({"status": "error", "message": "Invalid data format"}), 400
        
        # Read the existing data to determine the next date
        data = read_csv_data()
        today = datetime.strptime(datetime.today().strftime('%Y-%m-%d'), "%Y-%m-%d")
        last_date = datetime.strptime(data[-1]["date"], "%Y-%m-%d") if data else today

        next_date = last_date + timedelta(days=1) \
            if last_date < today else today
        if last_date == today: 
            return jsonify({"status": "error", "message": "Current date is added, use update instead"}), 400

        # Prepare the new data with the next date
        record = {
            "date": next_date.strftime('%Y-%m-%d'),
            "temperature": float(new_data["temperature"]),
            "precipitation": float(new_data["precipitation"]),
            "windSpeed": float(new_data["windSpeed"]),
        }

        # Append the new record to the CSV
        append_to_csv(record)

        return jsonify({"status": "success", "message": "Data added successfully", "record": record}), 201
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/update", methods=["PUT"])
def update_record():
    """Update the weather data for a specific date."""
    try:
        data = read_csv_data()
        update_date = request.json.get("date")
        updated_values = {key: request.json.get(key) for key in ["temperature", "precipitation", "windSpeed"] if key in request.json}
        
        if not update_date or not updated_values:
            return jsonify({"status": "error", "message": "Invalid request data"}), 400
        
        # Find and update the record
        record_found = False
        for record in data: # Dont have SQL DB!!
            if record["date"] == update_date: 
                record.update(updated_values)
                record_found = True
                break
        
        if not record_found:
            return jsonify({"status": "error", "message": "Date not found in dataset"}), 404
        
        # Write updated data back to the CSV
        write_csv_data(data)
        return jsonify({"status": "success", "message": "Record updated successfully", "updated_record": record}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/current", methods=["GET"])
@cross_origin()
def get_current():
    """Retrieve the weather data for the current date."""
    try:
        data = read_csv_data()
        if not data:
            return jsonify({"status": "error", "message": "No data available"}), 404
        
        # Get the newest record
        newest_record = data[-1]
        current_date = datetime.now().strftime("%Y-%m-%d")
        
        if newest_record["date"] != current_date:
            return jsonify({"status": "error", "message": "Newest record is not today's date"}), 400
        
        return jsonify({"status": "success", "data": newest_record}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/get", methods=["GET"])
def get_data():
    """Retrieve historical and predicted weather data."""
    try:
        data = read_csv_data()

        # Determine history_days and predict_days
        history_days = request.args.get("history_days")

        history_days = len(data) if not history_days else int(history_days)
        predict_days = int(request.args.get("predict_days", 30))
        if len(data) < history_days:
            return jsonify({"status": "error", "message": "Not enough historical data available"}), 400

        history_data = data[-history_days:]
        predictions = predict_future(history_data, predict_days)
        response = {
            "data": {
                "history": {
                    "unit": {
                        "temperature": "Celsius",
                        "precipitation": "mm",
                        "windSpeed": "km/h"
                    },
                    "records": history_data
                },
                "prediction": {
                    "unit": {
                        "temperature": "Celsius",
                        "precipitation": "mm",
                        "windSpeed": "km/h"
                    },
                    "forecasts": [
                        {
                            "timestamp": (datetime.strptime(history_data[-1]["date"], "%Y-%m-%d") + timedelta(days=i + 1)).strftime("%Y-%m-%d"),
                            "temperature": round(predictions["temperature"][i], 1),
                            "precipitation": round(predictions["precipitation"][i], 1),
                            "windSpeed": round(predictions["windSpeed"][i], 1)
                        } for i in range(predict_days)
                    ]
                }
            }
        }
        return jsonify(response), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

def predict_future(data, num_days):
    """Generate simple predictions for weather data."""
    timestamps = np.arange(len(data))
    predictions = {"temperature": [], "precipitation": [], "windSpeed": []}

    for key in ["temperature", "precipitation", "windSpeed"]:
        values = np.array([d[key] for d in data])
        coef = np.polyfit(timestamps, values, 1)
        poly = np.poly1d(coef)
        future_timestamps = np.arange(len(data), len(data) + num_days)
        predictions[key] = poly(future_timestamps).tolist()

    return predictions

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
