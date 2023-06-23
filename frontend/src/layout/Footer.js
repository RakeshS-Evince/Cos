import React from 'react'

function Footer() {
    return (
        <>
            <footer className="text-center text-lg-start text-muted" style={{ backgroundColor: "#f3f3f3" }}>
                <section className="pt-4">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3 text-secondary" />
                                    Ice-Cream Shop
                                </h6>
                                <p>
                                    We offer a variety of delicious ice cream flavors made from high-quality ingredients
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Terms & Condition
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        New Products
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Best sales
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Delivery
                                    </a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <p>
                                    <a href="#!" className="text-reset">
                                        About us
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Contact us
                                    </a>
                                </p>
                                <p>
                                    <a href="#!" className="text-reset">
                                        Shop
                                    </a>
                                </p>

                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home me-3 text-secondary" />Brahmapur, ODISHA, INDIA
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3 text-secondary" />
                                    info@example.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3 text-secondary" />+ 91 2345678822
                                </p>
                                <p>
                                    <i className="fas fa-print me-3 text-secondary" />+ 91 2345678915
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

            </footer>
        </>

    )
}

export default Footer
