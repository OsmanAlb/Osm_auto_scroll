const navClassName = "nav"
   navLinkClassName = "nav-link"
   navLinkActiveClassName = "nav-link-active"
   sectionClassName = "section"
   navNode = document.querySelector(`.${navClassName}`)
   navLinkNodes = document.querySelectorAll(`.${navLinkClassName}`)
   navActiveLinkNode = document.querySelector(`.${navLinkActiveClassName}`)
   sectionNodes = document.querySelectorAll(`.${sectionClassName}`);
let indexActiveLink = 0, scrollAnimationId, currentScroll = window.scrollY;
function changeNavActiveLink(n) {
    for (let n = 0; n < navLinkNodes.length; n++)
        navLinkNodes[n].classList.remove(navLinkActiveClassName);
    n.classList.add(navLinkActiveClassName)
}
function setActiveLinkByScroll() {
    var e = Array.from(sectionNodes).map(n=>n.offsetTop);
    let i = 0;
    for (let n = 0; n < e.length; n++)
        window.scrollY >= e[n] && (i = n);
    indexActiveLink !== i && (indexActiveLink = i,
    changeNavActiveLink(navLinkNodes[indexActiveLink]))
}
function startAnimationScroll(n) {
    var e = n - currentScroll;
    currentScroll += .15 * e,
    window.scrollTo(0, currentScroll),
    1 < Math.abs(e) ? scrollAnimationId = window.requestAnimationFrame(()=>startAnimationScroll(n)) : (window.scrollTo(0, n),
    stopAnimationScroll())
}
function stopAnimationScroll() {
    window.cancelAnimationFrame(scrollAnimationId),
    scrollAnimationId = void 0
}
changeNavActiveLink(navLinkNodes[indexActiveLink]),
navNode.addEventListener("click", n=>{
    n.preventDefault();
    const e = n.target.closest("a");
    e && (stopAnimationScroll(),
    changeNavActiveLink(e),
    currentScroll = window.scrollY,
    n = e.getAttribute("href").substring(1),
    startAnimationScroll(document.getElementById(n).offsetTop))
}
),
window.addEventListener("scroll", ()=>{
    scrollAnimationId || setActiveLinkByScroll()
}
);
