import { categories } from "./data.js";
console.log("categories", categories);
const listCategoryId = document.getElementById("list-category");
let orderList = [];
function listCategories() {
  for (let i = 0; i < categories.length; i++) {
    listCategoryId.innerHTML += `<div class="list-item">
      <div class="item-name">${categories[i].name}</div>
      <div class="item-price">${categories[i].fruit_items.length}</div>
    </div>`;
  }
}

function listFruits() {
  const containerDrinks = document.getElementById("data-drinks");
  containerDrinks.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới

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

    for (let j = 0; j < categories[i].fruit_items.length; j++) {
      let fruit = categories[i].fruit_items[j];
      const drinkItem = document.createElement("div");
      drinkItem.classList.add("drink-1");
      drinkItem.setAttribute("data-id", fruit.id); // Thêm data-name

      drinkItem.innerHTML = `
        <div class="drink-image"> 
          <img src="${fruit.imgUrl}" alt="${fruit.name}">
          <div class="drink-name">${fruit.name}</div>
          <div class="drink-price">
            <p>${fruit.price}đ</p>
            <div class="btn-increase"><i class="fa-solid fa-plus"></i></div>
          </div>
        </div>
      `;

      // Thêm sự kiện click vào nút cộng để lấy data của item
      const btnIncrease = drinkItem.querySelector(".btn-increase");
      // btnIncrease.addEventListener("click", () => {
      //   const closePopup = document.getElementsByClassName("wrap-popup")[0];
      //   closePopup.setAttribute("style", "display:block");
      //   const fruitImgUrl = document.getElementById("fruit-img");
      //   const fruitName = document.getElementById("fruit-name");
      //   const fruitPrice = document.getElementById("fruit-price");
      //   const fruitInfor = document.getElementById("fruit-infor");
      //   fruitImgUrl.src = fruit.imgUrl;
      //   fruitName.textContent = fruit.name;
      //   fruitPrice.textContent = fruit.price;
      //   fruitInfor.textContent = fruit.name;

      // localStorage.setItem("fruitSelect", JSON.stringify(fruit));
      // const itemId = drinkItem.getAttribute("data-id");
      // console.log("Item Id:", itemId);
      // addToOrderList(itemId, fruit);
      // });
      btnIncrease.addEventListener("click", () => {
        const popupWrapper = document.querySelector(".wrap-popup");
        popupWrapper.style.display = "block";
        const fruitImgUrl = document.getElementById("fruit-img"); // Hiển thị popup
        const fruitName = document.getElementById("fruit-name");
        const fruitPrice = document.getElementById("fruit-price");
        const fruitInfor = document.getElementById("fruit-infor");

        // Cập nhật nội dung popup
        fruitImgUrl.src = fruit.imgUrl;
        fruitName.textContent = fruit.name;
        fruitPrice.textContent = fruit.price;
        fruitInfor.textContent = fruit.description || "Không có mô tả.";
        const addFruitCart = document.getElementById("add-fruit-cart");
        // addFruitCart.addEventListener("click", () => {
        //   const itemId = drinkItem.getAttribute("data-id");
        //   console.log("Thêm", {
        //     itemId,
        //     fruit,
        //   });
        //   addToOrderList(itemId, fruit);
        //   // popupWrapper.style.display = "none";
        // });
        // Xóa sự kiện cũ trước khi gắn sự kiện mới
        const newHandler = () => {
          const itemId = fruit.id;
          console.log("Adding to cart:", fruit);
          addToOrderList(itemId, fruit);
          popupWrapper.style.display = "none"; // Đóng popup
          addFruitCart.removeEventListener("click", newHandler); // Loại bỏ sự kiện sau khi click
        };

        addFruitCart.addEventListener("click", newHandler);
        // Đóng popup khi nhấn nút close
        const closeButton = document.getElementById("close-btn");
        closeButton.addEventListener("click", () => {
          popupWrapper.style.display = "none";
        });
      });

      // Thêm drinkItem vào drinkGrid
      drinkGrid.appendChild(drinkItem);
    }

    // Thêm drinksTitle và drinkGrid vào drinks
    drinks.appendChild(drinksTitle);
    drinks.appendChild(drinkGrid);

    // Thêm drinks vào containerDrinks
    containerDrinks.appendChild(drinks);
  }
}

