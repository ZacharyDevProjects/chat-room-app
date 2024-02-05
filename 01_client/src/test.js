async function fetchData() {
  const data = await fetch("http://localhost:5000/chat");
  const treatedData = await data.json();
  console.log(treatedData);
}
fetchData();
