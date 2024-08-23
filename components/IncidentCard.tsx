import { Incident } from '@/models/models';
import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppState';
import { cloneAndSelectItem, removeSelectedItem, viewDetail } from '@/features/incidents/incidentsSlice';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { commonStyles } from './CommonStyles';

const IncidentCard: React.FC<{incident: Incident}> = ({incident:item}) => {
  const dispatch = useAppDispatch();
  const { selected } = useAppSelector((state) => state.incidents);
  const [isSelected, setIsSelected] = useState<boolean>(selected.findIndex((s) => s.id === item.id) > -1);

  useEffect(() => {
    const selectedState = selected.findIndex((s) => s.id === item.id) > -1;
    if (isSelected !== selectedState) {
      setIsSelected(selectedState);
    }
  }, [selected, item.id, isSelected]);

  const selectItem = useCallback(() => {
    dispatch(cloneAndSelectItem(item.id));
  }, [dispatch, item.id]);

  const deselectItem = useCallback(() => {
    dispatch(removeSelectedItem(item.id));
  }, [dispatch, item.id]);

  const setDetail = useCallback(() => {
    dispatch(viewDetail(item));
  }, [dispatch, item]);

  return (
    <View style={commonStyles.card}>
        <ThemedView key={item.id} style={styles.stepContainer}>
          <ThemedView style={styles.titleWrapper}>
            <TouchableOpacity onPress={setDetail}>          
              <AntDesign name="infocirlce" size={24} color="black" />
            </TouchableOpacity>
            <ThemedText type="subtitle">{item.incidentAddress}</ThemedText>
          </ThemedView>
          {!isSelected ? (
          <TouchableOpacity onPress={selectItem} style={commonStyles.primaryButton}>
            <ThemedText style={commonStyles.primaryButtonText}>Select</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={deselectItem} style={commonStyles.secondaryButton}>
            <ThemedText style={commonStyles.secondaryButtonText}>Deselect</ThemedText>
          </TouchableOpacity>
        )}
        </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default React.memo(IncidentCard);
