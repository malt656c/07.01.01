const productDataBase = `https://kea-alt-del.dk/t7/api/products/`;

fetch(productDataBase)
  .then((res) => res.json())
  .then(showProduct);

function showProduct(productData) {
  const gallery = document.querySelector(".productlist");
  const template = document.getElementById("product_card_template").content;
  productData.forEach((product) => {
    const product_card_clone = template.cloneNode(true);
    product_card_clone.querySelector(".discount").textContent = product.discount;
    product_card_clone.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    product_card_clone.querySelector("img").alt = product.productdisplayname;
    product_card_clone.querySelector(".brand").textContent = product.brandname;
    product_card_clone.querySelector(".name").textContent = product.productdisplayname;
    product_card_clone.querySelector(".price").textContent = product.price - product.discount;

    gallery.appendChild(product_card_clone);
  });
}

getProduct();
