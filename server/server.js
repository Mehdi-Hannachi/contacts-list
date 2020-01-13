const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const assert = require("assert");

const app = express();

app.use(bodyParser.json());

const mongo_url = "mongodb://localhost:27017";
const dataBase = "Contacts-List";

MongoClient.connect(mongo_url, { useUnifiedTopology: true }, (err, client) => {
  assert.equal(err, null, "Data base connexion failed");

  const db = client.db(dataBase);

  app.post("/new_contact", (req, res) => {
    let newContact = req.body;
    db.collection("Contacts")
      .insertOne(newContact)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });

  app.get("/show_contacts", (req, res) => {
    db.collection("Contacts")
      .find()
      .toArray()
      .then(data => res.send(data))
      .catch(err => res.send("Cant fetch Contacts"));
  });

  app.get("/show_contact/:id", (req, res) => {
    const { id } = req.params;
    console.log("id", id);
    db.collection("Contacts")
      .findOne({ _id: ObjectID(id) })
      .then(contact => {
        res.send(contact);
        console.log("contact", contact);
      })
      .catch(err => res.send(err));
  });

  app.delete("/delete_contact/:id", (req, res) => {
    let contact_to_remove = ObjectID(req.params.id);

    db.collection("Contacts")
      .findOneAndDelete({ _id: contact_to_remove })
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });

  app.put("/update_contact/:id", (req, res) => {
    let id = ObjectID(req.params.id);
    let updated_contact = req.body;
    db.collection("Contacts")
      .findOneAndUpdate({ _id: id }, { $set: { ...updated_contact } })
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
});

app.listen(4000, err => {
  if (err) console.log("Server err !!");
  else console.log("Server is running on port 4000");
});
