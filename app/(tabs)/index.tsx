import { StyleSheet, Button, SafeAreaView, FlatList, Modal } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppState';
import { dismissDetail, fetchData } from '../../features/incidents/incidentsSlice';
import { useEffect, useState } from 'react';
import IncidentCard from '@/components/IncidentCard';
import IncidentFilter from '@/components/IncidentFilter';
import { Incident } from '@/models/models';
import IncidentStats from '@/components/IncidentStats';
import { commonStyles } from '@/components/CommonStyles';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { detail, data, loading, error } = useAppSelector((state) => state.incidents);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(data);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    setFilteredIncidents(data);
  }, [data]);

  useEffect(() => {
    if(detail !== null) {
      setModalVisible(true)
    }
    else {
      setModalVisible(false);
    }
  }, [detail]);

  const triggerDismiss = () => {  
    dispatch(dismissDetail());
  }

  const updateList = (incidents: Incident[]) => {
    setFilteredIncidents(incidents);
  };

  return (

    <SafeAreaView style={commonStyles.wrapper}>
      <ThemedView style={commonStyles.titleContainer}>
        <ThemedText type="title">Active Incidents</ThemedText>
      </ThemedView>

      {data && data.at(0) &&
        <IncidentFilter incidents={data} onFiltered={updateList}/>
      }
      <ThemedView style={commonStyles.container}>
        {loading && <ThemedText>Loading...</ThemedText>}
        {error && <ThemedText>{error}</ThemedText>}
        {data && data?.at(0) && 
          <FlatList
            data={filteredIncidents}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <IncidentCard key={item.id} incident={item} />}
          ></FlatList>
        }
      </ThemedView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={triggerDismiss}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalView}>
            {detail && <ThemedText style={styles.modalTitle}>{detail.street}</ThemedText>}
            {detail && <IncidentStats incident={detail} />}
            <Button title="Close" onPress={triggerDismiss} color="red" />
          </ThemedView>
        </ThemedView>
      </Modal>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  incidentsContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
    flex: 1,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  stepContainerSelected: {
    gap: 8,
    marginBottom: 8,
    borderColor: 'red',
    borderWidth: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});
