import React, { useContext, useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from "axios";
import { BASE_URL } from "../constants/constant"
import { UserContext } from '../context/UserContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import useFilterHook from '../hooks/useFilterHook';
import FilterOptionCard from '../components/FilterOptionCard';
import ProductCard from '../components/ProductCard';
const filterRecordsArr = data => {
    let arr = [];
    data?.forEach(element => {
        if (element.checked) {
            arr.push(element.name || element.size)
        }
    });
    return arr
}
function SearchResult() {
    const [selectedFilterOpt, setSelectedFilterOpt] = useState({
        brand: [],
        category: [],
        price: { from: 0, to: 120 },
        sizes: [],
    });
    const [data, setData] = useState([]);
    const [range, setRange] = useState();
    const [filterOptions, setFilterOptions] = useState();
    const { products } = useContext(UserContext);
    const { state } = useLocation();
    const filterData = useFilterHook(data, selectedFilterOpt);
    const navigate = useNavigate();

    useEffect(() => {
        if (!state?.searchValue) {
            navigate("/");
            return
        }
        let tempData = products?.filter(element => element.name.toLowerCase().includes(state?.searchValue.trim().toLowerCase()));
        setData(tempData);
        let minVal = tempData[0]?.price, maxVal = tempData[0]?.price;
        tempData.forEach(element => {
            if (element.price < minVal) { minVal = element.price };
            if (element.price > maxVal) { maxVal = element.price };
        });
        setRange({ min: minVal, max: maxVal });
        setSelectedFilterOpt(prev => ({ ...prev, price: { from: minVal, to: maxVal } }))
    }, [navigate, products, state?.searchValue]);
    useEffect(() => {
        axios.get(BASE_URL + "filter-options").then(res => {
            setFilterOptions({
                sizes: res?.data?.sizes?.map(ele => ({ ...ele, checked: false })),
                brands: res?.data?.brands?.map(ele => ({ ...ele, checked: false })),
                categories: res?.data?.categories?.map(ele => ({ ...ele, checked: false })),
            })
        }).catch(e => console.log(e));
    }, [])
    useEffect(() => {
        setSelectedFilterOpt(prev => ({
            brand: filterRecordsArr(filterOptions?.brands),
            category: filterRecordsArr(filterOptions?.categories),
            sizes: filterRecordsArr(filterOptions?.sizes),
            price: prev.price,
            viewBy: prev.viewBy
        }))
    }, [filterOptions]);
    const changeSelectedFilterOptions = (price, viewBy) => {
        setSelectedFilterOpt(prev => ({
            brand: filterRecordsArr(filterOptions?.brands),
            category: filterRecordsArr(filterOptions?.categories),
            sizes: filterRecordsArr(filterOptions?.sizes),
            price: !price ? prev.price : price,
            viewBy: !viewBy ? prev.viewBy : viewBy,
        }))
    }
    useEffect(() => {
        if (document.querySelectorAll("#items-row").length > 0) {
            document.querySelectorAll("#items-row")?.forEach(element => { element?.classList.add("elementToFadeInAndOut") });
            setTimeout(() => {
                document.querySelectorAll("#items-row")?.forEach(element => { element?.classList.remove("elementToFadeInAndOut") });
            }, 1500)
        }

    }, [filterOptions])


    return (
        <>
            <div className='d-flex justify-content-between mb-3'>
                <h3>Showing results for "{state?.search}"</h3>
                <div className='d-flex align-items-center'>
                    <label>Sort: </label>
                    <select className='form-control ms-2' onChange={e => changeSelectedFilterOptions(null, e.target.value)}>
                        <option>Older first</option>
                        <option >Newer first</option>
                        <option>Price Low to High</option>
                        <option>Price High to Low</option>
                    </select>
                </div>
            </div>
            <Row className='g-3 justify-content-between'>
                <Col lg="3" md="4">
                    <FilterOptionCard
                        {...{ filterOptions, selectedFilterOpt, setFilterOptions, setSelectedFilterOpt, range, changeSelectedFilterOptions }}></FilterOptionCard>
                </Col>
                <Col lg="9" md={8}>
                    <Row className='g-3' id="items-row">
                        {filterData().length ? filterData().map((ele, i) => (
                            <Col key={i} lg={4} sm={6}>
                                <ProductCard product={ele} />
                            </Col>
                        )) : <p>No ice-creams are there</p>}
                    </Row>
                </Col>
            </Row>
        </>

    )
}

export default SearchResult
