import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function Navbar() {
    const { user, logOut } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
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
                    <NavLink to="/templates" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                        Templates
                    </NavLink>
                </div>
                <div className="navbar-actions">
                    {user ? (
                        <div className="profile-container">
                            <button
                                className="profile-btn"
                                onClick={() => setShowDropdown(!showDropdown)}
                            >
                                <div className="profile-icon">
                                    {`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()}
                                </div>

                                <span>{user.name}</span>
                            </button>

                            {showDropdown && (
                                <div className="profile-dropdown">
                                    <button className="dropdown-item" onClick={logOut}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <NavLink to="/templates" className="btn-nav-cta">
                            Get Started
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
