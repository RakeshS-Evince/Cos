import React from 'react'

function ScrollToTop() {
    let mybutton = document.getElementById("btn-back-to-top");
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (
            document.body.scrollTop > 20 ||
            document.documentElement.scrollTop > 20
        ) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }
    mybutton?.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <>
            <button
                type="button"
                className="btn btn-danger rounded-pill btn-floating btn-lg"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    display: "none"
                }}
                id="btn-back-to-top"
            >
                <i className="fas fa-arrow-up" />
            </button>
        </>
    )
}

export default ScrollToTop