function listOrder() {
  const container = document.getElementById("data-orders");
  container.innerHTML = ""; // Xóa nội dung cũ trước khi thêm mới

  orderList.forEach((order) => {
    // Tạo phần tử chứa thông tin order
    const orderInfo = document.createElement("div");
    orderInfo.classList.add("order-info");

    // Tạo phần tử chứa thông tin chi tiết order
    const orderDetails = document.createElement("div");
    orderDetails.classList.add("order-details");

    const orderName = document.createElement("p");
    orderName.classList.add("order-name");
    orderName.textContent = `${order.fruit.name} (M)`;

    const addRequests = document.createElement("p");
    addRequests.classList.add("add-requests");
    addRequests.textContent = `${order.option.sugar}% đường, ${order.option.ice}% đá`;

    const orderPrice = document.createElement("p");
    orderPrice.classList.add("order-price");
    orderPrice.textContent = `${order.fruit.price.toLocaleString()}đ x ${
      order.quantity
    } = ${(order.fruit.price * order.quantity).toLocaleString()}đ`;

    orderDetails.appendChild(orderName);
    orderDetails.appendChild(addRequests);
    orderDetails.appendChild(orderPrice);

    // Tạo phần tử chứa các nút tăng/giảm số lượng
    const orderAmounts = document.createElement("div");
    orderAmounts.classList.add("order-amounts");

    const btnDecrease = document.createElement("div");
    btnDecrease.classList.add("btn-increase");
    btnDecrease.innerHTML = '<i class="fa-solid fa-minus"></i>';
    btnDecrease.addEventListener("click", () => updateQuantity(order.id, -1));

    const quantityDisplay = document.createElement("p");
    quantityDisplay.textContent = order.quantity;

    const btnIncrease = document.createElement("div");
    btnIncrease.classList.add("btn-increase");
    btnIncrease.innerHTML = '<i class="fa-solid fa-plus"></i>';
    btnIncrease.addEventListener("click", () => updateQuantity(order.id, 1));

    orderAmounts.appendChild(btnDecrease);
    orderAmounts.appendChild(quantityDisplay);
    orderAmounts.appendChild(btnIncrease);

    // Thêm các phần tử vào orderInfo và container chính
    orderInfo.appendChild(orderDetails);
    orderInfo.appendChild(orderAmounts);
    container.appendChild(orderInfo);
  });
}
// Hàm cập nhật số lượng và render lại giao diện
function updateQuantity(id, change) {
  const order = orderList.find((order) => order.id === id);
  if (order) {
    order.quantity = Math.max(1, order.quantity + change); // Đảm bảo số lượng không nhỏ hơn 1
    listOrder(); // Render lại giao diện sau khi cập nhật số lượng
  }
}

// Hàm thêm item vào orderList hoặc tăng quantity nếu đã tồn tại
function addToOrderList(itemId, fruitData) {
  const existingOrder = orderList.find((order) => {
    return order.fruit.id == itemId;
  });
  if (existingOrder) {
    // Nếu sản phẩm đã tồn tại trong orderList, tăng quantity
    existingOrder.quantity += 1;
  } else {
    // Nếu chưa có trong orderList, thêm mới với quantity là 1
    orderList.push({
      id: orderList.length + 1,
      quantity: 1,
      option: { sugar: 100, ice: 100 }, // Giá trị mặc định, có thể tùy chỉnh
      fruit: fruitData,
    });
  }

  // Cập nhật lại danh sách order (render lại nếu cần)
  listOrder();
  console.log("Order List:", orderList); // Kiểm tra kết quả
}

const deletedAll = document.getElementById("deleted-all");
deletedAll.addEventListener("click", () => {
  orderList = [];
  listOrder();
});

const closePopup = document.getElementById("close-btn");
closePopup.addEventListener("click", () => {
  const closePopup = document.getElementsByClassName("wrap-popup")[0];
  closePopup.setAttribute("style", "display:none");
});
// Khởi chạy hàm listOrder để hiển thị danh sách order
listOrder();
listCategories();
listFruits();
