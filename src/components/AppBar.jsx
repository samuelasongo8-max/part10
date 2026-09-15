import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tab: {
    padding: 15,
  },
  tabsContainer: {
    flexDirection: 'row',
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
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <Link to="/">
          <Pressable style={styles.tab}>
            <Text style={styles.text}>Repositories</Text>
          </Pressable>
        </Link>
        <Link to="/signin">
          <Pressable style={styles.tab}>
            <Text style={styles.text}>Sign in</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
