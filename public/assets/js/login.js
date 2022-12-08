
$(document).ready(function () {
    $("form").submit(function (event) {

      var formData = {
      
        password: $("#password").val(),
        email: $("#email").val()
      };

      $.ajax({
        type: "POST",
        url: "/user/login",
        data: formData,
        dataType: "json",
        success: function (result) {
          if (result.code === 0) {
            $('#target').html('<div class="alert alert-danger">' + result.message + '</div>');
          
          } else {
            window.location.href="/user/account";
            $('#target').html('<div class="alert alert-success">' + result.message + '</div>');
          }
  
  
        },
        error: function (response) {
          
          $('#target').html('<div class="alert alert-danger">Error Submitting the form</div>');
  
  
  
        }
      });
      event.preventDefault();
    });
  });
  
  