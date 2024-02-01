let userId = document.cookie
  .split(";")
  .find((cookie) => cookie.includes("userId"));
userId = parseInt(userId.substring(userId.indexOf("=") + 1));

export default userId;
