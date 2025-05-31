import { useInfiniteQuery } from "@tanstack/react-query"
import { productsAPI } from "../api/productsAPI"

export function useProductsQuery() {
    const {
        data: products,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ['products'],
        queryFn: productsAPI.get,
        getNextPageParam: (lastPage) => lastPage.next === null ? null : lastPage.next,
        refetchOnWindowFocus: false
    })

    return {
        products,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
        isFetchingNextPage
    }
}
