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
const io = new Server({
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.listen(server);

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

app.post("/chat", async function (req, res) {
  try {
    // const userId = req.body.userId;
    // const isAuthenticated = await authenticate(userId);
    // if (isAuthenticated) {
    const { data, error } = await supabase
      .from("post")
      .select()
      .order("id", { ascending: true });
    if (error) {
      return res.status(500).json({
        error: `Error fetching data from Supabase`,
      });
    }
    return res.json(data);
    // } else {
    // console.log("cookie setup");
    // return res
    //   .status(500)
    //   .json({ error: "activer les cookies ou recharger la page svp" });
    // }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/post", async (req, res) => {
  const receivedData = req.body.message;
  const userId = req.body.userId;
  // console.log(`message: ${receivedData} \nuserID: ${userId}`);
  const { error } = await supabase
    .from("post")
    .insert({ message: receivedData, user_post_ID: userId });
  if (error) {
    console.log("les données ne sont pas enregistrer");
    console.log(error.message);
  } else {
    console.log(`message enregister: ${receivedData}`);
  }
});

io.on("connection", (socket) => {
  console.log("salut user");
  //send a message to the client
  socket.emit("hello", "world");

  socket.on("disconnect", (arg) => {
    console.log(arg);
  });
  socket.on("send", (arg) => {
    io.emit("update", arg);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
