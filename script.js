const apiUrl = "https://desafio.xlow.com.br/search/";
const productShowcase = document.querySelector("#productShowcase");
const productCount = document.querySelector("#productCount");
const changeLayoutButton = document.createElement("button");
changeLayoutButton.innerText = "Alterar Layout";
changeLayoutButton.classList.add("change-layout-button");
document.body.insertBefore(changeLayoutButton, productShowcase);

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const products = await response.json();
    const productDetails = await Promise.all(
      products.map(async (product) => {
        const response = await fetch(apiUrl + product.productId);
        return response.json();
      }),
    );
    renderProducts(productDetails);
  } catch (error) {
    productShowcase.innerHTML = "Erro ao carregar produtos";
  }
}

async function renderProducts(products) {
  productShowcase.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.classList.add("product-thumb-img");
    productImage.src = product[0].items[0].images[0].imageUrl;
    productImage.alt = product[0].productName;

    productImage.addEventListener("click", () => {
      productImage.src =
        productImage.src === product[0].items[0].images[1].imageUrl
          ? product[0].items[0].images[0].imageUrl
          : product[0].items[0].images[1].imageUrl;
    });

    const productName = document.createElement("p");
    productName.innerText = product[0].productName;
    productName.classList.add("product-name");

    const divPrice = document.createElement("div");
    const productPrice = document.createElement("span");
    productPrice.classList.add("product-price");

    const price = product[0].items[0].sellers[0].commertialOffer.Price;
    const priceWithoutDiscount =
      product[0].items[0].sellers[0].commertialOffer.PriceWithoutDiscount;

    if (price < priceWithoutDiscount) {
      productPrice.classList.add("product-price-discount");
      productPrice.innerHTML = `R$ ${price.toFixed(2)} R$ ${priceWithoutDiscount.toFixed(2)}`;
    } else {
      productPrice.innerText = `R$ ${price.toFixed(2)}`;
    }

    const divButton = document.createElement("div");
    const productButton = document.createElement("button");
    productButton.classList.add("product-button");
    productButton.innerText = "Comprar";

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(divPrice);
    productCard.appendChild(divButton);
    divPrice.appendChild(productPrice);
    divButton.appendChild(productButton);
    productShowcase.appendChild(productCard);
  });
  productCount.textContent = `Temos ${products.length} produtos`;
}

changeLayoutButton.addEventListener("click", () => {
  productShowcase.classList.toggle("grid-changeList");
});

document.addEventListener("DOMContentLoaded", fetchProducts);
