// Global Settings
var ncmb = null;

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

            var name = foods[cnt].name;
            var freshnessDate = foods[cnt].freshnessDate;

            var $li = document.createElement('li');
            var $a = document.createElement('a');
            $a.href = "Form.html";
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
            $2 = document.createTextNode(freshnessDate.toString());

            $div3.appendChild($p1);
            $div3.appendChild($p2);
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
