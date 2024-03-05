document.querySelectorAll(".deleteButton").forEach((button) => {
  button.addEventListener("click", async (product) => {
    console.log(product.target);
    try {
      const { id } = product.target;
      const url = `/api/orders/${id}`;
      const opts = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      let response = await fetch(url, opts);
      response = await response.json();
      console.log(response);

      if (response.statusCode === 200) {
        alert(response.message);
        location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al eliminar el producto del carrito.");
    }
  });
});
