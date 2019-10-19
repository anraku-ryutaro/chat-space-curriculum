$(function() { 
  function buildHTML(message){
    // console.log(message)
    var image = (message.image) ? `<img class="lower-message__image" src="${message.image}">`: "";

    var html =
    `<div class="message" data-message-id="${message.id}">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${message.name}
    </div>
    <div class="upper-message__date">
    ${message.created_at}
    </div>
    </div>
    <div class="lower-message">
    <p class="lower-message__content">
    ${message.content}
    </p>
    ${image}
    </div>
    </div>`
  return html;
 }
 
$('#new_message').on('submit', function(e){
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

 $(function(){
 var reloadMessages = function() {
  var last_message_id = $('.message:last').data('message-id');
  // group_id = $(".group").data("group-id");
  // console.log(group_id)
  $.ajax({
    url: 'api/messages',
    type: 'GET',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function (message) {
    insertHTML = buildHTML(message);
    $('.messages').append(insertHTML); 
    $('div').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
  })
  .fail(function () {
    alert('自動更新に失敗しました');
  });
}; 
setInterval(reloadMessages, 5000);
});
});
