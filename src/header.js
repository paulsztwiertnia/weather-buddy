import logo from './assets/logo2.png'; 

function Header() {
    return (        
      <div class="header">
        <a href="#default" class="logo">
          <img src={logo} alt="Company Logo" />
        </a>
      <div class="header-right">
        <a class="active" href="#home">Home</a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
      </div>
      </div>
    );
  }
  
export default Header;
  