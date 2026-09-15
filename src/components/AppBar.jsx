import { Pressable, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
