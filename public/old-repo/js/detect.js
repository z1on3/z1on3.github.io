
function detect(){
		var x=document.querySelectorAll("#wq");
		var h=997;
		var w=window.innerWidth;
		if(w<h){
			//alert("small screen");
			for (i = 0; i < x.length; i++) {
  				x[i].className="left-align";
			}
		}else{
			//alert("Big screen");
			for (i = 0; i < x.length; i++) {
  				x[i].className="right-align";
			}
		}
		
}
detect();
window.addEventListener('resize', detect);