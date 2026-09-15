import { StyleSheet, Text, View } from 'react-native';

const formatNumber = (number) => number.toLocaleString('en-US');

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fullName}>{repository.fullName}</Text>
      <Text style={styles.description}>{repository.description}</Text>
      <Text style={styles.language}>{repository.language}</Text>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(repository.stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(repository.forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(repository.reviewCount)}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{formatNumber(repository.ratingAverage)}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#24292f',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#57606a',
    lineHeight: 20,
    marginBottom: 12,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0969da',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    alignItems: 'center',
    minWidth: 60,
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#24292f',
  },
  statLabel: {
    fontSize: 12,
    color: '#57606a',
    marginTop: 4,
  },
});

export default RepositoryItem;