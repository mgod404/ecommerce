import { render } from '@testing-library/react'
import FilterComponent from './filter'
import Props from './filter'
import { SearchParam } from '../navbar/navbar'

const filters = {
    brand__in: [
        "Xiaomi",
        "Samsung",
        "Apple"
    ],
    price_max: 800.00,
    price_min: 0.00,
    ordering: null
}
const searchParams:SearchParam[] = [
    {
        value: "brand__in",
        name: "Samsung"
    }
]

test("renders without problems ", () => {
    render(
        <FilterComponent 
            category="Smartphone"
            filterTrigger={true}
            setFilterTrigger={() => true}
            setProductFilters= {() => []}
            productFilters = {filters}
            fetchProducts = { () => Promise.resolve()}
            searchParams = {searchParams}
            setSearchParams = {() => Promise.resolve()}
        />
    )
})