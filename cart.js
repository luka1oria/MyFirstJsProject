document.addEventListener("scroll", () => {
  let navBar = document.querySelector(".navBar");
  if (window.scrollY > 50) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
});
function showSidebar() {
  let sideBar = document.querySelector(".sideBar");
  sideBar.style.display = "flex";
}
function hideSidebar() {
  let sideBar = document.querySelector(".sideBar");
  sideBar.style.display = "none";
}

let cartItems = document.querySelector(".cartItem");
let totalPrice = document.querySelector(".total h2");
cartItems.innerHTML = "";
JSON.parse(sessionStorage.getItem("cart")).map(
  (item) => (cartItems.innerHTML += cartItem(item))
);
sumPrice();
function removeFromCart(itemId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  cart = cart.filter((item) => item.id != itemId);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  cart.map((item) => (cartItems.innerHTML += cartItem(item)));
  // console.log("Cart after removal:", cart);
}

function increaseQuantity(itemId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let item = cart.find((item) => item.id == itemId);
  item["quantity"]++;
  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartHTML();
  sumPrice();
}

function decreaseQuantity(itemId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let item = cart.find((item) => item.id == itemId);

  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter((cartItem) => cartItem.id != itemId);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
  updateCartHTML();
  sumPrice();
}

function sumPrice() {
  let sum = 0;
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.map((item) => (sum += item.price * item.quantity));
  totalPrice.innerHTML = `Total:${sum}$`;
}

function cartItem(item) {
  return `
        <tr>
            <td>
                <div class="product-container">
                    <div class="actions">
                        <button onClick="removeFromCart(${item.id})">❌</button>
                        <button>✏️</button>
                    </div>
                    <img src="${item.image}">
                    <span><strong>${item.name}</strong></span>
                </div>
            </td>
            <td>
                <div class="qty-container">
                    <button onClick="increaseQuantity(${item.id})">➕</button>
                    <span>${item.quantity}</span>
                    <button onClick="decreaseQuantity(${item.id})">➖</button>
                </div>
            </td>
            <td>${item.price}$</td>
            <td>${item.price * item.quantity}$</td>
        </tr>
    `;
}

function updateCartHTML() {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  let cartItems = document.querySelector(".cartItem");

  cartItems.innerHTML = "";
  cart.forEach((item) => (cartItems.innerHTML += cartItem(item)));
}
