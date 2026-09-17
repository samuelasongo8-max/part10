import { useMutation, useQuery } from '@apollo/client';
import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import Text from './Text';
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteReview, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_REVIEW);

  if (loading || !data?.me) {
    return null;
  }

  const reviews = data.me.reviews?.edges.map((edge) => edge.node) ?? [];

  const confirmDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({
                variables: { deleteReviewId: reviewId },
              });
              await refetch();
            } catch (error) {
              console.error('Deleting the review failed', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {deleteError && (
        <Text style={styles.errorText}>
          Deleting the review failed. Please try again.
        </Text>
      )}
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <View>
            <ReviewItem review={item} showRepository />
            <View style={styles.actions}>
              <Pressable
                style={styles.button}
                onPress={() => navigate(`/repositories/${item.repository.id}`)}
              >
                <Text style={styles.buttonText}>View repository</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.deleteButton]}
                onPress={() => confirmDelete(item.id)}
                disabled={deleting}
              >
                <Text style={styles.buttonText}>Delete review</Text>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    padding: 16,
    paddingTop: 0,
    backgroundColor: '#ffffff',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 12,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  errorText: {
    padding: 12,
    color: '#d73a4a',
    backgroundColor: '#ffffff',
  },
});

export default MyReviews;
