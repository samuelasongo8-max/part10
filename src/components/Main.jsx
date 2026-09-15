import { StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <RepositoryList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

export default Main;