import { useQuery } from '@apollo/client';
import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { REPOSITORY } from '../graphql/queries';

const Repository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data?.repository) {
    return null;
  }

  const { repository } = data;
  const reviews = repository.reviews?.edges.map((edge) => edge.node) ?? [];

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} showGitHubButton />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default Repository;