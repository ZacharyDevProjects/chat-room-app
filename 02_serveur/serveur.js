const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();

const supabaseUrl = "https://xqdgtlvgwwfttuvaoaed.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZGd0bHZnd3dmdHR1dmFvYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMDM3MDAsImV4cCI6MjAyMTU3OTcwMH0.DqXkLYJJS-dmBCYA6TD1aW4yMllD_R9nhJIywyIRRRM";
const supabase = createClient(supabaseUrl, supabaseKey);

const port = process.env.PORT || 5000;

async function authenticate(req, res, next) {
  const userIdFromCookie = req.cookies.userId;
  if (userIdFromCookie) {
    console.log("User ID found in cookie:", userIdFromCookie);
    return next();
  } else {
    console.log("User ID not found in cookie. Generating new ID...");
    const userId = await generaterandomId();
    res.cookie("userId", userId);
    console.log("New User ID set in cookie:", userId);
    return next();
  }
}

async function generaterandomId() {
  let isUnique = false;
  let randomId;
  while (!isUnique) {
    randomId = Math.floor(Math.random() * 9000000 + 1000000);
    const { data, error } = await supabase
      .from("users")
      .select("id")
      .eq("id", randomId);
    if (data.length === 0) {
      isUnique = true;
      console.log("ID is unique:", randomId);
    } else {
      console.log("ID is not unique. Generating a new one...");
    }
  }
  return randomId;
}

app.use(cookieParser());
app.use(authenticate);
app.use(express.static(path.join(__dirname, "../01_client/build")));

app.get("*", (req, res) => {
  const monCookieValue = req.cookies.userId;
  console.log(`Handling request. User ID: ${monCookieValue}`);
  res.sendFile(path.join(__dirname, "../01_client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
