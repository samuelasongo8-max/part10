import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { REPOSITORY } from '../graphql/queries';

const Repository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(REPOSITORY, {
    variables: { id },
  });

  if (loading || !data?.repository) {
    return null;
  }

  return <RepositoryItem repository={data.repository} showGitHubButton />;
};

export default Repository;