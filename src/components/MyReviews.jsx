import { useQuery } from '@apollo/client';
import { FlatList, Pressable, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import ReviewItem from './ReviewItem';
import { ME } from '../graphql/queries';

const MyReviews = () => {
  const navigate = useNavigate();
  const { data, loading } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data?.me) {
    return null;
  }

  const reviews = data.me.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigate(`/repositories/${item.repository.id}`)}
        >
          <ReviewItem review={item} showRepository />
        </Pressable>
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default MyReviews;
