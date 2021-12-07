export default (CONTAINER) => {
    CONTAINER.innerHTML = '';
    CONTAINER.insertAdjacentHTML('afterbegin', `
    <section class="main">
    <div class="container">
      <div class="main__contant">
        <h1 class="main__title">
        Explore your playground.
      </h1>
      <p class="main__desc">
        Our new Outdoors collection is built to keep you Doing Things when the going gets chilly.
      </p>
      </div>      
    </div>
  </section>
    `)

  
}

