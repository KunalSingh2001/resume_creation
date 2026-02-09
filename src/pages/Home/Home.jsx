import './Home.css'
import Footer from '../../components/layout/Footer'
import { NavLink } from 'react-router-dom'
function Home() {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>Build Your Professional Resume in Minutes</h1>
                <p>Create a polished, ATS-friendly resume that stands out to employers. No design skills needed.</p>
                <div className="hero-buttons">
                    <NavLink to="/templets" className="btn-primary">Create My Resume</NavLink>
                </div>
            </header>

            <section className="features">
                <h2 className="section-title">Why Choose Our Builder?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <span className="feature-icon">🚀</span>
                        <h3>Fast & Easy</h3>
                        <p>Our intuitive builder helps you create a professional resume in less than 15 minutes.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">🎯</span>
                        <h3>ATS Friendly</h3>
                        <p>Templates designed to pass Applicant Tracking Systems and get you noticed by recruiters.</p>
                    </div>
                    <div className="feature-card">
                        <span className="feature-icon">✨</span>
                        <h3>Professional Design</h3>
                        <p>Choose from a variety of sleek, modern templates crafted by HR professionals.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works">
                <h2 className="section-title">How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Choose a Template</h3>
                        <p>Select a professional design that fits your industry and style.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Fill in Details</h3>
                        <p>Enter your experience, skills, and education with our easy prompts.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Download & Apply</h3>
                        <p>Export your resume as a PDF and start applying to your dream jobs.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Land Your Dream Job?</h2>
                <p>Join thousands of successfully employed professionals.</p>
                <button className="btn-primary">Get Started Now</button>
            </section>
            {/* Footer removed, handled by Layout */}
        </div>
    )
}

export default Home