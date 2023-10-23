import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX


# https://www.youtube.com/watch?v=Al8m6K_stfA

P = 1 # autoregressive order, or the number of previosu time steps used to predict the current timestep
D = 1 # differencing order, or the amount of differencing added to the data to make it stationary
Q = 1 # MA order, the error of the moving average, or how many terms of the error lag polynomial are included
P_SEASONAL = 1
D_SEASONAL = 1         # these 3 are the seasonal version of the above
Q_SEASONAL = 1
S_SEASONAL = 365 * 24 # seasonal periodicity

def preprocess_data():
    pass
    # Here, we just have to put our stuff into a pd dataframe


data = preprocess_data()

model = SARIMAX(data['WHATEVER'], 
                order=(P, D, Q), # (p,d,q), where p = AR order, or the number of previous time steps used to predict the current timesetp. d = differencing order, q = terms of error in the polynomial 
                seasonal_order=(P_SEASONAL, D_SEASONAL, Q_SEASONAL, S_SEASONAL),
                enforce_stationarity=False,
                enforce_invertibility=False) #ignore the boolean parameters for now

results = model.fit()

forecast = results.get_forecast(steps=12)
forecast_mean = forecast.predicted_mean
forecast_conf_int = forecast.conf_int()

plt.plot(data['WHATEVER'], label='observed')
plt.plot(forecast_mean.index, forecast_mean, color='red', label='forecast')
plt.fill_between(forecast_conf_int.index,
                 forecast_conf_int.iloc[:, 0],
                 forecast_conf_int.iloc[:, 1], color='pink')
plt.legend()
plt.show()