import React from "react";
import "./contact-list.css";
import axios from "axios";

import ContactCard from "../Contact-Card/Contact-Card";

class ContactsList extends React.Component {
  deleteContact = id => {
    axios.delete(`/delete_contact/${id}`).then(this.props.getContacts);
  };
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    console.log("this.props", this.props);
    return (
      <div className="list">
        {this.props.listContacts.map((contact, i) => (
          <ContactCard
            key={i}
            contact={contact}
            deleteContact={this.deleteContact}
          />
        ))}
      </div>
    );
  }
}

export default ContactsList;
