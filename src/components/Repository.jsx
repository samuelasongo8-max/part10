import { useQuery } from '@apollo/client';
import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import { REPOSITORY } from '../graphql/queries';

const Repository = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useQuery(REPOSITORY, {
    variables: { id, first: 5, after: null },
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        first: 5,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

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
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={() => (
        <RepositoryItem repository={repository} showGitHubButton />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  );
};

export default Repository;