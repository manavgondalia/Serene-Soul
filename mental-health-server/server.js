const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const facultyRoutes = require("./routes/facultyRoutes");
const picRoutes = require("./routes/picRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("API is running!");
});

app.use("/faculty-advisor", facultyRoutes);
app.use("/pic", picRoutes);
app.use("/student", studentRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
