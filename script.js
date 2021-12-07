import main from './components/mainPage.js';
import { products } from './components/products.js';
import { cartPage } from './components/cart.js';
import { header } from './components/header.js';
import { getCookie } from './utils.js';

class App {
    constructor() {
        this.menu = [
            {
                name: 'Main',
                element: document.createElement('li'),
                action: main,
            },
            {
                name: 'Products',
                element: document.createElement('li'),
                action: () => products(this.data),
            },
            {
                name: 'Cart',
                element: document.createElement('li'),
                action: () => cartPage(this.data),
            },
        ],
        this.container = document.createElement('main');
        this.data = {
            products: [],
            cartList: getCookie('cart') || [],
        }
    }

    init() {
        header(this.menu);
        document.body.appendChild(this.container);
        if(location.hash) {
            checkHash(this.data);
        } else {
            main(this.container);
        }
    }
}

const app = new App();
export const CONTAINER = app.container;

app.init();
const data1 = app.data;

function checkHash(data) {
    const hash = location.hash;
    console.log(hash);

    if(hash === '#cart') {
        cartPage(data) 
    } else {
        if (hash === '#main') {
            main(CONTAINER)
        } else {
            if (hash.includes('#products')) {
                products(data);
            }
        }
    }
}

window.addEventListener('hashchange', () => checkHash(data1))

