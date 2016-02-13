// Global Settings
var ncmb = null;
var name = "";
var category = "";
var freshnessDate = "";

// Set up
$(function() {
	$.getJSON("settings.json", function(data) {
		ncmb = new NCMB(data.application_key, data.client_key);

    var Food = ncmb.DataStore("Food");
    Food.equalTo("*")
      .fetchAll()
      .then(function(foods) {

        var foodList = document.getElementById("foodList");
        var fragment = document.createDocumentFragment();
        for(var cnt=0, len=foods.length; cnt<len; cnt++ ){

            name = foods[cnt].name;
            category = foods[cnt].category;
            freshnessDate = foods[cnt].freshnessDate.toString();

            var $li = document.createElement('li');
            var $a = document.createElement('a');
            
            $a.href = "#form";
            $a.setAttribute('onClick', 'clickEvent()');
            $a.className = 'item-link';

            var $div1 = document.createElement('div');
            $div1.className = 'item-content';

            var $div2 = document.createElement('div');
            $div2.className = 'item-inner';

            var $div3 = document.createElement('div');
            $div3.className = 'item-title';

            var $p1 = document.createElement('p');
            $p1 = document.createTextNode(name);
            var $p2 = document.createElement('p');
            $p2 = document.createTextNode(category);
            var $p3 = document.createElement('p');
            $p3 = document.createTextNode("賞味期限まであと"+freshnessDate+"日");

            $div3.appendChild($p1);
            $div3.appendChild($p2);
            $div3.appendChild($p3);
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
	});
});

function clickEvent()
{
  var foodName = document.getElementById("food-name").value = name;
  var foodCategory = document.getElementById("food-category").value = category;
  var foodFreshnessday = document.getElementById("food-freshnessdate").value = freshnessDate;
}



