

function AdminLogin() {
    $("form").submit(function (event) {

      var formData = {
      
        password: $("#password").val(),
        email: $("#email").val()
      };

      $.ajax({
        type: "POST",
        url: "/admins/login",
        data: formData,
        dataType: "json",
        success: function (result) {
          if (result.code === 0) {
            $('#target').html('<div class="alert alert-danger">' + result.message + '</div>');
          
          } else {
            window.location.href="/admins";
            $('#target').html('<div class="alert alert-success">' + result.message + '</div>');
          }
  
  
        },
        error: function (response) {
          
          $('#target').html('<div class="alert alert-danger">Error Submitting the form</div>');
  
  
  
        }
      });
      event.preventDefault();
    });
  };
  
  




function adminCreate() {
    alert('fggjyhh');
    $("form").submit(function (event) {
        alert('hhjj ');
      var formData = {
        
        password: $("#password").val(),
        email: $("#email").val(),
        
      };
   
      $.ajax({
        type: "POST",
        url: "/admins/create",
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
  };

  function adminBanUser() {
    alert('fggjyhh');
    $("form").submit(function (event) {
        alert('hhjj ');
      var formData = {
        
        id: $("#id").val()
        
      };
   
      $.ajax({
        type: "POST",
        url: "/admins/user/ban/id",
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
  };
  
  
