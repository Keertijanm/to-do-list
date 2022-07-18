// To use the packages installed, we import
// them using require and save them in
// a const 
//1835Ja0133Nm,username-keertigupta
//mongodb+srv://keertigupta:<password>@task.romml.mongodb.net/?retryWrites=true&w=majority
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Initializing a constant to use express
// methods and create middlewares.
const app = express();

// Telling Node.js to use body-parser for
// reading data coming from our
// incoming requests in URL
app.use(bodyParser.urlencoded({ extended: true }));

// Telling Nodejs that all our static
// files(here: CSS files) are
// stored in public folder
app.use(express.static("public"));

// Telling Nodejs that we will write our
// frontend in ejs files. Thus viewing
// engine has to be set to use ejs
app.set("view engine", "ejs");
//mongodb connect 
// Make sure you did not use any special
// characters(e.g. @) in your user-name
// or password
mongoose.connect(
  "mongodb+srv://keertigupta:1835Ja0133Nm@task.romml.mongodb.net/?retryWrites=true&w=majority"
);

// Defining the schema or structure of
const taskSchema = {
	name: {
		type: String,
		required: true
	}
};

// Using the following code, node.js
// creates a collection named
// 'tasks' using the taskSchema
const Task = mongoose.model("task", taskSchema);
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  let today = new Date();
  let options = { weekday: "long", day: "numeric", month: "long" };
  let day = today.toLocaleDateString("en-US", options);

  Task.find({}, function (err, foundTasks) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { today: day, tasks: foundTasks });
    }
  });
});

app.post("/", function (req, res) {
  const taskName = req.body.newTask;
  if (taskName) {
    const task = new Task({
      name: taskName,
    });
    task.save().then(() => {
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  Task.findByIdAndRemove(checkedItemId, function (err) {
    if (!err) {
      console.log("Successfully deleted checked item.");
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server running at port 3000");
});

	// Getting today's date to display
	// on top of our to-do
	
	
	// If we do not use the first argument
	// in below line, which is "en-US" we get
	// date in form of numbers only, separated
	// with a /, thus the day won't be known

	// Find is a function given by mongoose, which
	// is applied to a collection, it returns
	// all the documents found in it.
	

			// Render the file names index.ejs and
			// send the object to with the following
			// data, sent as second parameter, in
			// which we send date
			// and tasks found in database.
		

    // Save the task using save method provided
    // by mongoose. It returns a promise, in
    // which we re-direct to home page. we write
    // it in then block to make sure that
    // we are redirected only when the save
    // method finished executing without any
    // error. Otherwise the item will be saved,
    // after we were redirected, thus, it will look
    // like the task was not added and thus we
    // will have to reload to see the newly added
    // task. Which can be exhausting.
   