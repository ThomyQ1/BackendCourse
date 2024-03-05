const google = document.querySelector("#google");
google.addEventListener("click", async () => {
  try {
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch("/api/sessions/google", opts);
    response = await response.json();
    console.log(response);
  } catch (error) {
    alert(error.message);
  }
});
