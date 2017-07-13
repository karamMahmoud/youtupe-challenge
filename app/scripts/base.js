window.onscroll = function() {myFunction()};
function myFunction() {
    if (document.body.scrollTop > 440 || document.documentElement.scrollTop >440) {
            var navBar = document.getElementsByClassName("nav-bar-content")[0].classList.add('scrollerd-nav-bar-content');
            var navBtn = document.getElementsByClassName('md-nav-li')[0].getElementsByTagName('button')[0].classList.add('scroller-nav-btn');
            var navBtn = document.getElementsByClassName('md-nav-li')[0].getElementsByTagName('button')[0].classList.remove('nav-btn');
            var navImg = document.getElementsByClassName('nav-img')[0].classList.add('scrollerd-nav-img');
    }else{

            var navBtn = document.getElementsByClassName('md-nav-li')[0].getElementsByTagName('button')[0].classList.add('nav-btn');
            var navBtn = document.getElementsByClassName('md-nav-li')[0].getElementsByTagName('button')[0].classList.remove('scroller-nav-btn');
            var navBar = document.getElementsByClassName("nav-bar-content")[0].classList.remove('scrollerd-nav-bar-content');
            var navImg = document.getElementsByClassName('nav-img')[0].classList.remove('scrollerd-nav-img');

    }
}
