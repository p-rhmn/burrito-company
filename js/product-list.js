class ProductList {
  products = [
    new Product(
      '0',
      'Burrito scharf',
      'lecker',
      'img/meals/burrito-meat.jpg',
      5.5,
      1
    ),
    new Product('1', 'Burrito mild', 'lecker', 'img/meals/taco.jpg', 3.7, 1),
    new Product(
      '2',
      'Burrito mittel',
      'lecker',
      'img/meals/burrito-salat.jpg',
      15,
      1
    ),
  ];
  basket = new Basket();

  constructor() {}

  render() {
    const menuEl = document.getElementById('menu-card-container');
    for (const [i, product] of this.products.entries()) {
      menuEl.innerHTML += `
      <div id="${i}" class="menu-card"><h4>${
        product.title
      }<span>Produktinfo</span></h4><p>${product.desc}</p><p>${
        product.title
      }</p><img class="meal-img" src="${
        product.imgpath
      }"><div class="menu-card-price">${
        product.price.toFixed(2).replace('.', ',') + '€'
      }</div><img class="add-icon" src="img/plus.png"><div class="img-overlay"></div></div>
      `;
    }
    this.addToBasket();
  }

  addToBasket() {
    const btnEl = document.getElementById('basket-submit-btn');
    document.querySelectorAll('.menu-card').forEach((item, i) => {
      item.addEventListener('click', () => {
        const currentEl = this.products.find((el) => el.id == i);
        const position = this.basket.selectedBurritos.indexOf(currentEl);
        if (position == -1 || this.basket.selectedBurritos.length == 0) {
          this.basket.selectedBurritos.push(currentEl);
          btnEl.disabled = false;
        } else {
          currentEl.amount++;
          btnEl.disabled = true;
        }
        this.basket.render();
      });
    });
  }
}
