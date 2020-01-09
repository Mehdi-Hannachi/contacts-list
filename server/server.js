const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

app.use(bodyParser.json());

const mongo_url = "mongodb://localhost:27017";
const dataBase = "Contacts-List";

MongoClient.connect(mongo_url, (err, client) => {
  assert.equal(err, null, "Data base connexion failed");

  const db = client.db(dataBase);

  app.post("/new_contact", (req, res) => {
    let newContact = req.body;
    db.collection("Contacts").insertOne(newContact, (err, data) => {
      if (err) res.send("Can t add contact");
      else res.send("contact added");
    });
  });

  app.get("/show_contacts", (req, res) => {
    db.collection("Contacts")
      .find()
      .toArray((err, data) => {
        if (err) res.send("Cant fetch Contacts");
        else res.send(data);
      });
  });

  app.delete("/delete_contact/:id", (req, res) => {
    let contact_to_remove = ObjectID(req.params.id);

    db.collection("Contacts").findOneAndDelete(
      { _id: contact_to_remove },
      (err, data) => {
        if (err) res.send("Cant Delete conatct");
        else res.send("Contact  was Deleted");
      }
    );
  });

  app.put("/update_contact/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    let updated_contact = req.body;
    db.collection("Contacts").findOneAndUpdate(
      { _id: id },
      { $set: { ...updated_contact } },
      (err, data) => {
        if (err) res.send("Cant Update Contact");
        else res.send("Contact  was updated");
      }
    );
  });
});

app.listen(3000, err => {
  if (err) console.log("Server err !!");
  else console.log("Server is running on port 3000");
});
