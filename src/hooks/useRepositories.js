import { useQuery } from '@apollo/client/react';
import { REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch } = useQuery(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data ? data.repositories.edges.map((edge) => edge.node) : [];

  return {
    repositories,
    loading,
    refetch,
  };
};

export default useRepositories;