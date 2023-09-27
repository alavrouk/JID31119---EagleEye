import json
import random

# Mapping of IATA airport codes to their coordinates (latitude, longitude)
airport_coordinates = {
    "ATL": (33.6407, -84.4277),
    "LAX": (33.9428, -118.4085),
    "ORD": (41.9742, -87.9073),
    "DFW": (32.8968, -97.0381),
    "DEN": (39.8561, -104.6737),
    "JFK": (40.6413, -73.7781),
    "SFO": (37.7749, -122.4194),
    "SEA": (47.4502, -122.3088),
    "MIA": (25.7617, -80.1918),
    "BOS": (42.3601, -71.0589)
}

def generate_iata_code():
    return random.choice(list(airport_coordinates.keys()))

def generate_airfield_mission_with_coords(num_entries=1):
    """Generate test data for airfield missions using IATA codes and coordinates."""
    missions = []
    for _ in range(num_entries):
        origin = generate_iata_code()
        destination = generate_iata_code()
        mission = {
            "origin": origin,
            "origin_coordinates": airport_coordinates[origin],
            "destination": destination,
            "destination_coordinates": airport_coordinates[destination],
        }
        missions.append(mission)
    return missions

# Generating test data for airfield missions using IATA codes and coordinates
missions_data = generate_airfield_mission_with_coords(5)

# Save the generated test data to a JSON file
test_data_file_path = "airfield_missions_data.json"
with open(test_data_file_path, 'w') as file:
    json.dump(missions_data, file, indent=4)

test_data_file_path
