
$(document).ready(function () {
  $("form").submit(function (event) {
  
    var formData = {
      firstname: $("#firstname").val(),
      lastname: $("#lastname").val(),
      address: $("#address").val(),
      city: $("#city").val(),
      state: $("#state").val(),
      password: $("#password").val(),
      cpassword: $("#cpassword").val(),
      email: $("#email").val(),
      phone: $("#phone").val(),
      superheroAlias: $("#superheroAlias").val(),
    };
    $.ajax({
      type: "POST",
      url: "/user/signup",
      data: formData,
      dataType: "json",
      success: function (result) {
        if (result.code === 0) {
          $('#target').html('<div class="alert alert-danger">' + result.message + '</div>');
          console.log(result.data)
        } else {
            console.log(result.data)
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

