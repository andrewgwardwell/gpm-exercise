import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Incident } from '../models/models';

interface IncidentFilterProps {
  incidents: Incident[];
  onFiltered: (filteredIncidents: Incident[]) => void;
}

const IncidentFilter: React.FC<IncidentFilterProps> = ({ incidents, onFiltered }) => {
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const uniqueTowns = Array.from(new Set(incidents.map((incident) => incident.town))).sort();

  const handleFilterAndSort = () => {
    let filteredIncidents = incidents;
    // If a specific town is selected, filter by that town
    if (selectedTown) {
      filteredIncidents = filteredIncidents.filter(
        (incident) => incident.town === selectedTown
      );
    }
    onFiltered(filteredIncidents);
  };

  useEffect(() => {
    setSelectedTown(null);
  }, [incidents]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filter by Town:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedTown}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTown(itemValue || null)}
        >
          <Picker.Item key="all" label="All Towns" value="" />
          {uniqueTowns.map((town) => (
            <Picker.Item key={town} label={town} value={town} />
          ))}
        </Picker>
      </View>
      <Button title="Apply Filters" onPress={handleFilterAndSort} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50, // iOS has different height requirements
    width: '100%',
  },
});

export default IncidentFilter;
