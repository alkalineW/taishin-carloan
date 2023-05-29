// $(function () {
// ie seens not support svg classList add & remove
!(function () {
  function copyProperty(prop, from, to) {
    var desc = Object.getOwnPropertyDescriptor(from, prop);
    Object.defineProperty(to, prop, desc);
  }
  if (
    'classList' in HTMLElement.prototype &&
    !('classList' in Element.prototype)
  ) {
    // ie11
    copyProperty('classList', HTMLElement.prototype, Element.prototype);
  }
  if (
    'children' in HTMLElement.prototype &&
    !('children' in Element.prototype)
  ) {
    // webkit, chrome, ie
    copyProperty('children', HTMLElement.prototype, Element.prototype);
  }
  if (
    'contains' in HTMLElement.prototype &&
    !('contains' in Element.prototype)
  ) {
    // ie11
    copyProperty('contains', HTMLElement.prototype, Element.prototype);
  }
  if (
    'getElementsByClassName' in HTMLElement.prototype &&
    !('getElementsByClassName' in Element.prototype)
  ) {
    // ie11
    copyProperty(
      'getElementsByClassName',
      HTMLElement.prototype,
      Element.prototype
    );
  }
})();

if (!('classList' in document.documentElement)) {
  Object.defineProperty(HTMLElement.prototype, 'classList', {
    get: function () {
      var self = this;
      function update(fn) {
        return function (value) {
          var classes = self.className.split(/\s+/g),
            index = classes.indexOf(value);

          fn(classes, index, value);
          self.className = classes.join(' ');
        };
      }

      return {
        add: update(function (classes, index, value) {
          if (!~index) classes.push(value);
        }),

        remove: update(function (classes, index) {
          if (~index) classes.splice(index, 1);
        }),

        toggle: update(function (classes, index, value) {
          if (~index) classes.splice(index, 1);
          else classes.push(value);
        }),

        contains: function (value) {
          return !!~self.className.split(/\s+/g).indexOf(value);
        },

        item: function (i) {
          return self.className.split(/\s+/g)[i] || null;
        },
      };
    },
  });
}

// Create Element.remove() function if not exist
if (!('remove' in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}

// old browser do NOT support nodeList.forEach()
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0, l = this.length; i < l; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

//--prepend polyfill
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('prepend')) {
      return;
    }
    Object.defineProperty(item, 'prepend', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function prepend() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(
            isNode ? argItem : document.createTextNode(String(argItem))
          );
        });
        this.insertBefore(docFrag, this.firstChild);
      },
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

$('.step-img')
  .css('opacity', 0)
  .waypoint(
    function (direction) {
      let elementIndex = this.key.slice(-1, this.key.length);
      // console.log(elementIndex);
      let classLists = this.element.classList.value;
      if (direction === 'down') {
        let durationClass = null;
        switch (elementIndex) {
          case '0':
            durationClass = '';
            break;
          case '1':
            durationClass = 'animate__delay-1s';
            break;
          case '2':
            durationClass = 'animate__delay-2s';
            break;
          case '3':
            durationClass = '';
            break;
          case '4':
            durationClass = 'animate__delay-1s';
            break;
          default:
            durationClass = 'animate__delay-2s';
        }
        classLists.indexOf('hide-tablet') == 0
          ? this.element.classList.add('animate__fadeInLeft')
          : this.element.classList.add('animate__fadeInDown');
        // if durationClass excist
        durationClass
          ? this.element.classList.add('animate__animated', durationClass)
          : this.element.classList.add('animate__animated');
        // $(this.element).animate({ opacity: 1 });
      } else {
        this.element.classList.remove(
          'animate__animated',
          'animate__fadeInLeft',
          'animate__fadeInDown'
        );
        // $(this.element).animate({ opacity: 0 });
      }
    },
    {
      offset: '50%',
    }
  );

let offsetVal = '';

$('.sign-img')
  .css('opacity', 0)
  .waypoint(
    function (direction) {
      if (direction === 'down') {
        this.element.classList.add('animate__animated', 'animate__fadeInUp');
        $(this.element).animate({ opacity: 1 });
      } else {
        this.element.classList.remove('animate__animated', 'animate__fadeInUp');
        $(this.element).animate({ opacity: 0 });
      }
    },
    {
      offset: function () {
        console.log(this.element.clientHeight);
        const parentDomHeight = document.getElementById('sign-sec')
          .getBoundingClientRect.height;
        // let deviceInnerWidth = window.innerWidth;
        // let offsetVal = 123;
        // deviceInnerWidth > 1200
        //   ? (offsetVal = -parentDomHeight / 3)
        //   : (offsetVal = parentDomHeight);
        // alert(offsetVal);
        return parentDomHeight / 2;
      },
    }
  );

//-throttle when scroll
const throttle = (fn, delay) => {
  let time = Date.now();
  return () => {
    if (time + delay - Date.now() <= 0) {
      fn();
      time = Date.now();
    }
  };
};

