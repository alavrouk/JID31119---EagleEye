import pandas as pd
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX
import pandas as pd
import numpy as np
from scipy.stats import truncnorm
from itertools import product

# https://www.youtube.com/watch?v=Al8m6K_stfA

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


def save_best_params():
    data = pd.read_csv('sample_data/sample.csv')

    # Define the range for each parameter
    p = d = q = range(0, 3)  # Example ranges, adjust as needed
    pdq = list(product(p, d, q))

    seasonal_pdq = [(x[0], x[1], x[2], 6) for x in list(product(p, d, q))]  # 6 for S_SEASONAL

    best_aic = np.inf
    best_pdq = None
    best_seasonal_pdq = None

    # Grid search over parameter space
    for param in pdq:
        for param_seasonal in seasonal_pdq:
            try:
                mod = SARIMAX(data['y'],
                            order=param,
                            seasonal_order=param_seasonal,
                            enforce_stationarity=False,
                            enforce_invertibility=False)

                results = mod.fit()
                if results.aic < best_aic:
                    best_aic = results.aic
                    best_pdq = param
                    best_seasonal_pdq = param_seasonal

            except:
                continue

    print(f"Best SARIMAX model: {best_pdq} x {best_seasonal_pdq} with AIC {best_aic}")
    return best_pdq, best_seasonal_pdq

def fit_sarimax(data=None):
    best_pdq = [0,1,1] # Determined from grid search
    best_seasonal_pdq = [2,0,2,6] # Determined from grid search
    model = SARIMAX(data['y'], 
                    order=best_pdq,
                    seasonal_order=best_seasonal_pdq,
                    enforce_stationarity=False,
                    enforce_invertibility=False)
    results = model.fit()
    forecast = results.get_forecast(steps=24)
    forecast_mean = forecast.predicted_mean
    return forecast_mean.index, forecast_mean

# # Forecasting with a shorter horizon
# forecast = results.get_forecast(steps=48)  # Adjust as needed
# forecast_mean = forecast.predicted_mean
# forecast_conf_int = forecast.conf_int()

# # Plotting
# plt.plot(data['y'], label='Observed')
# plt.plot(forecast_mean.index, forecast_mean, color='red', label='Forecast')
# plt.fill_between(forecast_conf_int.index,
#                  forecast_conf_int.iloc[:, 0],
#                  forecast_conf_int.iloc[:, 1], color='pink')
# plt.legend()
# plt.show()

# save_best_params()