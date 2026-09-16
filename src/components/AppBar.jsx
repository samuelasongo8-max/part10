import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const { data, loading } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabsContainer}>
        <Link to="/">
          <Pressable style={styles.tab}>
            <Text style={styles.text}>Repositories</Text>
          </Pressable>
        </Link>
        {!loading &&
          (data?.me ? (
            <>
              <Link to="/review">
                <Pressable style={styles.tab}>
                  <Text style={styles.text}>Create a review</Text>
                </Pressable>
              </Link>
              <Pressable style={styles.tab} onPress={handleSignOut}>
                <Text style={styles.text}>Sign out</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Link to="/signup">
                <Pressable style={styles.tab}>
                  <Text style={styles.text}>Sign up</Text>
                </Pressable>
              </Link>
              <Link to="/signin">
                <Pressable style={styles.tab}>
                  <Text style={styles.text}>Sign in</Text>
                </Pressable>
              </Link>
            </>
          ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
