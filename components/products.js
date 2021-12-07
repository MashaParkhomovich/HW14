import { $, getCookie, setCookie } from "../utils";
import { CONTAINER } from "../script"
import { openModal } from "./modal";
import mainPage from "./mainPage";


const productCard = (data) => {
    let counter = 1;
    const block = $('section');
    const descBlock = $('div')
    const imgWrapper = $('div');
    imgWrapper.classList.add('modal-image-block');
    const img = new Image(150);
    img.src = data.image;
    imgWrapper.appendChild(img);
    const title = $('h2');
    title.innerText = data.title;
    const desc = $('p');
    desc.innerText = data.description;
    const counterBlock = $('div');
    counterBlock.classList.add('counter-block');
    const countMinus = $('span');
    countMinus.innerText = '—';
    const countPlus = $('span');
    countPlus.innerText = '+';
    const countText = $('strong');
    countText.innerText = counter;
    countMinus.addEventListener('click', () => {
        if (counter > 1) {
            counter--;
            countText.innerText = counter;
        }
    });
    countPlus.addEventListener('click', () => {counter++; countText.innerText = counter;})
    counterBlock.appendChild(countMinus);
    counterBlock.appendChild(countText);
    counterBlock.appendChild(countPlus);

    const btnAdd = $('button');
    btnAdd.innerText = 'Add to cart'


    btnAdd.addEventListener('click', () => {
        const cartList = getCookie('cart') || [];
        if(cartList?.find(item => item.id === data.id)) {
            alert('This product in the cart already')
        } else {
            cartList.push({
                id: data.id,
                count: counter
            })
            setCookie('cart', cartList)
        }
    })
    block.appendChild(imgWrapper);
    block.appendChild(descBlock);
    block.appendChild(counterBlock);
    block.appendChild(btnAdd);
    return block;
}

export const products = async (data) => {
    CONTAINER.innerHTML = '';
    CONTAINER.insertAdjacentHTML('afterbegin', `
        <h1> Products </h1>
    `)
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-wrapper');
    let products;
    if(localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    } else {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();

        localStorage.setItem('products', JSON.stringify(products));
    }

    await products.map((item) => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('card')
        const imgItem = new Image(150);
        imgItem.src = item.image;
        const title = document.createElement('h3');
        title.innerText = item.title;
        const price = document.createElement('strong');
        price.innerText = item.price;
        cardItem.appendChild(imgItem);
        cardItem.appendChild(title);
        cardItem.appendChild(price);
        cardItem.addEventListener('click', () => {
            location.hash = `#products/${item.id}`
        });
        cardsContainer.appendChild(cardItem);
    })
    CONTAINER.appendChild(cardsContainer);
    if(location.hash !== '#products') {
        const productId = location.hash.replace('#products/', '');
        const product = products.find((item) => item.id == productId);
        console.log(product);
        if(product) {
            const productHtml = productCard(product, data.cartList)
            openModal(productHtml)
        } else {
            alert('Sorry, we can`t find this product')
        }
    }
}
