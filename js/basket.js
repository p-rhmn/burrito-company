class Basket {
  selectedBurritos = [];
  DISCOUNT5 = '11111';
  DISCOUNT10 = '22222';
  DISCOUNT15 = '33333';
  DELIVERY = 4.5;
  // finalSum = 0;
  sum = 0;

  constructor() {}

  render() {
    let basketOrder = document.getElementById('basket');
    basketOrder.innerHTML = '';

    if (!this.selectedBurritos.length == 0) {
      for (const [i, selectedItem] of this.selectedBurritos.entries()) {
        basketOrder.innerHTML += `
        <div id="basket-order${i}" class="basket-full"><span id="amount">${
          selectedItem.amount
        }</span> <span class="reduce-name">${
          selectedItem.title
        }</span><div><i class="far fa-minus-square pointer minus"></i>
        <i class="far fa-plus-square pointer plus"></i></div><span id="sum-order">${this.formatPrice(
          selectedItem.price * selectedItem.amount
        )}</span> <i class="fas fa-trash-alt pointer bin"></i></div>
              `;
      }
    } else {
      basketOrder.innerHTML = 'Wählen Sie ihre Lieblingsgerichte aus!';
    }
    document
      .getElementById('discount-btn')
      .addEventListener('click', () => this.onSubmit());

    this.addEvents();
    this.calcSum();
  }

  addEvents() {
    const plusIcons = document.querySelectorAll('.plus');
    const minusIcons = document.querySelectorAll('.minus');
    const binIcons = document.querySelectorAll('.bin');

    plusIcons.forEach((item, i) => {
      item.addEventListener('click', () => {
        this.increaseAmount(i, this.compareId(i));
      });
    });
    minusIcons.forEach((item, i) => {
      item.addEventListener('click', () => {
        this.decreaseAmount(i, this.compareId(i));
      });
    });
    binIcons.forEach((item, i) => {
      item.addEventListener('click', () => {
        this.deleteMeal(i, this.compareId(i));
      });
    });
  }

  compareId(i) {
    return this.selectedBurritos.find((el) => el.id == i);
  }

  calcSum() {
    this.selectedBurritos.forEach((item) => {
      this.sum += item.amount * item.price;
    });
    document.getElementById('sum').innerHTML = this.formatPrice(this.sum);
    this.calcFinalSum();
  }

  calcFinalSum() {
    const finalWrite = document.getElementById('final-sum');
    if (!this.selectedBurritos.length == 0) {
      finalWrite.innerHTML = this.formatPrice(this.sum + this.DELIVERY);
    } else {
      finalWrite.innerHTML = '0,00€';
    }
  }

  onSubmit() {
   
    const hintEl = document.getElementById('hint');
    const input = document.getElementById('discount').value;
    if (this.sum > 0) {
      if (input === this.DISCOUNT5) {
        this.applyDiscount(input, 15);
        // input.value = '';
      } else if (input === this.DISCOUNT10) {
        this.applyDiscount(input, 10);
      } else if (input === this.DISCOUNT15) {
        this.applyDiscount(input, 5);
      } else {
        hintEl.innerHTML = 'Dieser Code ist unbekannt';
      }
    }
  }

  applyDiscount(inputCode, setPercent) {
    const hintEl = document.getElementById('hint');
    const discount = document.getElementById('ersparniss');
    hintEl.innerHTML = `Gültiger Code ${inputCode} angewendet`;
    console.log(this.finalSum);
    discount.innerHTML =
      '-' + this.percentage(setPercent, this.sum + this.DELIVERY);
  }

  percentage(partialValue, totalValue) {
    return this.formatPrice((partialValue / 100) * totalValue);
  }

  formatPrice(price) {
    return price.toFixed(2).replace('.', ',') + '€';
  }

  openDiscount() {
    const input = document.getElementById('discount');
    const discountBtn = document.getElementById('discount-btn');
    input.addEventListener('input', () => {
      if (input.value.length >= 5) {
        discountBtn.disabled = false;
      } else {
        discountBtn.disabled = true;
      }
    });
  }

  increaseAmount(i) {
    this.selectedBurritos[i].amount++;
    this.render();
  }

  decreaseAmount(i) {
    if (this.selectedBurritos[i].amount <= 1) {
      this.deleteMeal(i);
    } else {
      this.selectedBurritos[i].amount--;
    }
    this.render();
  }

  deleteMeal(currentEl) {
    this.selectedBurritos.splice(currentEl, 1);
    this.render();
  }
}
