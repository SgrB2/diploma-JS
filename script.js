const getCardsFromLocalStorage = () => {
    const card = localStorage.getItem("card");

    if (card) {
        return JSON.parse(card);
    }

    return [];
};

const setCardsToLocalStorage = (cart) => {
    localStorage.setItem("card", JSON.stringify(cart));
};

const getTotalFromLocalStorage = () => {
    const totalPrice = localStorage.getItem("totalPrice");

    if (totalPrice) {
        return Number(totalPrice);
    }

    return 0;
};
const setTotalToLocalStorage = (total) => {
    localStorage.setItem("totalPrice", total.toFixed(2));
};

const cardsList = {
    cards: [
        {
            id: 1564,
            img: "https://basket-09.wb.ru/vol1204/part120458/120458578/images/c516x688/1.jpg",
            name: 'Бомбер женский оверсайз "Peace" Куртка',
            price: '364,21',
        },
        {
            id: 4564,
            img: "https://basket-08.wb.ru/vol1147/part114704/114704168/images/c516x688/1.jpg",
            name: 'Фен для волос/аналог фена дайсон/dyson',
            price: '111,97',
            discount: '-24%',
            priceOld: '149,21',
        },
        {
            id: 8965,
            img: "https://basket-01.wb.ru/vol134/part13413/13413145/images/c516x688/1.jpg",
            name: 'Подводка-фломастер для глаз',
            price: '9,93',
        },
        {
            id: 7824,
            img: "https://basket-10.wb.ru/vol1341/part134176/134176281/images/c516x688/1.jpg",
            name: 'Дубленка зимняя из искусственного меха',
            price: '593,04',
            discount: '-30%',
            priceOld: '727,72',
        },
        {
            id: 2164,
            img: "https://basket-08.wb.ru/vol1141/part114163/114163277/images/c516x688/1.jpg",
            name: 'Полотенце махровое банное',
            price: '55,72',
        },
        {
            id: 7921,
            img: "https://basket-03.wb.ru/vol425/part42563/42563673/images/c516x688/1.jpg",
            name: 'Подарочный набор уходовой косметики',
            price: '40,41',
        },
        {
            id: 6984,
            img: "https://basket-02.wb.ru/vol179/part17902/17902726/images/c516x688/1.jpg",
            name: 'Чайник из жаропрочного стекла',
            price: '17,41',
            discount: '-4%',
            priceOld: '18,18',
        },
        {
            id: 5644,
            img: "https://basket-02.wb.ru/vol214/part21449/21449335/images/c516x688/3.jpg",
            name: 'Маска для лица очищающая',
            price: '13,87',
            discount: '-19%',
            priceOld: '17,27',
        },
        {
            id: 3294,
            img: "https://basket-10.wb.ru/vol1356/part135602/135602840/images/c516x688/1.jpg",
            name: 'Джемпер',
            price: '84,93',
        },
        {
            id: 1871,
            img: "https://basket-08.wb.ru/vol1130/part113005/113005900/images/c516x688/1.jpg",
            name: 'Светодиодная лента rgb led диодная подсветка',
            price: '18,72',
        },
    ],

    findItem(name) {
        return this.cards.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
    },
};

const cartItems = {
    items: getCardsFromLocalStorage(),

    total: getTotalFromLocalStorage(),

    create(item) {
        this.items.unshift(item);
        setCardsToLocalStorage(this.items);
    },

    deleteById(id) {
        let priceDel = this.items.find((item) => item.id == id)
        priceDel = priceDel.price.replace(/\,/g, '.')
        this.total += - priceDel;
        setTotalToLocalStorage(this.total)

        this.items = this.items.filter((item) => item.id !== id);
        setCardsToLocalStorage(this.items);
    },
    deleteAll() {
        this.items = [];
        this.total = 0;
        setCardsToLocalStorage(this.items);
        setTotalToLocalStorage(this.total);

    },
    totalPrice(price) {
        this.total += +price.replace(/\,/g, '.');
        setTotalToLocalStorage(this.total);  
    },
};

const cardsContainer = document.querySelector('.cards_container');

