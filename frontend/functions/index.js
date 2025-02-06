const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));

// Create User
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const docRef = await db.collection("users").add({ name, email });
  res.json({ id: docRef.id, name, email });
});

// Read Users
app.get("/users", async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(users);
});

// Update User
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("users").doc(id).update(req.body);
  res.json({ id, ...req.body });
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  await db.collection("users").doc(id).delete();
  res.json({ id });
});

exports.api = functions.https.onRequest(app);
