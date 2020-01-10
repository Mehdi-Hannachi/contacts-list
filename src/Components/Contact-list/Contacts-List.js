import React from "react";
import "./contact-list.css";
import { Link } from "react-router-dom";

class ContactsList extends React.Component {
  render() {
    console.log("this.props", this.props);
    return (
      <div className="list">
        {this.props.getContacts.map((contact, i) => (
          <div className="image-area" key={i}>
            <div className="img-wrapper">
              <img
                src="https://images.pexels.com/photos/1220757/pexels-photo-1220757.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Atul Prajapati"
              />

              <div className="cord">
                <span>{contact.email}</span>
                <span>{contact.adress}</span>
                <span>{contact.phonenumber}</span>
                <div className="icons">
                  <i
                    className="fas fa-trash-alt"
                    onClick={() => this.props.deleteContact(contact._id)}
                  ></i>

                  <Link to={`/editcontact/${contact._id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </div>
              </div>

              <h2>{contact.fullname}</h2>

              <ul>
                <li>
                  <a href="https://github.com/atuljustano">
                    <i className="fab fa-github" />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/atulkprajapati2000/">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/atuljustano">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/channel/UCf-KfxuY8PZBSD_8RW2nYsw">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ContactsList;
