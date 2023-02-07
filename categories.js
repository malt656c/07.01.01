const productDataBase = `https://kea-alt-del.dk/t7/api/categories`;

fetch(productDataBase)
  .then((res) => res.json())
  .then(showcategories);

function showcategories(categories) {
  const categoryList = document.querySelector("ul");
  const template = document.getElementById("categoryTemplate").content;
  categories.forEach((type) => {
    const templateClone = template.cloneNode(true);
    templateClone.querySelector("a").textContent = type.category;
    templateClone.querySelector("a").href = `productlist.html?category=${type.category}`;

    categoryList.appendChild(templateClone);
  });
}
