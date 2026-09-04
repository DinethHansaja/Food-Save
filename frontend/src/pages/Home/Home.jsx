import { Link } from "react-router-dom";
import "../../styles/Home/Home.css";

const Home = () => {
  return (
    <main className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">🍱 Fighting Food Waste Together</span>

          <h1>
            Save Good Food.
            <br />
            <span>Reduce Food Waste.</span>
          </h1>

          <p>
            FoodSave connects businesses with surplus food to people and
            community organizations that can make use of it before it goes to
            waste.
          </p>

          <div className="hero-buttons">
            <Link to="/food" className="primary-btn">
              Find Surplus Food
            </Link>

            <Link to="/register" className="secondary-btn">
              List Surplus Food
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-food-icon">🍱</div>

          <h3>Good food deserves a second chance.</h3>

          <p>
            Discover surplus food available near you and help reduce
            unnecessary food waste.
          </p>

          <div className="hero-mini-stats">
            <div>
              <strong>1,250+</strong>
              <span>Portions Saved</span>
            </div>

            <div>
              <strong>86+</strong>
              <span>Businesses</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="problem-section">
        <div className="section-heading">
          <span>THE PROBLEM</span>

          <h2>Too much good food goes to waste.</h2>

          <p>
            Food businesses can have safe, edible surplus food that remains
            unsold. Without a simple way to redistribute it, valuable food
            can become waste.
          </p>
        </div>

        <div className="problem-grid">
          <div className="problem-card">
            <div className="problem-icon">🍽️</div>
            <h3>Surplus Food</h3>
            <p>
              Restaurants, bakeries and supermarkets can have food left over
              at the end of the day.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🗑️</div>
            <h3>Food Waste</h3>
            <p>
              Without efficient redistribution, usable food may end up being
              discarded.
            </p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🤝</div>
            <h3>Missed Opportunities</h3>
            <p>
              Surplus food could instead reach people and organizations that
              can make use of it.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="section-heading">
          <span>HOW IT WORKS</span>

          <h2>From surplus to saved.</h2>

          <p>
            FoodSave makes surplus food redistribution simple.
          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <div>
              <h3>Businesses List Food</h3>
              <p>
                Businesses add their available surplus food with quantity,
                location and collection deadline.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">02</div>
            <div>
              <h3>Recipients Discover</h3>
              <p>
                Users search and filter available surplus food based on their
                needs and location.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">03</div>
            <div>
              <h3>Food Is Requested</h3>
              <p>
                Recipients request the quantity they need from an available
                listing.
              </p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">04</div>
            <div>
              <h3>Food Gets Collected</h3>
              <p>
                The business accepts the request and the recipient collects
                the food before the deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="section-heading">
          <span>OUR IMPACT</span>

          <h2>Every saved portion matters.</h2>

          <p>
            FoodSave tracks the impact created through successful food
            redistribution.
          </p>
        </div>

        <div className="impact-grid">
          <div className="impact-card">
            <strong>1,250+</strong>
            <span>Portions Saved</span>
          </div>

          <div className="impact-card">
            <strong>86+</strong>
            <span>Businesses</span>
          </div>

          <div className="impact-card">
            <strong>420+</strong>
            <span>Successful Requests</span>
          </div>

          <div className="impact-card">
            <strong>342 kg</strong>
            <span>Food Diverted</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Have surplus food?</h2>

        <p>
          Give your surplus food a chance to reach someone who can use it.
        </p>

        <Link to="/register" className="primary-btn">
          Join FoodSave
        </Link>
      </section>

    </main>
  );
};

export default Home;