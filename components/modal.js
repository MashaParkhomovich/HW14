

export function openModal(htmlElement) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-wrapper">
        <div class="modal-box">
            <span class="close">x</span>
            <h1>Modal window</h1>
            
        </div>
    </div>
    `)
    const modalBox = document.querySelector('.modal-box');
    modalBox.appendChild(htmlElement);
    const close = document.querySelector('.close');
    close.addEventListener('click', closeModal);
}

function closeModal() {
    const modalWindow = document.querySelector('.modal-wrapper');
    modalWindow.remove();
    location.hash = `#products`
}
