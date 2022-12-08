var items = new Array();
var quanties = new Array();
function CreateOrder () {
    $("form").submit(function (event) {
    
            $('.items').each(function () {
                if (this.value != '')
                    items.push(this.value);
            });
            $('.qty').each(function () {
                if (this.value != '')
                quanties.push(this.value);
            });
      var formData = {
        company: $("#company").val(),
        date: $("#date").val(),
        items:JSON.stringify(items),
        qty: quanties,
        customer: $("#single").val(),
      };
      $.ajax({
        type: "POST",
        url: "new",
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

$(function(){
  const items = [];
  const order = {
    init:function(){
      this.dom();
      this.event();
    },
    dom:function(){
      $this = $(this);
      let $wrapper = $('#createOrder');
      $this.company =  $wrapper.find('.order_company');
      $this.date =  $wrapper.find('.order_date');
      $this.customer =  $wrapper.find('.single');
      $this.submitBtn = $wrapper.find('._submit');
      $this.MoreBtn = $wrapper.find('._submit');
    },
    event:function(){
      $this.submitBtn.on('click',this.add.bind(this));
      $('body').on('click','._addMoreBtn', this.more);
      $this.submitBtn.on('click',this.add.bind(this));
    },
    add:function(){
      alert('ok');
    },
    remove:function(){

    },
    submit:function(){

      const data = {
        company: $("#company").val(),
        date: $("#date").val(),
        items:JSON.stringify(items),
        qty: quanties,
        customer: $("#single").val(),
      };

      $.ajax({
        
      })
    },
    more:function(){
      $("#req_input").append('<div class="required_inp d-flex"><input name="items[]" placeholder="Enter Item description" class="items form-control" id="" type="text"><input name="qty[]" placeholder="Qty" class="qty form-control"  type="text">' + '<input type="button" class="btn btn-danger inputRemove" value="Remove"/></div>');
    }
  }
  order.init();

}());
  
  