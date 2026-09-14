import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Rate Repository
      </Text>

      <Text style={styles.introduction}>
        Hello people, my name is Samuel and I am a software developer.
      </Text>

      <Text style={styles.description}>
        I am currently learning React Native and building a mobile
        application called Rate Repository. This app allows users
        to rate and review different repositories on GitHub. It is
        a great way to discover new projects and share your thoughts
        with the community.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  introduction: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
  },
});