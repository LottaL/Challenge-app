
//etusivun kuvaruselli ****************************'

let slideIndex = 0;
/*showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("carousel-item");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 5 seconds
}*/

// määritellään sovelluksen sivut

let etusivu;
let tietosivu;
let haastesivu;
let profiilisivu;
let yhteyssivu;
let kirjsivu;
let rekistsivu;
let haaste1;
let haaste2;


etusivu = document.getElementById("etusivu");
tietosivu = document.getElementById("tietoja");
haastesivu = document.getElementById("haaste");
profiilisivu = document.getElementById("profiili");
yhteyssivu = document.getElementById("yhteydenotto");
kirjsivu = document.getElementById("kirjaudu");
rekistsivu = document.getElementById("rekist");
haaste1 = document.getElementById("haaste1");
haaste2 = document.getElementById("haaste2");


// asetetaan vain kulloinen sivu näkyviin ja muut piiloon

document.getElementById("etu").addEventListener('click', function(e){
  etusivu.setAttribute("class", "visible");
  tietosivu.setAttribute("class", "hidden");
});

document.getElementById("tiet").addEventListener('click', function(e){
  etusivu.setAttribute("class", "hidden");
  tietosivu.setAttribute("class", "visible");
});

document.getElementById("haas").addEventListener('click', function(evt){

});

document.getElementById("prof").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});

document.getElementById("yht").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});

/*
document.getElementById("kirj").addEventListener('click', function(){
  rekistsivu.setAttribute("class", "hidden");
  kirjsivu.setAttribute("class", "visible");
});

document.getElementById("rek").addEventListener('click', function(){
  kirjsivu.setAttribute("class", "hidden");
  rekistsivu.setAttribute("class", "visible");
});
*/

/* //haastesivujen mahdolliset omat klikkausefektit
document.getElementById("etu").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});

document.getElementById("etu").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});

document.getElementById("etu").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});

document.getElementById("etu").addEventListener('click', function(evt){
  alert('Nappia' + evt.target + 'klikattu');
});
*/