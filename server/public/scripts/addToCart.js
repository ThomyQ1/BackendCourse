const selectores = document.querySelectorAll(".addToCart");
selectores.forEach((selector) => {
  selector.addEventListener("click", async (product) => {
    try {
      const productId = product.currentTarget.id;
      const data = { product_id: product.target.id };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };

      let response = await fetch("/api/orders", opts);
      response = await response.json();
      console.log(response);

      if (response.statusCode === 401) {
        alert("Inicia sesión para continuar con la acción");
      } else {
        location.replace("/orders");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Se produjo un error al agregar el producto al carrito.");
    }
  });
});
