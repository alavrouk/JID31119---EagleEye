from neuralprophet import NeuralProphet
import datetime
import pandas as pd
import numpy as np
from scipy.stats import truncnorm

def create_timeseries_dataframe(fp=None):
    if fp is None:
        date_range = pd.date_range(start='2022-01-01', end='2023-04-11', freq='H')
        
        # Create a periodic signal
        x = np.linspace(0, 2 * np.pi, len(date_range))
        y_points = np.sin(x) + 0.5 * np.sin(4 * x) + 0.25 * np.sin(8 * x)
        
        # Add Gaussian noise to the signal
        noise = np.random.normal(0, 0.1, len(date_range))
        y_points += noise
        
        # Scale the signal for better visualization
        y_points = (y_points - y_points.min()) / (y_points.max() - y_points.min())
        
        return pd.DataFrame({'ds': date_range, 'y': y_points})
    

df = create_timeseries_dataframe()
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