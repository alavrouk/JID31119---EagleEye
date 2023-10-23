import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
import torch.utils.data as data

LOOKBACK = 5
HIDDEN_SIZE = 50
NUM_EPOCHS = 200
BATCH_SIZE = 32

def generate_time_series(length, freq=0.1):
    x = np.arrange(length)
    y = np.sin(freq * x) * 10 + np.random.normal(scale=1, size=length) + 15
    y = np.clip(y, 0, None)
    return y.round().astype(int)

def generate_airfield_data():
    # This is where we would read in the test data
    # Things to consider: The lookback: if lookback = 5
    # input = [t_1, t_2, t_3, t_4, t_5] ----- output = [t_2, t_3, t_4, t_5, t_6]
    # Then you just stack a bunch of these guys to create the training and testing set
    airfields = ["DEN", "ATL", "ORD"]
    timestamps = ["{:02d}00".format(i) for i in range(24)]

    airfield_data = {}
    for airfield in airfields:
        airfield_data[airfield] = generate_time_series(len(timestamps))

    return airfield_data

def split_data(data, ratio=0.8):
    split_idx = int(len(data) * ratio)
    return data[:split_idx], data[split_idx:]


def format_data(data, look_back=3):
    x, y = [], []
    for i in range(len(data) - look_back):
        x.append(data[i:i+look_back])
        y.append(data[i+1:i+look_back+1])
    return np.array(x), np.array(y)


class LSTM_Predictor(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(input_size=LOOKBACK, hidden_size=HIDDEN_SIZE, num_layers=1, batch_first=True)
        self.linear = nn.Linear(HIDDEN_SIZE, LOOKBACK)
    def forward(self, x):
        x, _ = self.lstm(x)
        x = self.linear(x)
        x = int(x)
        return x

def train(X_train, y_train, X_test, y_test):
    model = LSTM_Predictor()
    optimizer = optim.Adam(model.parameters())
    loss_fn = nn.MSELoss()
    loader = data.DataLoader(data.TensorDataset(X_train, y_train), shuffle=True, batch_size=BATCH_SIZE)

    n_epochs = NUM_EPOCHS
    for epoch in range(n_epochs):
        model.train()
        # Training
        for X_batch, y_batch in loader:
            y_pred = model(X_batch)
            loss = loss_fn(y_pred, y_batch)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        # Validation
        if epoch % 100 != 0:
            continue
        model.eval()
        with torch.no_grad():
            y_pred = model(X_train)
            train_rmse = torch.sqrt(loss_fn(y_pred, y_train))
            y_pred = model(X_test)
            test_rmse = torch.sqrt(loss_fn(y_pred, y_test))
        print("Epoch %d: train RMSE %.4f, test RMSE %.4f" % (epoch, train_rmse, test_rmse))


airfield_data = generate_airfield_data()
for airfield, data in airfield_data.items():
    X, Y = format_data(data, look_back=LOOKBACK)
    X_train_np, X_test_np = split_data(X)
    y_train_np, y_test_np = split_data(Y)
    
    X_train = torch.FloatTensor(X_train_np)
    y_train = torch.FloatTensor(y_train_np)
    X_test = torch.FloatTensor(X_test_np)
    y_test = torch.FloatTensor(y_test_np)

    train(X_train, y_train, X_test, y_test)