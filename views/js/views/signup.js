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
				Vue.http.post("/api/createuser", formData, {emulateJSON : true}).then(
					function(res){
						console.log("Success");
					},
					function(res){
						console.log("Error");
					}
				);
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