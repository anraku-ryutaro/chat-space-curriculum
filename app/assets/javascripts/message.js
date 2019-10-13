$(function(){ 
  function buildHTML(message){
  
   if ( message.image ) {

    var image = "";

    image = (message.image) ? `<img class="lower-message__image" src="${ massage.image }">`: "";

    var html =
    `<div class='chatroom__body-message clearfix' data-message-id="${message.id}">
        <div class='chatroom__body--message-name'>
            ${message.name}
        </div>
        <div class='chatroom__body--message-time'>
            ${message.created_at}
        </div>
        <div class='chatroom__body--message-body'>
            <p>${message.content}</p>
            ${image}
        </div>
    </div>`
  return html;
   };
 }
$('.js-form').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });
});