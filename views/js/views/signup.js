window.onload = function(){
	var vm = new Vue({
		el : "#app",
		data : {
			message : ""
		},
		methods : {
			signup : function(){
				var formData = {
					username : $("#username").val(),
					password : $("#password").val(),
					unit : $("#unit").val()
				};
				console.log(formData);
			}
		}
	});
	
};
/*$(document).ready(function() { 
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
});*/