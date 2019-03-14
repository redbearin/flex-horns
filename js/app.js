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
  allCreatures.forEach((animal) => {
    console.log(animal);
    $('#creature').append(animal.toHtml());
  });
}


function readJson (){
  $.get('data/page-1.json', 'json')
    .then( data => {
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
  for(let i=0; i<keywords.length; i++){
    $('select').append(`<option value="${keywords[i]}">${keywords[i]}</option>`);
  }
}

Creature.prototype.toHtml = function(){
  let $template = $('#creature-template').html();
  let compiledTemplate = Handlebars.compile($template);
  return compiledTemplate(this);
};

// creatureDataSet.forEach(creatureObject => {
//   allCreatures.push(new Creature(creatureObject));
// })


allCreatures.forEach(ourNewCreatureObject =>{
  $('creature').append(ourNewCreatureObject.toHtml());
});

// Creature.prototype.render = function() {
//   $('main').append('<div class="clone"></div>');
//   let creatureClone = $('div[class="clone"]');
//   let creatureHtml = $('#creature-template').html();
//   creatureClone.html(creatureHtml);

//   creatureClone.find('h2').text(this.title);
//   creatureClone.find('img').attr('src', this.image_url);
//   creatureClone.find('img').attr('alt', this.keyword);
//   creatureClone.find('p').text(this.description);
//   creatureClone.removeClass('clone');
//   creatureClone.attr('class', this.keyword);
// }

/*------------------------------------------------------------------------------------------------------------------------------*/
$('select').on('change', function(){
  let $selection = $(this).val();
  console.log($selection);
  $('div').hide();
  $(`div[class="${$selection}"]`).show();
});


$(document).ready(function(){
  readJson();
  checkKeywords();
})
