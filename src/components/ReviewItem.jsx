import { format } from 'date-fns';
import { StyleSheet, View } from 'react-native';
import Text from './Text';
import theme from '../theme';

const formatDate = (createdAt) => {
  if (!createdAt) {
    return '';
  }

  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? '' : format(date, 'dd MMM yyyy');
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{review.rating}</Text>
        </View>
        <View style={styles.reviewerInfo}>
          <Text style={styles.username}>{review.user.username}</Text>
          <Text style={styles.date}>{formatDate(review.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  rating: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewerInfo: {
    marginLeft: 12,
  },
  username: {
    color: '#24292f',
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#57606a',
    marginTop: 4,
  },
  reviewText: {
    color: '#24292f',
    lineHeight: 20,
    marginTop: 12,
  },
});

export default ReviewItem;