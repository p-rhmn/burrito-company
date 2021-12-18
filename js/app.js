
class App {
    static init() {
      const menuList = new ProductList();
      const basket = new Basket();
      basket.openDiscount();
      basket.render();
      menuList.render();
    }
  }
  
  App.init();
  

  window.onscroll = function () {
    if (window.pageYOffset > 72) {
      document.getElementById("side-basket").style = `top: 0;`;
    } else {
      document.getElementById("side-basket").style = `top: 72px`;
    }
  };