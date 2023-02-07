const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");
const productDataFromId = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch(productDataFromId)
  .then((res) => res.json())
  .then(showProductData);

function showProductData(productData) {
  const productDisplay = document.querySelector(".product_page");
  console.log(productData.id);
  productDisplay.querySelector(".discount").textContent = productData.discount;
  productDisplay.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
  productDisplay.querySelector("img").alt = productData.productdisplayname;

  productDisplay.querySelector(".price").textContent = productData.price;
  productDisplay.querySelector(".description").innerHTML = productData.description;
  productDisplay.querySelector(".name").textContent = productData.productdisplayname;

    productDisplay.querySelector(".brand").textContent = productData.brandname;
    productDisplay.querySelector(".category").textContent = productData.category;
    productDisplay.querySelector(".subcategory").textContent = productData.subcategory;
    productDisplay.querySelector(".articletype").textContent = productData.articletype;
    productDisplay.querySelector(".season").textContent = productData.season;
  if (productData.soldout > 0) {
    productDisplay.classList.add("soldout");
  }
  if (productData.discount > 0) {
    productDisplay.querySelector(".discountedPrice").textContent = Math.floor(productData.price - (productData.price / 100) * productData.discount);
    productDisplay.querySelector(".price").style.textDecoration = "line-through 3px red";
  }
}
