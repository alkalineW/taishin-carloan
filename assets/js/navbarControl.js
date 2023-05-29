'use strict'

// const { element } = require("prop-types");

var isMobile = window.innerWidth < 1024

function _classCallCheck(e, t) {
  if (!(e instanceof t))
    throw new TypeError('Cannot call a class as a function')
}
function _defineProperties(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n]
    ;(o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, o.key, o)
  }
}
function _createClass(e, t, n) {
  return t && _defineProperties(e.prototype, t), n && _defineProperties(e, n), e
}

$(function () {
  var elm = $('.header .mobile-LR-btn .burgerbtn'),
    t = $('.header-main-top')
  function n() {
    $('body').toggleClass('header-open'),
      elm.toggleClass('active'),
      t.toggleClass('active iph-open'),
      !t.hasClass('iph-open') &&
        $('.header .header-mini-top').is(':visible') &&
        $('.header .header-mini-top').hide()
  }
  elm.on('click', function (e) {
    e.preventDefault(), n()
  })
  var o = 0
  var isMobile = window.innerWidth < 1024
  var scrollYval
  isMobile && (o = $('.header .header-top').height())
  isMobile &&
    $('.btn-nav-sec-1').click(function (e) {
      // e.preventDefault();
      n()
      console.log($(this).prop('href')) // this 指向 該 .btn-nav-sec-1
      var ancherHref = $(this).prop('href')
      var ancherSplits = ancherHref.split(/(\b[#])/)
      var targetSectionId = ancherSplits[ancherSplits.length - 1]
      console.log(targetSectionId)

      var targetDOM = document.getElementById(targetSectionId)

      var rect = targetDOM.getBoundingClientRect().top
      // console.log(Math.floor(rect));

      console.log(targetDOM)
      targetDOM.scrollIntoView()

      // window.scrollTo(0, rect);

      // $(".header-main-top").removeClass("iph-open");
      // $(".burgerbtn").removeClass("active");
    })
})

var Utils = (function () {
    function e() {
      _classCallCheck(this, e)
    }
    return (
      _createClass(e, null, [
        {
          key: 'getParameterByName',
          value: function (e) {
            e = e.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
            var t = new RegExp('[\\?&]'.concat(e, '=([^&#]*)')).exec(
              window.location.search
            )
            return null == t ? '' : decodeURIComponent(t[1].replace(/\+/g, ' '))
          },
        },
        {
          key: 'detectIE',
          value: function () {
            var e = window.navigator.userAgent,
              t = e.indexOf('MSIE ')
            if (t > 0)
              return parseInt(e.substring(t + 5, e.indexOf('.', t)), 10)
            if (e.indexOf('Trident/') > 0) {
              var n = e.indexOf('rv:')
              return parseInt(e.substring(n + 3, e.indexOf('.', n)), 10)
            }
            var o = e.indexOf('Edge/')
            return o > 0 && parseInt(e.substring(o + 5, e.indexOf('.', o)), 10)
          },
        },
      ]),
      e
    )
  })(),
  Index = (function () {
    function e() {
      _classCallCheck(this, e), this.init()
    }
    return (
      _createClass(e, [
        {
          key: 'init',
          value: function () {
            var e = this,
              t = 0
            isMobile.any && (t = $('.header .header-top').height())
            var n = 0
          },
        },
      ]),
      e
    )
  })()
$(function () {
  window.app = new Index()
})
