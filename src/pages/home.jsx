import React from "react";

export default function Home({ isLoggedIn, openAuthForm }) {
  const examplePortfolios = [
    {
      name: "Alice Johnson",
      summary: "Front-end Developer creating sleek and responsive web designs.",
      skills: "React, Tailwind, JavaScript",
      github: "https://github.com/alicejohnson",
    },
    {
      name: "Mark Smith",
      summary: "Full-stack developer passionate about building scalable apps.",
      skills: "Node.js, MongoDB, Express, React",
      github: "https://github.com/marksmith",
    },
    {
      name: "Sophia Lee",
      summary: "UI/UX designer with a focus on intuitive user experiences.",
      skills: "Figma, Adobe XD, CSS, HTML",
      github: "https://github.com/sophialee",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Dream Portfolio_</h1>
          <p className="hero-subtitle">
            Create a stunning and professional portfolio website in minutes.
          </p>
          <button className="hero-btn" onClick={openAuthForm}>
            {isLoggedIn ? "Go to Portfolio" : "Get Started"}
          </button>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1588511986632-592db3d6c81f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Portfolio"
          />
        </div>
      </section>

      {/* Example Portfolios */}
      <section className="example-portfolios">
        <h2 className="section-title">See What Others Have Built</h2>
        <div className="cards-grid">
          {examplePortfolios.map((portfolio, idx) => (
            <div className="portfolio-card" key={idx}>
              <h3>{portfolio.name}</h3>
              <p className="summary">{portfolio.summary}</p>
              <p className="skills"><strong>Skills:</strong> {portfolio.skills}</p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href={portfolio.github} target="_blank" rel="noreferrer">
                  {portfolio.github}
                </a>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
