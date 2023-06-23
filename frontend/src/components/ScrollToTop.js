import React, { useRef } from 'react'

function ScrollToTop() {
    const scrollRef = useRef(document.getElementById("btn-back-to-top"));
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollRef.current.style.display = "block";
        } else {
            scrollRef.current.style.display = "none";
        }
    }
    scrollRef?.current?.addEventListener("click", backToTop);

    function backToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    return (
        <>
            <button
                ref={scrollRef}
                type="button"
                className="btn btn-danger rounded-pill btn-floating btn-lg"
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    display: "none",
                    zIndex: 9999
                }}
                id="btn-back-to-top"
            >
                <i className="fas fa-arrow-up" />
            </button>
        </>
    )
}

export default ScrollToTop
