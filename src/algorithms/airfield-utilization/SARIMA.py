import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
import pandas as pd
import numpy as np
from scipy.stats import truncnorm


# https://www.youtube.com/watch?v=Al8m6K_stfA

P = 5 # autoregressive order, or the number of previosu time steps used to predict the current timestep
D = 1 # differencing order, or the amount of differencing added to the data to make it stationary
Q = 5 # MA order, the error of the moving average, or how many terms of the error lag polynomial are included
P_SEASONAL = 5
D_SEASONAL = 1    # these 3 are the seasonal version of the above
Q_SEASONAL = 5
S_SEASONAL = 6 # seasonal periodicity



def create_timeseries_dataframe(fp=None):
    if fp is None:
        date_range = pd.date_range(start='2022-01-01', end='2022-04-11', freq='H')
        
        # Create a periodic signal
        x = np.linspace(0, 2 * np.pi, len(date_range))
        y_points = np.sin(x) + 0.5 * np.sin(4 * x) + 0.25 * np.sin(8 * x)
        
        # Add Gaussian noise to the signal
        noise = np.random.normal(0, 0.1, len(date_range))
        y_points += noise
        
        # Scale the signal for better visualization
        y_points = (y_points - y_points.min()) / (y_points.max() - y_points.min())
        
        return pd.DataFrame({'ds': date_range, 'y': y_points})


data = create_timeseries_dataframe()

model = SARIMAX(data['y'], 
                order=(P, D, Q), # (p,d,q), where p = AR order, or the number of previous time steps used to predict the current timesetp. d = differencing order, q = terms of error in the polynomial 
                seasonal_order=(P_SEASONAL, D_SEASONAL, Q_SEASONAL, S_SEASONAL),
                enforce_stationarity=False,
                enforce_invertibility=False) #ignore the boolean parameters for now

results = model.fit()

forecast = results.get_forecast(steps=1000)
forecast_mean = forecast.predicted_mean
forecast_conf_int = forecast.conf_int()

plt.plot(data['y'], label='observed')
plt.plot(forecast_mean.index, forecast_mean, color='red', label='forecast')
plt.fill_between(forecast_conf_int.index,
                 forecast_conf_int.iloc[:, 0],
                 forecast_conf_int.iloc[:, 1], color='pink')
plt.legend()
plt.show()