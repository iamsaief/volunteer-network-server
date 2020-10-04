const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e8uzr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect((err) => {
	const eventsCollection = client.db("volunteerNetwork").collection("eventsCollection");
	console.log("DB connected 🚀");

	/* API: Register Volunteer */
	app.post("/registerVolunteer", (req, res) => {
		const newVolunteer = req.body;
		eventsCollection.insertOne(newVolunteer).then((result) => {
			console.log(result, "Product Inserted ✅");
			res.send(result.insertedCount > 0);
		});
	});

	/* API: Getting events by email */
	app.get("/events", (req, res) => {
		console.log(req.query.email);
		eventsCollection.find({ email: req.query.email }).toArray((error, documents) => {
			res.send(documents);
			console.log(error);
		});
	});

	/* API: Deleting event task */
	app.delete("/deleteTask/:id", (req, res) => {
		console.log(req.params.id);
		eventsCollection.deleteOne({ _id: ObjectId(req.params.id) }).then((result) => {
			console.log(result, "Deleted ⚠️");
			res.send(result.deletedCount > 0);
		});
	});
});

app.listen(port);
