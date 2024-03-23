async function GetData(url = "", method = "GET") {
  const response = await fetch(url, {
    method: method,
    headers: {
      "User-Agent": "Awesome-Octocat-App",
    },
  });
  if (response.status == 200) {
    return response.json();
  } else if (response.status == 403) {
    console.error("Rate limit exceeded. Please wait and try again later.");
  }
}

export default GetData;
