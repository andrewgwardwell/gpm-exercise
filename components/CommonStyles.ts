import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  wrapper: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderColor: '#007bff',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
});