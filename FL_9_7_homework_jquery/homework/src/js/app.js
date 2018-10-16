const $container = $('#container');

$.getJSON('data/media.json', fillPage);

function fillPage(data) {
  let length = data.media.length;
  let source = data.media;
  for (let i = 0; i < length; i++) {
  $container.append(`<div class="image-container hide" id="${source[i].id}">
    <img alt="${source[i].edge_media_to_caption}" class="image" 
              height="293px" width="293" src="${source[i].display_url}">
      <div class="hover-content">
        <span class="likes">${source[i].edge_liked_by.count}</span>
        <span class="comments">${source[i].edge_media_to_comment.count}</span>
      </div>
      </div>`);
  }
  $('.image-container').slice(0, 12).removeClass('hide');
  $('body').append(`<div id="viewMore" class="button"><a href="#" >View more</a></div`);

  $('#viewMore').on('click', function (e) {
    e.preventDefault();
    $('.image-container:hidden').slice(0, 6).slideDown();
    if ($('.image-container:hidden').length === 0) {
      $('#viewMore').fadeOut('slow');
    }
  });

  $('.image-container img').hover(function () {
    $(this).stop().animate({
        opacity: 0.6      
    }, 200);
    $('.hover-content').css('display', 'inline');
  }, function () {
      $(this).stop().animate({
        opacity: 1
      }, 500);
      $('.hover-content').css('display', 'none');
  });

  /*$('.image-container').on('click', function(e) {
    e.preventDefault();
    let alt = $(this).find('.image').attr('alt');
    let src = $(this).find('.image').attr('src');    
    let likes = $(this).find('.likes').text();
    $container.append(`<div class="modal" id="modal">
    <span class="close">&#9747;</span>
    
    <div class="modal-image">
    <img alt="${alt}" src="${src}">
    </div>
    <div class="user">
      <img alt="profile picture" src="${data.profile_pic_url}"
      <a href="#">${data.username}</a>
      <span>&#8901;</span>
      <a href="#">Follow</span>
    </div>
    <div class="modal-post">
      <a href="#">${data.username}</a>
      <div class="modal-post-text">${alt}</div>
    </div>
    <div>${likes} likes</div>
    <div class="input">
      <input type="text" placeholder="Add a comment...">
    </div>  
    </div>`);
    
  });

  $('.close').on('click', function() {
    $container.remove('#modal');
  });
  */
}