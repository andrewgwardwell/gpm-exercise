
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppSelector } from '@/hooks/useAppState';
import { PointOfContact } from '@/models/models';
import { commonStyles } from '@/components/CommonStyles';

export default function History() {
  const {loading, error, pointsOfContact } = useAppSelector((state) => state.incidents);

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ThemedView style={commonStyles.titleContainer}>
        <ThemedText type="title">Incidents History</ThemedText>
      </ThemedView>
      <ThemedView style={commonStyles.container}>
        {loading && <ThemedText>Loading...</ThemedText>}
        {error && <ThemedText>{error}</ThemedText>}
        {!pointsOfContact.at(0) && <ThemedText type="subtitle">No Points of contact</ThemedText>}
        {pointsOfContact.at(0) && 
          <FlatList
            data={pointsOfContact}
            keyExtractor={(item, idx) => idx.toString()}
            renderItem={({ item }) => (
            <ThemedView style={commonStyles.card}>
              <ThemedText type="subtitle" style={styles.dateText}>{new Date(item.createdAt).toLocaleString()}</ThemedText>
              <ThemedText type="subtitle" style={styles.notesText}>{item.notes}</ThemedText>
              <ThemedText type="subtitle" style={styles.actionText}>{item.action}</ThemedText>
              <ThemedText type="subtitle" style={styles.incidentText}>Incident ID: {item.incidentId}</ThemedText>
            </ThemedView>
            )}
          ></FlatList>
        }
      </ThemedView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notesText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#007bff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  incidentText: {
    fontSize: 14,
    color: '#999',
  },
  noContactsText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
