import React from "react"
import './Home.css'
const Features = () => {
  const features = [
    {
      id: 1,
      icon: "✨",
      title: "Intuitive Design",
      description: "Our user-friendly interface makes navigation seamless and enjoyable.",
    },
    {
      id: 2,
      icon: "🚀",
      title: "Lightning Fast",
      description: "Optimized performance ensures your experience is always quick and responsive.",
    },
    {
      id: 3,
      icon: "🔒",
      title: "Secure Platform",
      description: "Advanced security measures keep your data protected at all times.",
    },
    {
      id: 4,
      icon: "📊",
      title: "Job oppurtunities",
      description: "Post the available job openings and hire people.",
    },
    {
      id: 5,
      icon: "🔄",
      title: "Search for Jobs",
      description: "Find the ideal job and join your dream company and elevate your work experience.",
    },
    {
      id: 6,
      icon: "💬",
      title: "Seamless Integration",
      description: "Both employers and employees can navigate on this platform.",
    },
  ]

  return (
    <section className="features " id="features">
      <div className="container1">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to succeed in the industry-world</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <div className="feature-card" key={feature.id}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
