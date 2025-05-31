import {
    useEffect,
    useState
} from "react"

import {
    Checkbox,
    Table,
    type TableColumnsType
} from 'antd'

import { useProductsQuery } from "../../hooks/use-products-query"

import type { TProductAPI } from "../../api/productsAPI"

const columns: TableColumnsType<TProductAPI> = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name > b.name ? 1 : -1,
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => +a.price - +b.price,
    },
    {
        title: 'Category',
        dataIndex: 'category',
        sorter: (a, b) => a.category > b.category ? 1 : -1,
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand > b.brand ? 1 : -1,
    },
    {
        title: 'In Stock',
        dataIndex: 'inStock',
        render: (value: boolean) => <Checkbox checked={value} />,
        sorter: (a, b) => +a.inStock - +b.inStock
    },
]

export const MainTable = () => {
    const [prevData, setPrevData] = useState<number>()

    const {
        products,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
        isFetchingNextPage
    } = useProductsQuery()

    useEffect(() => {
        const result = products?.pages[products?.pages.length - 1]

        if (!prevData) {
            setPrevData(result?.items)
        }

        if (prevData && prevData !== result?.items) {
            if (result?.next === result?.last) {
                fetchNextPage()
            }

            setPrevData(result?.items)
        }

    }, [fetchNextPage, prevData, products?.pages])

    const tableData = products?.pages.reduce((s, c) => [...s, ...c.data], [] as TProductAPI[])

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget

        if (scrollHeight - (scrollTop + clientHeight) < 50 && hasNextPage && !isFetching) {
            fetchNextPage()
        }
    }

    return <>
        <Table
            bordered
            columns={columns}
            dataSource={tableData}
            pagination={false}
            rowKey="id"
            scroll={{ x: 600, y: 500 }}
            loading={isLoading || isFetchingNextPage || isFetching}
            onScroll={handleScroll}
        />
    </>
}
