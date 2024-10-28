const express = require("express");
const cookieParser = require("cookie-parser");
const { createClient } = require("@supabase/supabase-js");
const { createServer } = require("node:http");
var cors = require("cors");

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

app.post("/chat", async function (req, res) {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/post", async (req, res) => {
  const receivedData = req.body.message;
  const userId = req.body.userId;
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

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
