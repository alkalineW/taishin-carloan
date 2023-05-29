$(function () {
  var $cookieBlockHeight = $('#cookie-accept-block').outerHeight();
  var $cookieOn;
  // var $transInTime='0.6s';
  // var $transInEase='';

  // add for side-btn-wrap
  var $sideBtnWrapHeight = $('#side-btn-wrap').outerHeight();

  if ($('.cookie-accept-block').length > 0) {
    $('.cookie-accept-block').css({
      bottom: '-' + $cookieBlockHeight + 'px',
    });
    // console.log($cookieBlockHeight)
    // console.log($sideBtnWrapHeight)
    $('#side-btn-wrap').css({
      bottom: $cookieBlockHeight + 10 + 'px',
    });
  }

  // setTimeout(function(){
  //     $('.cookie-accept-block').css({
  //         'transition': 'bottom '+$transInTime+' '+$transInEase
  //     });
  //     $('.n-wraper').css({
  //         'transition': 'padding-bottom '+$transInTime+' '+$transInEase
  //     });
  //     $('._taishin-v2 ._fastmenu').css({
  //         'transition': 'bottom '+$transInTime+' '+$transInEase
  //     });
  //     $('.ga-scroll-top-btn').css({
  //         'transition': 'bottom '+$transInTime+' '+$transInEase
  //     });
  // },50);

  /////////////////////////////////////////////////////
  //show
  /////////////////////////////////////////////////////
  function showCookieBlock() {
    $cookieOn = true;
    // if cookie-accept-block exist
    if ($('.cookie-accept-block').length > 0) {
      $('.cookie-accept-block').css({
        bottom: '0',
      });

      $('#side-btn-wrap').css({
        bottom: $cookieBlockHeight + 10 + 'px',
      });
    }

    // $('.n-wraper').css({
    //   // 'padding-bottom': 0 + 'px',
    //   'padding-bottom': $cookieBlockHeight + 'px',
    // });
    $('#notice-pos').css({
      // 'padding-bottom': 0 + 'px',
      'padding-bottom': $cookieBlockHeight + 'px',
    });

    if ($(window).width() < 1024) {
      $('#side-btn-wrap').css({
        bottom: 12 + $cookieBlockHeight + 'px',
      });
    } else {
      $('#side-btn-wrap').css({
        bottom: 10 + $cookieBlockHeight + 'px',
      });
    }
  }

  function hideCookieBlock() {
    $cookieOn = false;

    if ($('.cookie-accept-block').length > 0) {
      $('.cookie-accept-block').css({
        bottom: '-' + $cookieBlockHeight + 'px',
      });

      $('#side-btn-wrap').css({
        bottom: $cookieBlockHeight + 10 + 'px',
      });
    }

    //-----changed
    $('.n-wraper').css({
      'padding-bottom': '0',
    });

    if ($(window).width() < 576) {
      $('#side-btn-wrap').css({
        bottom: 8 + 'px',
      });
      // $('.n-wraper').css({
      //   'padding-bottom': 8 + $sideBtnWrapHeight + 'px',
      //   'background-color': '#d70c18',
      // })
    } else {
      $('#side-btn-wrap').css({
        bottom: 66 + 'px',
      });
    }
    $('.cookie-accept-block').remove();
  }

  $(window).on('resize', function () {
    if ($cookieOn) {
      $cookieBlockHeight = $('#cookie-accept-block').outerHeight();

      // re-take  $sideBtnWrapHeight
      $sideBtnWrapHeight = $('#side-btn-wrap').outerHeight();
      showCookieBlock();
    } else {
      $sideBtnWrapHeight = $('#side-btn-wrap').outerHeight();
      hideCookieBlock();
    }
  });

  if (!$.cookie('cookie-accepted')) {
    showCookieBlock();
  }

  // showCookieBlock();

  $('.cookie-accept-block__btn').on('click', function (e) {
    e.preventDefault();
    $.cookie('cookie-accepted', 'true', { path: '/' });
    hideCookieBlock();
  });
});
