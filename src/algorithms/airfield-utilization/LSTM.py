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

def create_dataset():
    # This is where we would read in the test data
    # Things to consider: The lookback: if lookback = 5
    # input = [t_1, t_2, t_3, t_4, t_5] ----- output = [t_2, t_3, t_4, t_5, t_6]
    # Then you just stack a bunch of these guys to create the training and testing set
    return X_train, X_test, y_train, y_test



class LSTM_Predictor(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(input_size=LOOKBACK, hidden_size=HIDDEN_SIZE, num_layers=1, batch_first=True)
        self.linear = nn.Linear(HIDDEN_SIZE, 1)
    def forward(self, x):
        x, _ = self.lstm(x)
        x = self.linear(x)
        x = int(x)
        return x

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
        train_rmse = np.sqrt(loss_fn(y_pred, y_train))
        y_pred = model(X_test)
        test_rmse = np.sqrt(loss_fn(y_pred, y_test))
    print("Epoch %d: train RMSE %.4f, test RMSE %.4f" % (epoch, train_rmse, test_rmse))