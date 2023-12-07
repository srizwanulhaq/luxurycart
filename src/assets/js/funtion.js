$(window).load(function() {
    $('#onPageLoad').hide();
  });
  
  $(".show-pass").on("click", function () {
    var type = $(this).prev("input").attr("type");
    if (type == "password") {
      $(this).prev("input").attr("type", "text");
      $(this).find("i").removeClass("fi-rr-eye").addClass("fi-rr-eye-crossed");
    } else {
      $(this).prev("input").attr("type", "password");
      $(this).find("i").removeClass("fi-rr-eye-crossed").addClass("fi-rr-eye");
    }
  });

  
const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);
const cursor = $(".custom-cursor");
// Cursor Event
/* ========== */
window.addEventListener("mousemove", ({pageY: Y, pageX: X}) => {
  cursor.style.top = `${Y}px`;
  cursor.style.left = `${X}px`;
})








// action dropdown ************

/*Dropdown Menu*/
$('.dropdown').click(function () {
  $(this).attr('tabindex', 1).focus();
  $(this).toggleClass('active');
  $(this).find('.dropdown-menu').slideToggle(300);
});
$('.dropdown').focusout(function () {
  $(this).removeClass('active');
  $(this).find('.dropdown-menu').slideUp(300);
});
$('.dropdown .dropdown-menu li').click(function () {
  $(this).parents('.dropdown').find('span').text($(this).text());
  $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
});
/*End Dropdown Menu*/


$('.dropdown-menu li').click(function () {
var input = '<strong>' + $(this).parents('.dropdown').find('input').val() + '</strong>',
msg = '<span class="msg">Hidden input value: ';
$('.msg').html(msg + input + '</span>');
}); 

windows.alert('hhh');

