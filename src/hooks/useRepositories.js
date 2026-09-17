import { useQuery } from '@apollo/client/react';
import { REPOSITORIES } from '../graphql/queries';

const useRepositories = (
  orderBy = 'CREATED_AT',
  orderDirection = 'DESC',
  searchKeyword = '',
) => {
  const { data, loading, refetch, fetchMore } = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {
      first: 8,
      orderBy,
      orderDirection,
      searchKeyword,
    },
  });

  const repositories = data ? data.repositories : { edges: [], pageInfo: {} };

  return {
    repositories,
    loading,
    refetch,
    fetchMore,
  };
};

export default useRepositories;