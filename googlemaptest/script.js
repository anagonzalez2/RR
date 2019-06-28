var map;
function initMap() {
 map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 25.7742658, lng: -80.1936589},
   zoom: 8
 });
}

button.on("click", go)

function go(){
 event.preventDefault();
 console.log("test");

}


var dfp_obj = {
       "user": {"post_code": "32217"},
       "path": {"page_url": "/maps/auto_route/"}
   };
   dataLayer.push(dfp_obj);
