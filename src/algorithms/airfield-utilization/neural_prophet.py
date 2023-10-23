from neuralprophet import NeuralProphet
import datetime
import pandas as pd
import numpy as np

def createData():
    # Sample data creation function: Generates a time-value DataFrame
    # This is a placeholder and you can replace it with your actual data creation logic
    return df

df = createData()
model = NeuralProphet()
model.fit(df, freq='H')

current_time = datetime.datetime.now()
num_predictions = 24
start_time = current_time
future_time_stamps = [start_time]
for i in range(1, num_predictions + 1):
    future_time_stamps.append(start_time + datetime.timedelta(hours=i))
future = pd.DataFrame({'ds': future_time_stamps, 'y': [None] * len(future_time_stamps)})
forecast = model.predict(future)