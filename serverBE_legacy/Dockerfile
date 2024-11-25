# Use an official Python runtime as a base image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements file into the image
COPY requirements.txt ./requirements.txt
COPY weather_dataset.csv ./weather_dataset.csv

# Install dependencies
RUN python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Flask app code into the container
COPY server.py ./

# Expose the port Flask will run on
EXPOSE 5000

# Command to run your server
CMD ["python", "server.py"]
