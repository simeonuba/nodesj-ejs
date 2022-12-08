 function Update(){

        $("form").submit(function (event) {
    
          var formData = {
          
            fullname: $("#fullname").val(),
            city: $("#city").val(),
            state: $("#state").val(),
            phone: $("#phone").val(),
            address: $("#address").val()
          };
          $.ajax({
            type: "POST",
            url: "/user/update",
            data: formData,
            dataType: "json",
            success: function (result) {
                $('#target').html('<div class="alert alert-success">' + result.message + '</div>');
                setTimeout(function() {
                    document.getElementById('target').style.display='none';
                }, 5000);
            },
            error: function (response) {
              
              $('#target').html('<div class="alert alert-danger">Error Submitting the form</div>');
      
      
      
            }
          });
          event.preventDefault();
        });
    
}