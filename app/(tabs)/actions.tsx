import { StyleSheet, View, Button, SafeAreaView, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppState';
import { useEffect, useState } from 'react';
import { addPOCRecord, updateData } from '@/features/incidents/incidentsSlice';
import { CrewAssigned, Incident } from '@/models/models';
import AddPhoneNumber from '@/components/AddPhoneNumber';
import { commonStyles } from '@/components/CommonStyles';

export default function Actions() {
  const dispatch = useAppDispatch();
  const { selected, loading, error, pointsOfContact } = useAppSelector((state) => state.incidents);
  const [valid, setValid] = useState<boolean>(false);
  const employeeId = 1;

  useEffect(() => {
    validateSelected()
  }, [selected]);

  const crewDispatchedMessage = (item: Incident) => {
    // Here would be where we send an SMS to the customer
    const pointOfContact = { createdAt: Date().toString(), incidentId: item.id, action: 'crewDispatchedMessage', notes: 'Crews are on the way to your location.', employeeId: employeeId }
    dispatch(addPOCRecord(pointOfContact));
  };

  const assignCrew = (item:Incident) => {
    const crew: CrewAssigned = { id: 1, name: 'Fake Crew 1', district: 'Fake District', status: {code: 12, value: 'in-transit'}, assignedAt: Date().toString(), members: [], isLeadCrew: true };
    const withCrew: Incident = { ...item, crewsAssigned: [crew] };
    dispatch(updateData(withCrew));
  };

  const validateSelected = () => {
    if(selected.length === 0) setValid(false);
    const noNumber = selected.filter((item: Incident) => !item.contactPhone);
    if (noNumber.length === 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  }

  const smsSent = (item: Incident) => {
    const pocs = pointsOfContact.filter((poc) => poc.incidentId === item.id);
    const poc = pocs?.findIndex((poc) => poc.action === 'crewDispatchedMessage');
    return poc > -1 ? true : false;
  }

  return (
    <SafeAreaView style={commonStyles.wrapper}>
      <ThemedView style={commonStyles.titleContainer}>
        <ThemedText type="title">Incident Actions</ThemedText>
      </ThemedView>

      <ThemedView style={commonStyles.container}>
        {loading && <ThemedText>Loading...</ThemedText>}
        {error && <ThemedText>{error}</ThemedText>}
        {!selected.at(0) &&
          <ThemedText type="subtitle" style={{fontStyle: 'italic', fontSize: 12}}>Select Locations from first tab</ThemedText>
        }
        {selected && selected.at(0) && 
          <FlatList
            data={selected}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ThemedView key={item.id} style={commonStyles.card}>
              <ThemedText type="subtitle">{item.incidentAddress}</ThemedText>
              {item.contactPhone && 
              <ThemedText>{item.contactPhone}</ThemedText>
              }
              {item.crewsAssigned && item.crewsAssigned.at(0) && 
              <ThemedText>A Crew has been assigned</ThemedText>
              }
              {smsSent(item) && 
              <ThemedText>Customer SMS was sent</ThemedText>
              }
              
              {!item.contactPhone &&
              <View>
                <ThemedText>No Phone Number</ThemedText>
                <AddPhoneNumber incident={item}/>
              </View>
              }
              {item.contactPhone && !item.crewsAssigned?.at(0) && 
              <View>
                <Button title="Assign Crew" onPress={() => assignCrew(item)} />
              </View>
              }
              {item.contactPhone && item.crewsAssigned && item.crewsAssigned.at(0) && !smsSent(item) &&
              <View>
                <Button title="Send an SMS" onPress={() => crewDispatchedMessage(item)} />
              </View>
              }
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
});
