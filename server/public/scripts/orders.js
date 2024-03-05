document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/orders")
    .then((response) => response.json())
    .then((orders) => renderOrders(orders))
    .catch((error) => console.error("Error fetching orders:", error));
});

function renderOrders(orders) {
  const context = { orders };

  const source = document.getElementById("orders-template").innerHTML;
  const template = Handlebars.compile(source);
  const html = template(context);

  document.querySelector(".flex-grow-1").innerHTML = html;
}
