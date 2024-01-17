console.log("socket");

const socket = io();

socket.on("products", (data) => {
  console.log(data);
  data = data
    .map(
      (each) => `<div class="card" style="width: 18rem;">
  <img src="${each.photo}" class="card-img-top">
  <div class="card-body">
    <h5 class="card-title">${each.title}</h5>
  </div>
</div>`
    )
    .join("");
  console.log(data);
  document.querySelector("#products").innerHTML = data;
});

socket.on("new success", (message) => alert(message));

document.querySelector("#newProduct").addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const photo = document.querySelector("#photo").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;

  if (title || photo || price || stock) {
    const data = {};
    title && (data.title = title);
    photo && (data.photo = photo);
    price && (data.price = price);
    stock && (data.stock = stock);

    console.log(data);
    socket.emit("new product", data);
  } else {
    alert(
      "Por favor, complete al menos un campo antes de agregar un nuevo producto."
    );
  }
});
