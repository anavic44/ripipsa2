// File path: /src/components/Login.js
import React from 'react';
import './Login.css'; // Make sure to create a CSS file for styling

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', this.state);
  };

  render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          <h2>Welcome to Ripipsa!</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <input 
                type="text" 
                name="username"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="input-group">
              <input 
                type="password" 
                name="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <button type="submit" className="login-button">LOGIN</button>
            <div className="links">
              <a href="#forgot">Forgot Password?</a>
              <a href="#register">New? Register Here</a>
            </div>
          </form>
        </div>
        <div className="login-illustration">
          {/* Include your illustration here */}
        </div>
      </div>
    );
  }
}

export default Login;
