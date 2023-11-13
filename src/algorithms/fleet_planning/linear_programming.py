import numpy as np
from scipy.optimize import linprog

# Number of origins and destinations
n = 100
m = 100

# Generate random data for the example
np.random.seed(42)  # for reproducibility

# Time matrix (time taken in hours) - random values between 1 and 10
time_matrix = np.random.randint(1, 11, size=(n, m))

# Supply (number of planes at origins) - random values between 1 and 5
supply = np.random.randint(1, 6, size=n)

# Adjust the total demand to match the total supply
total_planes = np.sum(supply)
average_demand = total_planes // m
remaining_planes = total_planes - average_demand * m

# Set the demand for most destinations to the average value
demand = np.full(m, average_demand)

# Distribute the remaining planes among some of the destinations
demand[:remaining_planes] += 1

# Objective function coefficients (minimize total time)
c = time_matrix.flatten()

# Supply constraints (planes leaving each origin)
A_eq_supply = np.zeros((n, n*m))
for i in range(n):
    A_eq_supply[i, i*m:i*m+m] = 1

# Demand constraints (planes arriving at each destination)
A_eq_demand = np.zeros((m, n*m))
for i in range(m):
    A_eq_demand[i, i::m] = 1

# Combine supply and demand constraints
A_eq = np.vstack([A_eq_supply, A_eq_demand])
b_eq = np.hstack([supply, demand])

# Solve the linear programming problem
res = linprog(c, A_eq=A_eq, b_eq=b_eq, method='highs')

# Print the results
print(res)
print(res.message)
print(res.x)
print("Optimal total time:", res.fun)
