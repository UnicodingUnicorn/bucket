window.onload = function(){
var vm = new Vue({
	el : "#app",
	data : {
		message : ""
	}
});
};
$(document).ready(function() { 
$("#signup").ajaxForm({
	url : "/api/createuser",
	dataType : "json",
	success : function(response){
		console.log(response);
	},
	error : function(response){
		console.log(response);
	}
});
});