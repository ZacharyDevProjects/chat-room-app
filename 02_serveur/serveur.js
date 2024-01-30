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
  console.log("appelle de la fonciton authenticate");
  const userIdFromCookie = await req.cookies.userId;
  if (userIdFromCookie) {
    console.log("User ID found in cookie:", userIdFromCookie);
    return next();
  } else {
    console.log("User ID not found in cookie. Generating new ID...");
    const userId = await generaterandomId();
    res.cookie("userId", userId, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
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

app.use(cookieParser());

app.get("/", authenticate, function (req, res) {
  // Si authenticate a été exécuté, on a accès au cookie
  // et on peut choisir de servir le fichier index.html manuellement.
  res.sendFile(path.join(__dirname, "../01_client/build", "index.html"));
});

// Utiliser express.static pour les autres fichiers statiques
app.use(express.static(path.join(__dirname, "../01_client/build")));

// Cette route ne sera atteinte que si la requête ne correspond à aucune route précédente.
// Elle sert le fichier index.html manuellement à partir du répertoire build.
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../01_client/build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
