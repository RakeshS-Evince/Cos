import React from 'react'
import Card from 'react-bootstrap/Card'

function FilterOptionCard(props) {
    const { filterOptions, selectedFilterOpt, setFilterOptions, setSelectedFilterOpt, range, changeSelectedFilterOptions } = props
    const changeFilterOptions = ({ type, element }) => {
        if (type === "categories") {
            let index = filterOptions.categories.findIndex(ele => ele.name === element.name);
            let cat = filterOptions.categories;
            cat[index] = { ...element, checked: !element.checked };
            setFilterOptions({ ...filterOptions, categories: cat });
        }
        if (type === "brands") {
            let index = filterOptions.brands.findIndex(ele => ele.name === element.name);
            let brand = filterOptions.brands;
            brand[index] = { ...element, checked: !element.checked };
            setFilterOptions({ ...filterOptions, brands: brand });
        }
        if (type === "sizes") {
            let index = filterOptions.sizes.findIndex(ele => ele.size === element.size);
            let size = filterOptions.sizes;
            size[index] = { ...element, checked: !element.checked };
            setFilterOptions({ ...filterOptions, sizes: size });
        }
    }
    const clearFilter = () => {
        setFilterOptions({
            sizes: filterOptions?.sizes?.map(ele => ({ ...ele, checked: false })),
            brands: filterOptions?.brands?.map(ele => ({ ...ele, checked: false })),
            categories: filterOptions?.categories?.map(ele => ({ ...ele, checked: false })),
        });
        setSelectedFilterOpt(prev =>
            ({ ...selectedFilterOpt, price: { from: range?.min, to: range?.max } })
        )
    }
    return (
        <div>
            <Card>
                <Card.Header>Filter</Card.Header>
                <Card.Body>
                    <h5 className='text-info'>Category</h5>
                    {filterOptions?.categories?.map((ele, i) => (
                        <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" id={ele.name} checked={ele.checked} name={ele.name} onChange={(e) => { changeFilterOptions({ type: "categories", element: ele }) }} />
                            <label className="form-check-label" htmlFor={ele.name}>
                                {ele.name}
                            </label>
                        </div>
                    ))}
                    <hr />
                    <h5 className='text-warning'>Brands</h5>
                    {filterOptions?.brands.map((ele, i) => (
                        <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" name={ele.name} checked={ele.checked} onChange={(e) => { changeFilterOptions({ type: "brands", element: ele }) }} id={ele.name} />
                            <label className="form-check-label" htmlFor={ele.name}>
                                {ele.name}
                            </label>
                        </div>
                    ))}
                    <hr />
                    <h5 className='text-success'>Size</h5>
                    {filterOptions?.sizes.map((ele, i) => (
                        <div className="form-check" key={i}>
                            <input className="form-check-input" type="checkbox" checked={ele.checked} onChange={(e) => { changeFilterOptions({ type: "sizes", element: ele }) }} id={ele.size} />
                            <label className="form-check-label" htmlFor={ele.size}>
                                {ele.size}
                            </label>
                        </div>
                    ))}
                    <h5 className='text-success'>Price</h5>
                    <div>
                        <input type="range" min={range?.min} max={range?.max} className='form-range' onChange={(e) => changeSelectedFilterOptions({ from: range?.min, to: e.target.value }, undefined)} />
                        <div className='d-flex justify-content-between'><span>{range?.min}</span>
                            <span>{range?.max}</span>
                        </div>
                        <span>Filtered: ₹ {selectedFilterOpt.price.from} to ₹{selectedFilterOpt.price.to}</span>
                    </div>
                    <button className='btn btn-danger mt-5 w-100' onClick={() => clearFilter()}>Clear filter</button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default FilterOptionCard
