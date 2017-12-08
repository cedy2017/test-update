$(document).ready(function() {
  // dialog control;
  $('[data-dialog]').click(function() {
    var id = $(this).data('dialog');
    $('#' + id).fadeIn(400);
    // trigger some event.
    // setTimeout(function() {
    //   $(window).resize();
    // },500);
  });
  $('.dialog-close').click(function(e){
    $(e.target).closest('.dialog-wrapper').fadeOut(400);
  });

  // disable right click
  $(document).contextmenu(function() {
    return false;
  });

  jQuery.validator.addMethod("cap", function(value, element) {
    return G.readCookie('cap') === value;
  }, "Invalid");

  jQuery.validator.addMethod("mobile", function(value, element) {
    return /^(\+|\d)\d{8,13}$/.test(value);
  }, "Invalid Number. e.g +8529100000");

  $('#captcha').click(function() {
    $(this).find('iframe').attr('src', '/captcha?st=' + Date.now());
  })
  // privacy adjust height
  // function resizePrivacy() {
  //   $.each($('.agree-terms-padding-left'), function(index, el) {
  //     var height = $(el).find('.agree-terms').height();
  //     $(el).height(height);
  //   });
  // }
  // resizePrivacy();
  // $(window).resize(function() {
  //   resizePrivacy();
  // });

  console.log('Sotheby\'s Version: 1.1.20; Update Date: 2017-12-08');
});

var G = {
  toThousands: function(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  },
  readCookie: function(cookieName) {
    var re = new RegExp('[; ]'+cookieName+'=([^\\s;]*)');
    var sMatch = (' '+document.cookie).match(re);
    if (cookieName && sMatch) return unescape(sMatch[1]);
    return '';
  },
  searchToObj: function(key) {
    var res = {}, loc = location.search;
    loc = loc.slice(1);
    loc = loc.split("&");
    for(var i = 0; i < loc.length; i++) {
      var s = loc[i];
      s = s.split('=');
      var val = decodeURIComponent(s[1]);
      if (val) {
        res[s[0]] = val.replace(/\+/g, ' ').replace(/%2B/g, '');
      }
    }
    if (key) return res[key];
    return res;
  },
  mNotic: function(message, type) {
    var el = document.createElement('div'),
        iconName = 'fa-check',
        $el = $(el);
    if (!type) {
      type = 'success';
    }
    $el.addClass('m-notification').append([
      '<div class="n-icon ' + type + '">',
      ' <i class="fa ' + (type == 'success' ? 'fa-check' : 'fa-times')+ '" aria-hidden="true"></i>',
      '</div>',
      '<p class="n-message">' + message +'</p>'
    ].join(''));
    $(document.body).append($el);
    setTimeout(function() {
      $el.css('right', '16px');
    }, 100);
    setTimeout(function() {
      $el.remove();
      $el = null;
    }, 3000);
    return $el;
  }
};
window.G = G;
