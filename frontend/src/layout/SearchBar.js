import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';
const categories = ["Chocolates", "Creams", "Fruit", "Popsicles", "Shakes", "Special"]
function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const { products } = useContext(UserContext);
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        navigate("/search-results", { state: { searchValue: searchValue } });
        setSearchValue("")
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-light' style={{ backgroundColor: "#f3f3f3" }}>
            <div className='container d-block' id='header-2'>
                <div className='row g-3 g-lg-0 justify-content-center'>
                    <div className='dropdown order-2 order-md-1 col-md-4 col-lg-2 col-xl-2'>
                        <button className='btn btn-danger' data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-justify"></i>Categories<i className="bi bi-chevron-down"></i></button>
                        <div className="dropdown-menu">
                            {categories.map(ele => (
                                <Link to="/menu" state={{ category: ele }} key={ele} className='dropdown-item' style={{ textDecoration: "none" }} >{ele}</Link>
                            ))}
                        </div>
                    </div>
                    <div className='col-md-8 order-1 order-md-2 '>
                        <div className="main">
                            <form onSubmit={submitHandler}>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search"
                                        value={searchValue}
                                        onChange={(e) => { setSearchValue(e.target.value) }}
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-danger" type={"submit"}>
                                            <i className="fa fa-search" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                            {searchValue && <div className='w-100 position-absolute my-3 py-3 card shadow' style={{ zIndex: 5 }} >
                                <strong className='px-3 pt-2'>Search Results</strong>
                                {products?.filter(element => element.name.toLowerCase().includes(searchValue.trim().toLowerCase()))?.slice(0, 10)?.map((item, i) => (
                                    <div key={i} style={{ cursor: "pointer" }} className='px-3 py-2 my-1 search-item' onClick={() => { navigate("/icecream-details/" + item.id); setSearchValue(""); }}>
                                        <span to={"/icecream-details/" + item.id} >{item.name}</span>
                                    </div>
                                ))}
                            </div>}
                        </div>
                    </div>
                    <div className='col-md-2 order-3 d-none d-lg-flex justify-content-evenly'>
                        <div className='mx-2'>
                            <div className='card p-2 shadow '>
                                <i className="bi bi-telephone-fill text-danger"></i>
                            </div>
                        </div>
                        <h5 className='m-2'>Support</h5>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default SearchBar