const rendermainPage = (cards) => {
    cardsContainer.innerHTML = '';

    cards.forEach((elem) => {
        cardsContainer.innerHTML += ` 
        <div class="card" data-id=${elem.id}>
            <img src=${elem.img} alt=${elem.name}">
            <div class="card_info">
                <span class="price">${elem.price} p.</span>
                <p>
                     ${elem.name}
                </p>
             </div>
            <button class="addCart">В корзину</button>
         </div>
     `;
    })
};

const renderDiscountPrice = () => {

    const allCards = document.querySelectorAll('.card');

    const listDiscount = cardsList.cards.filter((e) => e.discount);

    for (let i = 0; i < allCards.length; i++) {

        listDiscount.filter((e) => {

            const discount = document.createElement('span');
            discount.classList = 'discount';
            discount.textContent = `${e.discount}`;
            const priceOld = document.createElement('span');
            priceOld.classList = 'priceOld';
            priceOld.textContent = `${e.priceOld} p.`;

            if (allCards[i].getAttribute("data-id") == e.id) {
                allCards[i].children[1].children[1].before(discount);
                discount.after(priceOld);
            }
        });
    }
}

rendermainPage(cardsList.cards);
renderDiscountPrice();

const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
    card.addEventListener('mouseover', function (event) {
        if (event.target.tagName === 'BUTTON') {
            event.target.style.backgroundColor = '#ee2cd4';
            event.target.previousElementSibling.children[0].style.color = '#ee2cd4';
        }
    })
    card.addEventListener('mouseout', function (event) {
        if (event.target.tagName === 'BUTTON') {
            event.target.style.backgroundColor = '#cb11ab';
            event.target.previousElementSibling.children[0].style.color = '#000';
        }
    })

});

const searchInput = document.getElementById('search');
const cart_bt = document.querySelector('.cart-shopping_container');
const cart_content = document.querySelector('.cart_content');

searchInput.addEventListener('input', function (e) {
    rendermainPage(cardsList.findItem(e.target.value))
});

cart_bt.addEventListener('click', function (e) {
    if (e.target.classList.contains("cart-bt") || e.target.classList.contains("fa-cart-shopping")) {
        cart_content.classList.toggle('active-cart');
    }
});

const renderItemCart = (i) => {
    return ` 
    <li class="cart_content_item">
      <article class="cart_product">
        <img class="cart_product_img" src=${i.img}>
        <h4 class="cart_product_title">
            ${i.name}
        </h4>
        <div class="cart_product_text">
          <button class="cart_product_del" data-id=${i.id}>&#10006;</button>
          <span class="cart_product_price">${i.price} p.</span>
        </div>
      </article>
    </li>
   `;
}

const cartTitle = document.querySelector('.cart_title');
const makeOrder = document.querySelector('.make_order')
const fullprice = document.querySelector('.fullprice');

const renderCart = () => {
    let cartContainer = document.querySelector(".carts_container");

    if (cartContainer === null) {
        cartContainer = document.createElement("div");
        cartContainer.classList = 'carts_container'
        cartTitle.after(cartContainer);
    }

    cartContainer.innerHTML = "";

    if (cartItems.items.length === 0) {
        cartContainer.innerHTML = `<h4 class="emptyt_cart_title">Корзина пуста...</h4>`;
    }

    const ul = document.createElement("ul");
    ul.classList.add("cart_content_list");

    ul.onclick = (e) => {
        const elemId = e.target.getAttribute("data-id");

        if (e.target.classList.contains("cart_product_del")) {
            cartItems.deleteById(+elemId);
            renderCart();
        };
    };
    makeOrder.onclick = () => {
        cartItems.deleteAll();
        renderCart();
        fullprice.innerHTML = `0 p.`
    };

    cartItems.items.forEach((e) => {
        ul.innerHTML += renderItemCart(e);
    });

    cartContainer.append(ul);

    fullprice.innerHTML = `${+cartItems.total.toFixed(2)} p.`

};

const addingToCart = () => {

    cards.forEach((card) => {
        card.addEventListener('click', function (event) {
            if (event.target.tagName === 'BUTTON') {
                cardsList.cards.forEach((e) => {
                    if (e.id !== +card.getAttribute("data-id")) {
                        return
                    };

                    if (cartItems.items.find((i) => i.id === e.id)) {
                        alert('Товар уже есть в корзине!')
                        return

                    } else {
                        cartItems.create(e);
                        cartItems.totalPrice(e.price);
                        renderCart();
                    };
                });
            };
        });
    });
};


addingToCart()
renderCart()

