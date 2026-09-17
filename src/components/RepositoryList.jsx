import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';

const sortOptions = [
  {
    label: 'Latest repositories',
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  {
    label: 'Highest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  {
    label: 'Lowest rated repositories',
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
];

export const RepositoryListContainer = ({
  repositories,
  onRepositoryPress,
  onSortChange,
  onEndReached,
  selectedSort = sortOptions[0],
  searchKeyword = '',
  onSearchKeywordChange,
}) => {
  const selectSort = (sort) => {
    onSortChange?.(sort);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => onRepositoryPress?.(item.node.id)}>
      <RepositoryItem repository={item.node} />
    </Pressable>
  );

  const renderHeader = () => (
    <View style={styles.sortingContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={onSearchKeywordChange}
      />
      <Text style={styles.sortingLabel}>Sort repositories</Text>
      <View style={styles.optionsContainer}>
        {sortOptions.map((sort) => (
          <Pressable
            key={`${sort.orderBy}-${sort.orderDirection}`}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedSort === sort }}
            onPress={() => selectSort(sort)}
            style={[
              styles.option,
              selectedSort === sort && styles.selectedOption,
            ]}
          >
            <Text
              style={[
                styles.optionText,
                selectedSort === sort && styles.selectedOptionText,
              ]}
            >
              {sort.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      data={repositories.edges}
      renderItem={renderItem}
      keyExtractor={(item) => item.node.id}
      ListHeaderComponent={renderHeader}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const RepositoryList = ({ onRepositoryPress }) => {
  const [sort, setSort] = useState(sortOptions[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories, loading, fetchMore } = useRepositories(
    sort.orderBy,
    sort.orderDirection,
    debouncedSearchKeyword,
  );

  const loadMore = () => {
    if (loading || !repositories.pageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        after: repositories.pageInfo.endCursor,
        orderBy: sort.orderBy,
        orderDirection: sort.orderDirection,
        searchKeyword: debouncedSearchKeyword,
      },
    });
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      onRepositoryPress={onRepositoryPress}
      onSortChange={setSort}
      onEndReached={loadMore}
      selectedSort={sort}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={setSearchKeyword}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#e1e4e8',
  },
  sortingContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
  },
  sortingLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  searchInput: {
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 4,
  },
  optionsContainer: {
    gap: 8,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#d0d7de',
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#0366d6',
    borderColor: '#0366d6',
  },
  optionText: {
    color: '#24292f',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
});

export default RepositoryList;
