$(function() { 
  function buildHTML(message){
    
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

 var reloadMessages = function() {
  last_message_id = $('.message:last').data("message-id");
  group_id = $(group.id)
  $.ajax({
    url: `groups/${group_id}/api/messages`,
    type: 'GET',
    dataType: 'json',
    data: {id: last_message_id},
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function (message) {
    insertHTML = buildHTML(message);
    $('.messages').append(insertHTML); 
    $('div').animate({scrollTop: $('.messages').height()})
    })
  })
  .fail(function () {
    alert('自動更新に失敗しました');
  });
  setInterval(reloadMessages, 5000);
  }  
});
   
