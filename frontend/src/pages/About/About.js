import React from 'react'
import './about.css'
function About() {
  return (
    <>
      <section className="about-us">
        <div className="about">
          <img
            src="https://images.pexels.com/photos/461189/pexels-photo-461189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="pic" alt='...'
          />
          <div className="text">
            <h2 style={{ color: '#4070f4' }}>About Us</h2>
            <h5>
              We offer a variety of delicious ice cream flavors made from high-quality ingredients
            </h5>
            <p>
              Devoted to Gives the exceptionally best frozen ice cream, It was opened
              in August 2019 in <b>Rourkela, ODISHA, INDIA</b>. Whether you live in a
              destination where it feels like summer all the time or one of the
              coldest cities in the world, there's an iconic dessert that transcends
              temperature: ice cream. It's a classic treat that can be enjoyed in a
              simple cup, piled in a cone or scooped into extravagant sundaes loaded
              with toppings. Opening an ice cream shop is a common dream.
            </p>
            {/* <div class="data">
      <a href="#" class="hire">Hire Me</a>
    </div> */}
          </div>
        </div>
      </section>
    </>
  )
}

export default About