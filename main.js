document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".search input");
  const addBtn = document.querySelector(".search .btn-add");
  const list = document.querySelector(".li-container ul");
  const empty = document.querySelector(".empty");
  const counter = document.querySelector(".task-count");

  function updateCounter() {
    const itemCount = list.children.length;
    counter.textContent = itemCount;
    empty.style.display = itemCount === 0 ? "block" : "none";
  }

  function saveItemsLocal() {
    const items = Array.from(list.children).map((item) => item.textContent);
    localStorage.setItem("items", JSON.stringify(items));
  }

  function loadItemsLocal() {
    const storedItems = localStorage.getItem("items");
    if (storedItems) {
      JSON.parse(storedItems).forEach(addItemsToList);
    }
  }

  function addItemsToList(itemText) {
    const newItem = document.createElement("li");
    newItem.innerHTML = `<p>${itemText}</p><button class="btn-delete">x</button>`;

    newItem.querySelector(".btn-delete").addEventListener("click", function () {
      newItem.remove();
      updateCounter();
      saveItemsLocal();
    });
    list.appendChild(newItem);

    list.style.display = "block";
    updateCounter(); 
  }

  addBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const itemText = input.value;
    if (itemText !== "") {
      addItemsToList(itemText);
      saveItemsLocal();
      input.value = "";
    }
  });
  loadItemsLocal();

});
