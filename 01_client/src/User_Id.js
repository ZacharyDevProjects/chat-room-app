console.log(document.cookie);
let userId = document.cookie
  .split(";")
  .find((cookie) => cookie.includes("userID"));
if (userId) {
  userId = parseInt(userId.substring(userId.indexOf("=") + 1));
}
export default userId;
