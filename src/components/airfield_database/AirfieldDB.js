import React, { useState } from 'react';

function AirfieldDB() {
    const [selectedAirfield, setSelectedAirfield] = useState(null);

    const airfields = [
        { id: 'A', name: "Airfield A", info: "This is airfield A." },
        { id: 'B', name: "Airfield B", info: "This is airfield B." },
        { id: 'C', name: "Airfield C", info: "This is airfield C." },
        { id: 'D', name: "Airfield D", info: "This is airfield D." },
        { id: 'E', name: "Airfield E", info: "This is airfield E." },
    ];

    const handleDropdownChange = (e) => {
        const selectedId = e.target.value;
        const selected = airfields.find(airfield => airfield.id === selectedId);
        setSelectedAirfield(selected);
    };

    return (
        <div>
            <h1>Airfield Database</h1>
            <select defaultValue="" onChange={handleDropdownChange}>
                <option value="" disabled>Select an Airfield</option>
                {airfields.map((airfield, index) => (
                    <option key={index} value={airfield.id}>
                        {airfield.name}
                    </option>
                ))}
            </select>

            {selectedAirfield && (
                <div>
                    <p>You have selected: {selectedAirfield.name}</p>
                    <p>Information: {selectedAirfield.info}</p>
                </div>
            )}
        </div>
    );
}

export default AirfieldDB;