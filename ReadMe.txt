Remember to install python 3 and pip, then
pip install flask numpy

API Example:
# POST
#     http://127.0.0.1:5000/add
#     body{
#     "temperature": 22.5,
#     "precipitation": 5.2,
#     "windSpeed": 12.3
#     }
# GET
#     Get current date, return current condition if there is data for today, if not, return msg
#         http://127.0.0.1:5000/current

#     In param of URL, provide history_days and predict_days. If not provide history_days, return all data 
#         http://127.0.0.1:5000/get?history_days=10&predict_days=2
#         http://127.0.0.1:5000/get?history_days=&predict_days=2 -> get ALL data

#  PUT 
#     http://127.0.0.1:5000/update
#     body {
#     "date": "2024-11-24",
#     "temperature": 22.5,
#     "precipitation": 5.2,
#     "windSpeed": 12.3
#     }
