const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
var cors = require("cors");
const { error } = require("console");

const app = express();
const server = createServer(app);

const supabaseUrl = "https://xqdgtlvgwwfttuvaoaed.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZGd0bHZnd3dmdHR1dmFvYWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwMDM3MDAsImV4cCI6MjAyMTU3OTcwMH0.DqXkLYJJS-dmBCYA6TD1aW4yMllD_R9nhJIywyIRRRM";
const supabase = createClient(supabaseUrl, supabaseKey);

const port = process.env.PORT || 5000;
const corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.1.34:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

async function authenticate(userIdFromCookie) {
  console.log("appelle de la fonciton authenticate");
  if (userIdFromCookie !== undefined) {
    console.log("User ID found in cookie:", userIdFromCookie);
    return true;
  } else {
    // console.log("User ID not found in cookie. Generating new ID...");
    // const userId = await generaterandomId();
    // res.cookie("userId", userId, {
    //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    // });
    // console.log("New User ID set in cookie:", userId);
    return false;
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
      const { error } = await supabase.from("users").insert({ id: randomId });
      if (error) {
        console.log("donnée évaporer");
        console.log(error.message);
      } else {
        console.log("bien jouer");
      }
    } else {
      console.log("ID is not unique. Generating a new one...");
    }
  }
  return randomId;
}

app.post("/chat", async function (req, res) {
  try {
    const userId = req.body.userId;
    const isAuthenticated = await authenticate(userId);
    if (isAuthenticated) {
      const { data, error } = await supabase.from("post").select();
      if (error) {
        return res.status(500).json({
          error: `Error fetching data from Supabase`,
        });
      }
      return res.json(data);
    } else {
      console.log("cookie setup");
      return res
        .status(500)
        .json({ error: "activer les cookies ou recharger la page svp" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/post", async (req, res) => {
  const receivedData = req.body.message;
  const userId = req.body.userId;
  console.log(`message: ${receivedData} \nuserID: ${userId}`);
  const { error } = await supabase
    .from("post")
    .insert({ message: receivedData, user_post_ID: userId });
  if (error) {
    console.log("les données ne sont pas enregistrer");
    console.log(error.message);
  } else {
    console.log("les données sont bien enregistrer");
  }
});

app.get("/definir-cookie", (req, res) => {
  res.cookie("test", "maValeur", { path: "/" });
  res.json("Cookie défini et envoyé au client");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
