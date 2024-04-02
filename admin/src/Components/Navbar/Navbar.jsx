import './Navbar.css';
import navlogo from '../../assets/logo.png';
import navProfile from '../../assets/nav-profile.svg';

const Navbar = () => {
    return (
        <div className="navbar">
            <img className="navlogo" src={navlogo} alt="nav-logo" />
            <img src={navProfile} alt="nav-profile" />
        </div>
    );
};

export default Navbar;