// const infiniteItem = document.getElementById('infinite-building');
const switchBtn = document.querySelectorAll('.switch-href-btn');
// const modalAnchor = document.querySelectorAll('.modal-anchor');
// const mobileBankQrcode = document.getElementById('mobile-bank-qrcode');
let initXPositionOne = 0,
  initXPositionTwo = 0;
const movingImg = document.getElementById('infinite-building');
const movingSky = document.getElementById('infinite-sky');
const infiniteRoad = document.getElementById('infinite-road');
const kvCar = document.getElementById('kv-car');

// let infiniteMoving = (elmId, speed) => {
//   let movingImg = document.getElementById(elmId);
//   console.log(movingImg);
//   initXPosition += speed;

//   console.log(speed);
//   movingImg.style.backgroundPositionX = initXPosition + 'px';
//   requestAnimationFrame(function () {
//     infiniteMoving(elmId, speed);
//   });
// };

// function infiniteMoving(elmId, positionUnit) {
//   let animationTarget = document.getElementById(elmId);
//   initXPosition += positionUnit;
//   animationTarget.style.backgroundPositionX = initXPosition + 'px';
//   window.requestAnimationFrame(function () {
//     infiniteMoving(elmId, positionUnit);
//   });
// }

// function accerateInfiniteAnimation(speed) {
//   requestAnimationFrame(function () {
//     infiniteMoving('infinite-building', speed);
//   });
//   // window.requestAnimationFrame(infiniteMoving(infiniteItem, 0.5));
// }

let requestId;
let accerateStatus = false;

function startMoving() {
  // console.log(requestId);
  if (!requestId && !accerateStatus) {
    requestId = window.requestAnimationFrame(loop);
  } else if (!requestId && accerateStatus) {
    requestId = window.requestAnimationFrame(loopAccerate);
  } else {
    console.log(`requestId:${requestId}`);
  }
}

function loop() {
  requestId = false;
  initXPositionOne -= 0.6;
  initXPositionTwo -= 0.2;
  movingImg.style.backgroundPositionX = initXPositionOne + 'px';
  movingSky.style.backgroundPositionX = initXPositionTwo + 'px';
  infiniteRoad.style.backgroundPositionX = initXPositionOne * 2.2 + 'px';
  startMoving();
}

function loopAccerate() {
  requestId = false;
  initXPositionOne -= 1.6;
  initXPositionTwo -= 1.2;
  movingImg.style.backgroundPositionX = initXPositionOne + 'px';
  movingSky.style.backgroundPositionX = initXPositionTwo + 'px';
  infiniteRoad.style.backgroundPositionX = initXPositionOne * 2.2 + 'px';
  startMoving();
}

function stopMoving() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = undefined;
  }
}

const accerateBtn = document.getElementById('accerate-btn');

startMoving();

accerateBtn.addEventListener('mouseover', function () {
  accerateStatus = true;
  this.firstElementChild.src = './assets/img/pageItem/desc-btn-acc.gif';
  stopMoving();
  startMoving();
  kvCar.classList.add('accerated');
});

accerateBtn.addEventListener('mouseleave', function () {
  this.firstElementChild.src = './assets/img/pageItem/desc-btn.gif';
  stopMoving();
  startMoving();
  accerateStatus = false;
  kvCar.classList.remove('accerated');
});

// detect is mobile or not by navigator.userAgent information
function detectIfMobile() {
  const userAgent = navigator.userAgent;
  const mobileRegex = /i[p|P]hone|[a|A]ndroid|iPad|[m|M]obile|iPod|BlackBerry|webOs/i;
  return userAgent.match(mobileRegex) ? true : false;
}

// function generateQrcode(id, url) {
//   id.innerHTML = '';
//   new QRCode(id, {
//     text: url,
//     width: 128,
//     height: 128,
//     colorDark: '#3e281b',
//     colorLight: '#ffffff',
//     correctLevel: QRCode.CorrectLevel.H,
//   });
// }

// prevent anchor open url
// modalAnchor.forEach((elm) => {
//   elm.addEventListener('click', (evt) => {
//     evt.preventDefault();
//   });
// });

// switch plus / minus on collapse
function changeImgAttr(status, elmName) {
  // var src = './assets/img/pageItem/notice-';
  // status ? (src = src + 'minus.png') : (src = src + 'plus.png');
  // $(elmName).attr('src', src);
  var transformDesc;
  status
    ? (transformDesc = 'rotate(0deg)')
    : (transformDesc = 'rotate(180deg)');
  $(elmName).css('transform', transformDesc);
}

// $('#notice-content').on('show.bs.collapse', function () {
//   changeImgAttr(true, '#notice-content-icon');
// });
// $('#notice-content').on('hide.bs.collapse', function () {
//   changeImgAttr(false, '#notice-content-icon');
// });

// });
