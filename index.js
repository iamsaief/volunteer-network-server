const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.e8uzr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
	const eventsCollection = client.db("volunteerNetwork").collection("eventsCollection");
	console.log("DB connected 🚀");

	/* API: Register Volunteer */
	app.post("/registerVolunteer", (req, res) => {
		const newUser = req.body;
		console.log(newUser);
		console.log("Product Inserted ✅");
	});
});

app.listen(port);
