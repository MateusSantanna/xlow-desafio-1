const apiUrl = "https://desafio.xlow.com.br/search/";
const productShowcase = document.querySelector("#productShowcase");
const productCount = document.querySelector("#productCount");

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
    console.error("Erro:", error);
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

    const productName = document.createElement("p");
    productName.innerText = product[0].productName;
    productName.classList.add("product-name");

    const divVariation = document.createElement("div");
    const productVariations = document.createElement("img");
    productVariations.classList.add("product-variations-img");
    productVariations.src = product[0].items[0].images[1].imageUrl;
    productVariations.alt = product[0].productName;

    // if (
    //   +product[0].items[0].sellers[0].commertialOffer.Price ==
    //   +product[0].items[0].sellers[0].commertialOffer.PriceWithoutDiscount
    // ) {
    //   const divPrice = document.createElement("div");
    //   const productPrice = document.createElement("span");
    //   productPrice.classList.add("product-price");
    //   productPrice.innerText = `R$ ${product[0].items[0].sellers[0].commertialOffer.Price}0`;
    // }

    // else {
    //   const divPriceWithoutDiscount = document.createElement("div");
    //   const productPrice = document.createElement("span");
    //   productPrice.classList.add("product-price");
    //   productPrice.innerText = `R$ ${product[0].items[0].sellers[0].commertialOffer.Price}0`;
    // }

    const divPrice = document.createElement("div");
    const productPrice = document.createElement("span");
    productPrice.classList.add("product-price");
    productPrice.innerText = `R$ ${product[0].items[0].sellers[0].commertialOffer.Price}0`;

    const divButton = document.createElement("div");
    const productButton = document.createElement("button");
    productPrice.classList.add("product-button");
    productButton.innerText = "Comprar";

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(divVariation);
    productCard.appendChild(divPrice);

    productCard.appendChild(divButton);

    divVariation.appendChild(productVariations);
    divPrice.appendChild(productPrice);
    divButton.appendChild(productButton);

    productShowcase.appendChild(productCard);
  });

  productCount.textContent = `Temos ${products.length} produtos`;
}

document.addEventListener("DOMContentLoaded", fetchProducts);
