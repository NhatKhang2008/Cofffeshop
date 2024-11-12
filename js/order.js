import { categories } from "./data.js";
console.log("categories", categories);
const listCategoryId = document.getElementById("list-category");
function listCategories() {
  for (let i = 0; i < categories.length; i++) {
    listCategoryId.innerHTML += `<div class="list-item">
      <div class="item-name">${categories[i].name}</div>
      <div class="item-price">${categories[i].fruits.length}</div>
    </div>`;
  }
}
function listFruits() {
  const containerDrinks = document.getElementById("data-drinks");
  containerDrinks.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    // Tạo phần tử drinks và cấu trúc bên trong
    const drinks = document.createElement("div");
    drinks.classList.add("drinks");

    // Phần tiêu đề của drinks
    const drinksTitle = document.createElement("div");
    drinksTitle.classList.add("drinks-title");
    drinksTitle.innerHTML = `
      <div class="drinks-cata">${categories[i].name}</div>
      <div class="drinks-button">
        <i class="fa-solid fa-angle-down"></i>
      </div>
    `;

    // Phần drinks-grid chứa danh sách các loại đồ uống
    const drinkGrid = document.createElement("div");
    drinkGrid.classList.add("drinks-grid");

    for (let j = 0; j < categories[i].fruits.length; j++) {
      let fruit = categories[i].fruits[j];

      const drinkItem = document.createElement("div");
      drinkItem.classList.add("drink-1");

      drinkItem.innerHTML = `
        <div class="drink-image"> 
          <img src="https://tocotocotea.com/wp-content/uploads/2024/10/Sua-Tuoi-Nep-Cam.png" alt="${fruit.name}">
          <div class="drink-name">${fruit.name}</div>
          <div class="drink-price">
            <p>${fruit.price}</p>
            <div class="btn-increase"><i class="fa-solid fa-plus"></i></div>
          </div>
        </div>
      `;
      drinkGrid.appendChild(drinkItem); // Thêm từng drink-1 vào drinkGrid
    }

    // Thêm drinksTitle và drinkGrid vào drinks
    drinks.appendChild(drinksTitle);
    drinks.appendChild(drinkGrid);

    // Thêm drinks vào containerDrinks
    containerDrinks.appendChild(drinks);
  }
}
listCategories();
listFruits();
