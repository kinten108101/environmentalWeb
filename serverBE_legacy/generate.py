import random
import json, csv
from datetime import datetime, timedelta

# def generate_dataset(start_date, end_date, output_file):
#     # Parse start and end dates
#     start = datetime.strptime(start_date, "%Y-%m-%d")
#     end = datetime.strptime(end_date, "%Y-%m-%d")
    
#     # Initialize dataset
#     dataset = {
#         "status": "success",
#         "data": {
#             "history": {
#                 "unit": {
#                     "temperature": "Celsius",
#                     "precipitation": "mm",
#                     "windSpeed": "km/h"
#                 },
#                 "records": []
#             }
#         }
#     }
    
#     # Generate data for each date in range
#     current_date = start
#     while current_date <= end:
#         record = {
#             "timestamp": current_date.strftime("%Y-%m-%dT%H:%M:%SZ"),
#             "temperature": round(random.uniform(15, 45), 1),
#             "precipitation": round(random.uniform(0, 10), 1),
#             "windSpeed": round(random.uniform(0, 50), 1)
#         }
#         dataset["data"]["history"]["records"].append(record)
#         current_date += timedelta(days=1)  # Increment date by 1 day
    
#     # Write dataset to JSON file
#     with open(output_file, "w") as file:
#         json.dump(dataset, file, indent=4)
#     print(f"Dataset successfully saved to {output_file}")


def generate_csv_dataset(start_date, end_date, output_file):
    # Parse start and end dates
    start = datetime.strptime(start_date, "%Y-%m-%d")
    end = datetime.strptime(end_date, "%Y-%m-%d")
    
    # Open CSV file for writing
    with open(output_file, mode="w", newline="") as file:
        writer = csv.writer(file)
        
        # Write header row
        writer.writerow(["date", "temperature", "precipitation", "windSpeed"])
        
        # Generate data for each date in range
        current_date = start
        while current_date <= end:
            # Generate random values for temperature, precipitation, and wind speed
            temperature = round(random.uniform(15, 45), 1)
            precipitation = round(random.uniform(0, 10), 1)
            wind_speed = round(random.uniform(0, 50), 1)
            
            # Write row to CSV
            writer.writerow([current_date.strftime("%Y-%m-%d"), temperature, precipitation, wind_speed])
            
            # Increment date by 1 day
            current_date += timedelta(days=1)
    
    print(f"Dataset successfully saved to {output_file}")

# Define parameters
start_date = "2021-01-01"
end_date = "2024-11-24"
output_file = "weather_dataset.csv"

# Generate dataset
generate_csv_dataset(start_date, end_date, output_file)
# generate_dataset(start_date, end_date, output_file)
