
//etusivun kuvaruselli ****************************'

let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("carousel-item");
  console.log(slides);
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// määritellään sovelluksen sivut

let etusivu;
let haastesivu;
let profiilisivu;
let yhteyssivu;
let kirjsivu;
let rekistsivu;


etusivu = document.getElementById("etusivu");
haastesivu = document.getElementById("haaste");
profiilisivu = document.getElementById("profiili");
yhteyssivu = document.getElementById("yhteydenotto");
kirjsivu = document.getElementById("kirjaudu");
rekistsivu = document.getElementById("rekist");


// asetetaan vain kulloinen sivu näkyviin ja muut piiloon


/* //haastesivujen mahdolliset omat klikkausefektit
document.getElementById("etu").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});

/*
let likebutton = document.querySelectorAll(".btn-counter");

likebutton.addEventListener('click', function(e){

  data-count;
  /*
  for (let n=0; n<=likebutton.length; n++) {

  }
});*/

/*
 * Love button for Design it & Code it
 * http://designitcodeit.com/i/9
 */

/*
$( document ).ready(function() {


$('.btn-counter').on('click', function(event, count) {
  event.preventDefault();

  let $this = $(this),
      count = $this.attr('data-count'),
      active = $this.hasClass('active'),
      multiple = $this.hasClass('multiple-count');

  // First method, allows to add custom function
  // Use when you want to do an ajax request
  /* if (multiple) {
  $this.attr('data-count', ++count);
  // Your code here
  } else {
  $this.attr('data-count', active ? --count : ++count).toggleClass('active');
  // Your code here
  } */
/*
// Second method, use when ... I dunno when but it looks cool and that's why it is here
$.fn.noop = $.noop;
$this.attr('data-count', ! active || multiple ? ++count : --count  )[multiple ? 'noop' : 'toggleClass']('active');


});
});
*/

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  let x = document.getElementById("navigaatio");
  if (x.className === "navigaatio") {
    x.className += " responsive";
  } else {
    x.className = "navigaatio";
  }
}
/*
// Get the modal
let modal = document.getElementById('myModal');

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};*/


