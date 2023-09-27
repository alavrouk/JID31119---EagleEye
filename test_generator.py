import json
import random

iata_codes = ["ATL", "LAX", "ORD", "DFW", "DEN", "JFK", "SFO", "SEA", "MIA", "BOS"]

def generate_iata_code():
    """Generate a random IATA airport code from the list."""
    return random.choice(iata_codes)

def generate_airfield_mission_with_iata(num_entries=1):
    """Generate test data for airfield missions using IATA codes."""
    missions = []
    for _ in range(num_entries):
        mission = {
            "origin": generate_iata_code(),
            "destination": generate_iata_code(),
        }
        missions.append(mission)
    return missions

# Generate a sample of 5 airfield missions with IATA codes for demonstration
sample_missions_iata = generate_airfield_mission_with_iata(5)

file_path = "airfield_missions.json"

with open(file_path, 'w') as file:
    json.dump(sample_missions_iata, file, indent=4)
