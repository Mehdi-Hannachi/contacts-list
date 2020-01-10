import React from "react";
import "../Contact-Form/contact-form.css";
import axios from "axios";
import { Link } from "react-router-dom";

class EditContact extends React.Component {
  state = {
    fullname: "",
    email: "",
    adress: "",
    phonenumber: ""
  };

  handelChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  editContact = id => {
    axios
      .put(`/update_contact/${this.props.match.params.id}`, this.state)
      .then(this.props.getContacts);
  };
  componentDidMount() {
    console.log("this.props", this.props.match.params.id);
    axios
      .get(`/show_contact/${this.props.match.params.id}`)
      .then(contact =>
        this.setState({
          fullname: contact.data.fullname,
          email: contact.data.email,
          adress: contact.data.adress,
          phonenumber: contact.data.phonenumber
        })
      )
      .then(contact => console.log("contact", contact));
  }

  render() {
    return (
      <div className="background">
        <div className="container">
          <div className="screen">
            <div className="screen-header"></div>
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>ADD NEW CONTACT</span>
                </div>
                <div className="app-contact">
                  CONTACT INFO : +62 81 314 928 595
                </div>
              </div>
              <div className="screen-body-item">
                <div className="app-form">
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="fullname"
                      placeholder="FULL NAME"
                      defaultValue={this.state.fullname}
                      onChange={this.handelChange}
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="email"
                      placeholder="EMAIL"
                      defaultValue={this.state.email}
                      onChange={this.handelChange}
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="phonenumber"
                      placeholder="PHONE NUMBER"
                      defaultValue={this.state.phonenumber}
                      onChange={this.handelChange}
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="adress"
                      placeholder="ADRESS"
                      defaultValue={this.state.adress}
                      onChange={this.handelChange}
                    />
                  </div>
                  <div className="app-form-group buttons">
                    <button className="app-form-button">CANCEL</button>
                    <Link to="/ConatctList">
                      <button
                        className="app-form-button"
                        onClick={() => this.editContact(this.state)}
                      >
                        MODIFY
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="credits">
            inspired by
            <p className="credits-link">
              <svg className="dribbble" viewBox="0 0 200 200">
                <g stroke="#ffffff" fill="none">
                  <circle cx="100" cy="100" r="90" strokeWidth="20"></circle>
                  <path
                    d="M62.737004,13.7923523 C105.08055,51.0454853 135.018754,126.906957 141.768278,182.963345"
                    strokeWidth="20"
                  ></path>
                  <path
                    d="M10.3787186,87.7261455 C41.7092324,90.9577894 125.850356,86.5317271 163.474536,38.7920951"
                    strokeWidth="20"
                  ></path>
                  <path
                    d="M41.3611549,163.928627 C62.9207607,117.659048 137.020642,86.7137169 189.041451,107.858103"
                    strokeWidth="20"
                  ></path>
                </g>
              </svg>
              Hannachi Mehdi
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default EditContact;
