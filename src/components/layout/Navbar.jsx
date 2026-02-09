import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    ResumeBuilder
                </NavLink>
                <div className="navbar-links">
                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Home
                    </NavLink>
                    <NavLink to="/templets" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Templates
                    </NavLink>
                    {/* Add more links as needed */}
                </div>
                <div className="navbar-actions">
                    <NavLink to="/templets" className="btn-nav-cta">
                        Get Started
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
