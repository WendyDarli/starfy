import { useRef, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getSearchResults from '../../api/getSearchResults';

function usePagination(query) {

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['searchResults', query],
    queryFn: ({ pageParam }) => getSearchResults(query, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.currentPage + 1
        : undefined;
    },
  });

  //observer for infinite scrolling
  const observer = useRef(null);
  const paginationTriggerRef = useCallback(
    (node) => {
      if (!node || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  return {
    data,
    isLoading,
    paginationTriggerRef,
  };
}

export default usePagination;