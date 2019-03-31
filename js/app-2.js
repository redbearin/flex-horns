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

//sort creatures by title and then load
Creature.loadCreatures = () => {
  let sortedCreatures = allCreatures.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  sortedCreatures.forEach((animal) => {
    $('#creature').append(animal.toHtml());
  });
}

function readJson (){
  $.get('data/page-2.json', 'json')
    .then(data => {
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

allCreatures.forEach(element =>{
  $('creature').append(element.toHtml());
});

$('select').on('change', function(){
  let $selection = $(this).val();
  $('div').hide();
  $(`.${$selection}`).show();
});

//sorting by horns
$('button').on('click', function(){
  let sorted_horns = allCreatures.sort((a, b) => {
    return a.horns - b.horns;
  });
  $('div').hide();
  sorted_horns.forEach(element => {
    $('#creature').append(element.toHtml());
  });
});


$(document).ready(function(){
  readJson();
  checkKeywords();
})
