import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './SignUp.css';
import { Link } from "react-router-dom";

export default function SignUp({ setToken }) {

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [cnic, setCnic] = useState("");
  const [license, setLicense] = useState("");
  const [phone, setPhone] = useState("");

  function signupUser(userDetails) {
    return fetch(process.env.REACT_APP_END_POINT + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails)
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        alert(error);
      });
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      name,
      lastname,
      email,
      password,
      phone_number: Number(phone),
      confirmpassword,
      cnic,
      license
    }
    const sessionUserDetails = await signupUser(data);
    if (sessionUserDetails && sessionUserDetails.token) {
      setToken({ token: sessionUserDetails.token, name: sessionUserDetails.user.name });
      window.location.reload();
    }
  }

  function validateForm() {
    return email && password && license && phone &&
      name && lastname && cnic &&
      password === confirmpassword
  }

  return (
    <div className="signup-container">
      <div className="signup-content border bg-dark text-white">
        <Form onSubmit={handleSubmit}>
          <h3 className="heading-text">Sign Up</h3>

          <Form.Group size="lg" className="field" controlId="name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              autoFocus
              data-test="first-name-form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" className="field" controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              autoFocus
              data-test="last-name-form-control"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" className="field" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              data-test="email-form-control"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" className="field" controlId="cnic">
            <Form.Label>CNIC</Form.Label>
            <Form.Control
              autoFocus
              data-test="cnic-form-control"
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" className="field" controlId="license">
            <Form.Label>License</Form.Label>
            <Form.Control
              autoFocus
              data-test="license-form-control"
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" className="field" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              placeholder="e.g. 03431785643"
              autoFocus
              data-test="phone-form-control"
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" className="field" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              data-test="password-form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" className="field" controlId="confirmpassword">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              autoFocus
              data-test="conf-password-form-control"
              type="password"
              value={confirmpassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </Form.Group>
          <Button size="lg" type="submit" disabled={!validateForm()} className="signup-button" data-test="signup-button">
            Sign Up
          </Button>
        </Form>
        <Link to='/login' className="login-link">Login</Link>
      </div>
    </div>
  );
  // Login.propTypes = {
  //     setToken: PropTypes.func.isRequired
  //   };

}
