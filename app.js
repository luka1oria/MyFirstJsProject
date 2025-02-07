let cards = document.querySelector(".cards");
let categories_button = document.querySelectorAll(".categories button");

fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
  .then((answer) => answer.json())
  .then((finalData) => {
    cards.innerHTML = "";
    finalData.forEach((item) => (cards.innerHTML += cardCode(item)));
    attachAddToCartEvents();
  });

function cardCode(item) {
  return `<div class='card' data-id="${item.id}">
    <div class='imgContainer'>
        <img width="150px" src="${item.image}">
    </div>
    <div class="titleWrapper">
        <h4>${item.name}</h4>
    </div>
    <p>Spiciness: ${item.spiciness}</p>
    <div class="cardCheckbox">
        <input type="checkbox" id="vegy" ${
          item.vegeterian ? "checked" : ""
        } disabled>
        <label for="vegeterian" style="font-size: 15px;">Vegetarian</label>
        <input type="checkbox" id="Nuts" ${item.nuts ? "checked" : ""} disabled>
        <label for="no-nuts" style="font-size: 15px;">Nuts</label>
    </div>
    <h3>${item.price}$</h3>
    <button class="addToCart" data-id="${item.id}" data-name="${
    item.name
  }" data-price="${item.price}" data-image="${item.image}">Add To Cart</button>
</div>`;
}

function attachAddToCartEvents() {
  // console.log("clicked");
  let cartButtons = document.querySelectorAll(".addToCart");
  cartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      let item = {
        id: this.getAttribute("data-id"),
        name: this.getAttribute("data-name"),
        price: this.getAttribute("data-price"),
        image: this.getAttribute("data-image"),
        quantity: 1,
      };

      addToCart(item);
    });
  });
}

function addToCart(item) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  let existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    // console.log("asdasdads");
    existingItem.quantity += 1;
  } else {
    console.log(item);
    cart.push(item);
  }

  sessionStorage.setItem("cart", JSON.stringify(cart));
}

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

function getFoodCategoryId(id) {
  cards.innerHTML = null;
  if (id) {
    fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
      .then((answer) => answer.json())
      .then((finalData) => {
        finalData.products.forEach(
          (item) => (cards.innerHTML += cardCode(item))
        );
        // console.log(finalData);
      });
  } else {
    fetch("https://restaurant.stepprojects.ge/api/Products/GetAll")
      .then((answer) => answer.json())
      .then((finalData) => {
        // console.log(finalData);
        finalData.forEach((item) => (cards.innerHTML += cardCode(item)));
      });
  }
}

function applyFilter() {
  const spiciness = document.getElementById("spiciness").value;
  const noNuts = document.getElementById("noNuts").checked;
  const vegeterian = document.getElementById("vegeterian").checked;

  getFilteredFood(vegeterian, noNuts, spiciness);
}

function getFilteredFood(vegeterian, nuts, spiciness) {
  cards.innerHTML = null;
  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegeterian}&nuts=${nuts}&${
      spiciness != "0" && `spiciness=${spiciness}`
    }`
  )
    .then((answer) => answer.json())
    .then((finalData) => {
      // console.log(finalData);
      finalData.forEach((item) => (cards.innerHTML += cardCode(item)));
    });
}
