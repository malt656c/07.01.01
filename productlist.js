/* url parameter */
const urlParams = new URLSearchParams(window.location.search);
let cat = urlParams.get("category");
/* filter*/
let productsShown = document.getElementById("productsShown");
let productCategorySelector = document.getElementById("categorySelector");
productsShown.onchange = () => {
  location.reload();
};
productCategorySelector.onchange = () => {
  location.reload();
};
/* side tal */
const nextPage = document.getElementById("nextPage");
let pageNumber = 0;
let productDataBase = `https://kea-alt-del.dk/t7/api/products/?limit=${productsShown.value}`;

nextPage.onclick = () => {
  pageNumber++;
  productDataBase += `&start=${pageNumber * productsShown.value}`;
  getdata();
};

/* kategori filter og url */
if (cat !== null) {
  productDataBase += `&category=${cat}`;
  productCategorySelector.parentElement.style.display = "none";
} else if (productCategorySelector.value !== "null") {
  productDataBase += `&category=${productCategorySelector.value}`;
}
/* hent og indsæt data */
function getdata() {
  fetch(productDataBase)
    .then((res) => res.json())
    .then(showProduct);
}
function showProduct(productData) {
  console.log(pageNumber);
  const gallery = document.querySelector(".productlist");
  const template = document.getElementById("product_card_template").content;
  console.log(productDataBase);
  productData.forEach((product) => {
    const product_card_clone = template.cloneNode(true);
    product_card_clone.querySelector(".discount").textContent = product.discount;
    product_card_clone.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    product_card_clone.querySelector("img").alt = product.productdisplayname;
    product_card_clone.querySelector(".brand").textContent = product.brandname;
    product_card_clone.querySelector(".name").textContent = product.productdisplayname;
    product_card_clone.querySelector(".price").textContent = product.price;
    product_card_clone.querySelector("a").href = `product.html?id=${product.id}`;

    if (product.soldout > 0) {
      product_card_clone.querySelector(".product_card").classList.add("soldout");
    }
    if (product.discount > 0) {
      product_card_clone.querySelector(".discountedPrice").textContent = Math.floor(product.price - (product.price / 100) * product.discount);
      product_card_clone.querySelector(".price").style.textDecoration = "line-through 3px red";
    }
    gallery.appendChild(product_card_clone);
  });
}
getdata();