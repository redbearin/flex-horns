'use strict';

var allCreatures = [];
var keywords = [];
/*Rendering images to HTML*/
function Creature(animal) {
  this.title = animal.title;
  this.image_url = animal.image_url;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}


Creature.loadCreatures = () => {
  console.log('loadCreatures function',allCreatures);
  allCreatures.forEach(creature => creature.render());
  checkKeywords();
}


function readJson (){
  $.get('page-1.json', data => {
    data.forEach(item => {
      allCreatures.push(new Creature(item));
    });
  }).then(Creature.loadCreatures)
    .then(checkKeywords)
    .then(options);
}

let checkKeywords = function() {

  if (allCreatures.length !== 0) {
    for(let i = 0; i < allCreatures.length; i++){
      if(!keywords.includes(allCreatures[i].keyword)){
        keywords.push(allCreatures[i].keyword);
      }
    }
  }
}

function options() {
  console.log('creatures', allCreatures);
  console.log('keywords', keywords);

  for(let i=0; i<keywords.length; i++){
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

Creature.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let creatureClone = $('div[class="clone"]');
  let creatureHtml = $('#creature-template').html();
  creatureClone.html(creatureHtml);

  creatureClone.find('h2').text(this.title);
  creatureClone.find('img').attr('src', this.image_url);
  creatureClone.find('img').attr('alt', this.keyword);
  creatureClone.find('p').text(this.description);
  creatureClone.removeClass('clone');
  creatureClone.attr('class', this.keyword);
}

/*------------------------------------------------------------------------------------------------------------------------------*/
$('select[name="Creature"]').on('change', function(){
  let $selection = $(this).val();
  $('div').hide()
  $(`div[class="${$selection}"]`).show()
})


$(document).ready(function(){
  readJson();
  checkKeywords();
})
