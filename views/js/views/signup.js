var vm = new Vue({
	el : "#app",
	data : {
		message : "";
	}
});
$("#signup").ajaxForm({
	url : "/api/createuser",
	dataType : "json",
	success : function(response){
		vm.message = response.message;
	}
});