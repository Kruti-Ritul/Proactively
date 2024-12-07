import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3D53B6' },
  healthScoreContainer: { 
    padding: 16, 
    backgroundColor: '#3D53B6', 
    marginTop: 50,
    marginBottom: -30, // Negative margin to pull it over the ScrollView
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#fff',
    marginLeft: 8
  },
  header: { fontSize: 16, fontWeight: '600', color: '#fff' },
  healthScoreSection: { marginTop: 16, alignItems: 'center' },
  healthScoreTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#D5D8FF', 
    marginLeft: -250, 
    marginBottom: 20 
  },
  healthScoreValue: { 
    fontSize: 40, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginLeft: -245 },
  healthScoreDescription: { 
    fontSize: 14, 
    color: '#D5D8FF', 
    marginBottom: 50, 
    marginLeft: -75 
  },
  progressContainer: {
    height: 20,
    width: '100%',
    borderRadius: 10,
    overflow: 'visible',
    marginTop: 8,
  },
  progressGradient: { flex: 1, borderRadius: 10 },
  arrowIndicator: {
    position: 'absolute',
    top: -15,
    width: 16,
    height: 10.5,
    borderBottomWidth: 10,
    borderBottomColor: '#fff',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    zIndex: 10, // Ensures the arrow stays on top
    transform: [{ rotate: '180deg' }], // Rotate the arrow 180 degrees (inverted)
  },
  progressNumbers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  progressNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#C2D3FF',
  },

  scrollableContainer: { 
    flex: 1, 
    padding: 16,
    borderRadius: 16, // Rounded corners for the ScrollView
    marginTop: 50, // To create space for the floating health score container
    backgroundColor: "#FFFFFF"
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ECECEC'
  },
  cardHeader: {
    backgroundColor: '#3A9B78',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    width: 95,
    marginBottom: 10,
  },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: 'white' },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: -15 },
  cardDetails: { flex: 1 },
  cardName: { fontSize: 18, fontWeight: 'bold' },
  qualificationText: { fontSize: 14, color: '#707070', fontWeight: 400 },
  specializationText: { fontSize: 14, color: '#707070', fontWeight: 400 },
  cardDate: { fontSize: 14, color: '#707070', fontWeight: 400, marginBottom: 5, marginTop: 10 },
  profilePicContainer: { alignItems: 'center', top: -50},
  arrowIcon: { marginBottom: 30, marginRight: -40, marginTop: 10, height: 13, width: 8 },
  profileImageA: { width: 50, height: 50, borderRadius: 20, marginRight:5},
  sectionTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  healthCard: {
    width: 100,
    height: 100,
    backgroundColor: '#f0f8ff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  healthCardTitle: { fontSize: 16, fontWeight: 'bold' },
  healthCardValue: { fontSize: 14, color: '#555' },
  taskItem: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
  taskText: { fontSize: 16 },
  taskTextCompleted: { textDecorationLine: 'line-through', color: '#aaa' },
  progressBar: { height: 10, borderRadius: 5, marginVertical: 10 },
});

export default styles;
