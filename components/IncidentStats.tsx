import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Incident, PointOfContact } from '../models/models'; // Adjust the path as needed
import { Collapsible } from './Collapsible';
import { useAppSelector } from '@/hooks/useAppState';
import { ThemedText } from './ThemedText';

interface IncidentStatsProps {
  incident: Incident;
}

const IncidentStats: React.FC<IncidentStatsProps> = ({ incident }) => {
  const { pointsOfContact } = useAppSelector((state) => state.incidents);
  const filteredHistory = pointsOfContact.filter((poc: PointOfContact) => poc.incidentId === incident.id);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Incident ID: {incident.id}</Text>
      <Text style={styles.detail}>Status: {incident.status.value}</Text>
      <Text style={styles.detail}>Street: {incident.street}</Text>
      <Text style={styles.detail}>Town: {incident.town}</Text>
      <Text style={styles.detail}>County: {incident.county}</Text>
      <Text style={styles.detail}>District: {incident.district}</Text>
      <Text style={styles.detail}>Contact Phone: {incident.contactPhone}</Text>
      <Collapsible title="History">
        {!filteredHistory.at(0) && <ThemedText>No history available</ThemedText>}
        {filteredHistory.at(0) && filteredHistory.map((poc: PointOfContact, idx) => (
          <View style={styles.historyRow} key={idx}>
            <Text style={styles.detailBold}>Action: {poc.action}</Text>
            <Text style={styles.detail}>Notes: {poc.notes}</Text>
            <Text style={styles.detail}>Employee ID: {poc.employeeId}</Text>
            <Text style={styles.detail}>Created At: {new Date(poc.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </Collapsible>
      <Collapsible title="Additional Information">
        <Text style={styles.detail}>Active: {incident.isActive ? 'Yes' : 'No'}</Text>
        <Text style={styles.detail}>Critical: {incident.isCritical ? 'Yes' : 'No'}</Text>
        <Text style={styles.detail}>Planned: {incident.isPlanned ? 'Yes' : 'No'}</Text>
        <Text style={styles.detail}>Confirmed: {incident.isConfirmed ? 'Yes' : 'No'}</Text>
        <Text style={styles.detail}>Customer Count: {incident.customerCount}</Text>
        <Text style={styles.detail}>Critical Customers: {incident.criticalCustomerCount}</Text>
        <Text style={styles.detail}>Substation: {incident.substation}</Text>
        <Text style={styles.detail}>Feeder: {incident.feeder}</Text>
        <Text style={styles.detail}>Cause: {incident.cause.value}</Text>
        <Text style={styles.detail}>Weather: {incident.weather.value}</Text>
        <Text style={styles.detail}>Trouble: {incident.trouble.value}</Text>
        <Text style={styles.detail}>Device Type: {incident.deviceType.value}</Text>
        <Text style={styles.detail}>Taglet: {incident.taglet}</Text>
        <Text style={styles.detail}>Line Pole: {incident.linePole}</Text>
        <Text style={styles.detail}>
          Estimated Restored At: {incident.estimatedRestoredAt ? incident.estimatedRestoredAt : 'N/A'}
        </Text>
        <Text style={styles.detail}>Duration Minutes: {incident.durationMinutes}</Text>
        <Text style={styles.detail}>
          Created At: {new Date(incident.createdAt).toLocaleString()}
        </Text>
        <Text style={styles.detail}>
          Modified At: {incident.modifiedAt ? new Date(incident.modifiedAt).toLocaleString() : 'N/A'}
        </Text>


        <Text style={styles.subtitle}>Crews Assigned:</Text>
        {!incident.crewsAssigned && <ThemedText>No crews assigned</ThemedText>}
        {incident.crewsAssigned && incident.crewsAssigned.at(0) && incident.crewsAssigned.map((crew: any) => (
          <View key={crew.id} style={styles.crewContainer}>
            <Text style={styles.crewDetail}>Crew ID: {crew.id}</Text>
            <Text style={styles.crewDetail}>District: {crew.district}</Text>
            <Text style={styles.crewDetail}>Status: {crew.status.value}</Text>
            <Text style={styles.crewDetail}>
              Assigned At: {new Date(crew.assignedAt).toLocaleString()}
            </Text>
            <Text style={styles.crewDetail}>
              Lead Crew: {crew.isLeadCrew ? 'Yes' : 'No'}
            </Text>
          </View>
        ))}
      </Collapsible>




    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  detailBold: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  historyRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderStyle: 'solid',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  crewContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  crewDetail: {
    fontSize: 16,
  },
});

export default IncidentStats;
