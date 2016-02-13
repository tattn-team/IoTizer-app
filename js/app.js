// Global Settings
var ncmb = null;
var name = "";
var category = "";
var freshnessDate = "";
var Contents;
// Set up
$(function() {
	$.getJSON("settings.json", function(data) {
		ncmb = new NCMB(data.application_key, data.client_key);
        Contents = ncmb.DataStore("Contents");
        Contents.equalTo("*")
          .fetchAll()
          .then(function(foods) {
            var foodList = document.getElementById("foodList");
            var fragment = document.createDocumentFragment();
            for(var cnt=0, len=foods.length; cnt<len; cnt++ ){

                var $li = document.createElement('li');
                var $a = document.createElement('a');
                $a.href = "#form";
                // $a.setAttribute('onClick', 'clickEvent()');
                $a.className = 'item-link';
                $a.id = foods[cnt].objectId;
                var $div1 = document.createElement('div');
                $div1.className = 'item-content';
                var $div2 = document.createElement('div');
                $div2.className = 'item-inner food_click';
                var $div3 = document.createElement('div');
                $div3.className = 'item-title';
                $div3.id = cnt.toString();
                var $p1 = document.createElement('span');
                $p1.className="name";
                $p1.innerHTML = foods[cnt].name;
                // var $p2 = document.createElement('span');
                // $p2.className="category";
                // $p2.innerHTML = foods[cnt].category;
                // var $p3 = document.createElement('span');
                // $p3.className="freshnessDate";
                // $p3.innerHTML = foods[cnt].freshnessDate;
                $div3.appendChild($p1);
                // $div3.appendChild($p2);
                // $div3.appendChild($p3);
                $div2.appendChild($div3);
                $div1.appendChild($div2);
                $a.appendChild($div1);
                $li.appendChild($a);
                fragment.appendChild($li); 
            }
            foodList.appendChild(fragment);
          })
          .catch(function(err){
              console.log(err);
          });

        Recipe = ncmb.DataStore("Recipe");
        Recipe.equalTo("*")
          .fetchAll()
          .then(function(recipe) {
            var recipeList = document.getElementById("recipeList");
            var fragment = document.createDocumentFragment();
            for(var cnt=0, len=recipe.length; cnt<len; cnt++ ){

                var $li = document.createElement('li');
                var $a = document.createElement('a');
                $a.href = "#recipe_form";
                $a.className = 'item-link';
                $a.id = recipe[cnt].objectId;
                var $div1 = document.createElement('div');
                $div1.className = 'item-content';
                var $div2 = document.createElement('div');
                $div2.className = 'item-inner';
                var $div3 = document.createElement('div');
                $div3.className = 'item-title';
                $div3.id = cnt.toString();
                var $p1 = document.createElement('span');
                $p1.className="name";
                $p1.innerHTML = recipe[cnt].name;
                $div3.appendChild($p1);
                $div2.appendChild($div3);
                $div1.appendChild($div2);
                $a.appendChild($div1);
                $li.appendChild($a);
                fragment.appendChild($li); 
            }
            recipeList.appendChild(fragment);
          })
          .catch(function(err){
              console.log(err);
          });
	});
});

$(document).on('click', '.food_click', function(){
  // clickイベントで発動する処理
  var foodName = document.getElementById("food-name");
  foodName.value = $(this).children().children().children().children()[0].innerHTML;
  foodName.className = this.id;
});


$(document).on('click', '#update', function(){
    var food = document.getElementById("food-name");
    document.getElementById(food.className).getElementsByClassName("name")[0].innerHTML = food.value;

    //update contents
    Contents.equalTo("objectId",food.className)
      .fetchAll()
      .then(function(content) {
        content[0].set("name", food.value);
        console.log(food.value);
        content[0].update();
      })
      .catch(function(err){
        console.log(err);
      });
});


$(document).on('click', '#delete', function(){
    if(window.confirm('本当に削除しますか？')){
        // delete content
        var food = document.getElementById("food-name");
        document.getElementById(food.className).remove()
        Contents.equalTo("objectId",food.className)
          .fetchAll()
          .then(function(content) {
            content[0].delete();
          })
          .catch(function(err){
            console.log(err);
          });
    }
    else{
    }
});