document.querySelector("#signout").addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/signout", opts);
    response = await response.json();
    if (response.statusCode === 200) {
      alert(response.message);
      localStorage.removeItem("token");
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
  }
});
