window.addEventListener('scroll', ()=> {
    let nav = document.querySelector(".nav");
    nav.classList.toggle("navFixed", window.scrollY > 300);
})
