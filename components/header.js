export const header = (menu) => {
    const menuDOM = document.createElement('menu');
    document.body.appendChild(menuDOM);
    menu.map((item) => {
        const listItem = item.element;
        listItem.addEventListener('click', () => {
            location.hash = '#' + item.name.toLowerCase();
        });
        listItem.innerText = item.name;
        menuDOM.appendChild(listItem);
    })
}