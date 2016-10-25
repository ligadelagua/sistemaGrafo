// ====================================================
//   KL-Animate v1.1
//   author: Klerith
//   support page: http://codecanyon.net/user/klerith
// ====================================================

// Add the only css line that we need
document.write("<style>.klanimate{visibility:hidden}</style>");

(function(){

(function (factory) {
  if (typeof define == 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS
    module.exports = factory(require('jquery'));
  } else {
      // Browser globals
    factory(jQuery);
  }
}(function ($) {
  var inviewObjects = {}, viewportSize, viewportOffset,
      d = document, w = window, documentElement = d.documentElement, expando = $.expando, timer;

  $.event.special.inview = {
    add: function(data) {
      inviewObjects[data.guid + "-" + this[expando]] = { data: data, $element: $(this) };

      // Use setInterval in order to also make sure this captures elements within
      // "overflow:scroll" elements or elements that appeared in the dom tree due to
      // dom manipulation and reflow
      // old: $(window).scroll(checkInView);
      //
      // By the way, iOS (iPad, iPhone, ...) seems to not execute, or at least delays
      // intervals while the user scrolls. Therefore the inview event might fire a bit late there
      //
      // Don't waste cycles with an interval until we get at least one element that
      // has bound to the inview event.
      if (!timer && !$.isEmptyObject(inviewObjects)) {
         timer = setInterval(checkInView, 250);
      }
    },

    remove: function(data) {
      try { delete inviewObjects[data.guid + "-" + this[expando]]; } catch(e) {}

      // Clear interval when we no longer have any elements listening
      if ($.isEmptyObject(inviewObjects)) {
         clearInterval(timer);
         timer = null;
      }
    }
  };

  function getViewportSize() {
    var mode, domObject, size = { height: w.innerHeight, width: w.innerWidth };

    // if this is correct then return it. iPad has compat Mode, so will
    // go into check clientHeight/clientWidth (which has the wrong value).
    if (!size.height) {
      mode = d.compatMode;
      if (mode || !$.support.boxModel) { // IE, Gecko
        domObject = mode === 'CSS1Compat' ?
          documentElement : // Standards
          d.body; // Quirks
        size = {
          height: domObject.clientHeight,
          width:  domObject.clientWidth
        };
      }
    }

    return size;
  }

  function getViewportOffset() {
    return {
      top:  w.pageYOffset || documentElement.scrollTop   || d.body.scrollTop,
      left: w.pageXOffset || documentElement.scrollLeft  || d.body.scrollLeft
    };
  }

  function checkInView() {
    var $elements = [], elementsLength, i = 0;

    $.each(inviewObjects, function(i, inviewObject) {
      var selector  = inviewObject.data.selector,
          $element  = inviewObject.$element;
      $elements.push(selector ? $element.find(selector) : $element);
    });

    elementsLength = $elements.length;
    if (elementsLength) {
      viewportSize   = viewportSize   || getViewportSize();
      viewportOffset = viewportOffset || getViewportOffset();

      for (; i<elementsLength; i++) {
        // Ignore elements that are not in the DOM tree
        if (!$.contains(documentElement, $elements[i][0])) {
          continue;
        }

        var $element      = $($elements[i]),
            elementSize   = { height: $element.height(), width: $element.width() },
            elementOffset = $element.offset(),
            inView        = $element.data('inview'),
            visiblePartX,
            visiblePartY,
            visiblePartsMerged;

        // Don't ask me why because I haven't figured out yet:
        // viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
        // Even though it sounds weird:
        // It seems that the execution of this function is interferred by the onresize/onscroll event
        // where viewportOffset and viewportSize are unset
        if (!viewportOffset || !viewportSize) {
          return;
        }

        if (elementOffset.top + elementSize.height > viewportOffset.top &&
            elementOffset.top < viewportOffset.top + viewportSize.height &&
            elementOffset.left + elementSize.width > viewportOffset.left &&
            elementOffset.left < viewportOffset.left + viewportSize.width) {
          visiblePartX = (viewportOffset.left > elementOffset.left ?
            'right' : (viewportOffset.left + viewportSize.width) < (elementOffset.left + elementSize.width) ?
            'left' : 'both');
          visiblePartY = (viewportOffset.top > elementOffset.top ?
            'bottom' : (viewportOffset.top + viewportSize.height) < (elementOffset.top + elementSize.height) ?
            'top' : 'both');
          visiblePartsMerged = visiblePartX + "-" + visiblePartY;
          if (!inView || inView !== visiblePartsMerged) {
            $element.data('inview', visiblePartsMerged).trigger('inview', [true, visiblePartX, visiblePartY]);
          }
        } else if (inView) {
          $element.data('inview', false).trigger('inview', [false]);
        }
      }
    }
  }

  $(w).bind("scroll resize scrollstop", function() {
    viewportSize = viewportOffset = null;
  });

  // IE < 9 scrolls to focused elements without firing the "scroll" event
  if (!documentElement.addEventListener && documentElement.attachEvent) {
    documentElement.attachEvent("onfocusin", function() {
      viewportOffset = null;
    });
  }
}));


// kick the event to pick up any elements already in view.
// note however, this only works if the plugin is included after the elements are bound to 'inview'
$(function () {
    // $(window).scroll();
});


$.klAnimate = function( settings ){

	settings = $.extend({
		animation: "fadeIn",
		delay    : 0,
		rotation : 0,
		visible  : 0,
		scale    : 1,
		duration : 1,
		x : 0,
		y : 0,
    repeat: 0

	},settings)

	$(window).scroll();


	// $('.klanimate').bind('inview', function(e, isInView, visiblePartX, visiblePartY) {
	$(".klanimate").each(function(){

    $(this).bind('inview', function(e, isInView, visiblePartX, visiblePartY) {

        var elem = $(this);

        if (elem.data('inviewtimer')) {
          clearTimeout(elem.data('inviewtimer'));
          elem.removeData('inviewtimer');
        }

        klAnimate( $(this), settings );

        if (isInView) {


          elem.data('inviewtimer', setTimeout(function() {


            if (visiblePartY == 'top') {
              elem.data('seenTop', true);
            } else if (visiblePartY == 'bottom') {
              elem.data('seenBottom', true);
            } else {
              elem.data('seenTop', true);
              elem.data('seenBottom', true);
            }

            if (elem.data('seenTop') && elem.data('seenBottom')) {
              elem.unbind('inview');
             
            }
          }, 1000));
        }


    	});
  });

};


function klAnimate( $elem, settings ){
	
	if( $elem.data("done") === undefined ){
		$elem.attr("data-done","1");
	}else{
		return;
	}

	// ======== Attributes
	var animation = ( $elem.data("animation") !== undefined ) ? $elem.data("animation") : settings.animation;
	var delay     = ( $elem.data("delay") !== undefined ) ? $elem.data("delay") : settings.delay;
	var rotation  = ( $elem.data("rotation") !== undefined ) ? $elem.data("rotation") : settings.rotation;
	var visible   = ( $elem.data("visible") !== undefined ) ? $elem.data("visible") : settings.visible;
	var scale     = ( $elem.data("scale") !== undefined ) ? $elem.data("scale") : settings.scale;
  var duration  = ( $elem.data("duration") !== undefined ) ? $elem.data("duration") : settings.duration;
	var repeat    = ( $elem.data("repeat") !== undefined ) ? $elem.data("repeat") : settings.repeat;
	


	var x = ( $elem.data("x") !== undefined ) ? $elem.data("x") : 0;
	var y = ( $elem.data("y") !== undefined ) ? $elem.data("y") : 0;

	if( visible == "1" ){
		$elem.css({
			visibility: "visible"
		});
	}else{
		$elem.css({
			visibility: "visible",
			opacity: 0
		});
	}

	switch( animation ){
		case "elastic":
			animation = "Elastic.easeOut.config(1, 0.5)";
		break;

		case "bounce":
			animation = "Bounce.easeOut";
		break;

		case "slowmo":
			animation = "SlowMo.ease.config(0.7, 0.7, false)";
		break;

		case "circle":
			animation = "Circ.easeOut";
		break;

		case "back":
			animation = "Back.easeOut.config(2)";
		break;

		default:
			animation = "Power2.easeOut";
		break;

	}

  var tl1 = new TimelineMax();
  var tl2 = new TimelineMax({ repeat:repeat, yoyo:true }); //{repeat:-1, yoyo:true}

  tl1.to( $elem, duration, { opacity: 1, delay:delay } );

  setTimeout(function() {

    if( repeat != -1){

      tl2.to( $elem, duration, { rotation:rotation, ease: eval(animation) })
         .from( $elem, duration, { x:x, y:y, ease: eval(animation) }, "-="+duration)
         .from( $elem, duration, { scale: scale }, "-="+duration);

    }else{

      tl2.from( $elem, duration, { rotation:rotation, ease: eval(animation) })
         .from( $elem, duration, { x:x, y:y, ease: eval(animation) }, "-="+duration)
         .from( $elem, duration, { scale: scale }, "-="+duration);
    }


  }, delay * 1000 );

 //  var tl = new TimelineMax();
	// var tl2 = new TimelineMax();

	// tl.to( $elem, duration, { opacity: 1, delay:delay } )
	//   .to( $elem, duration, { rotation:rotation, ease: eval(animation) }, "-="+duration)
	//   .from( $elem, duration, { x:x, y:y, ease: eval(animation) }, "-="+duration)
	//   .from( $elem, duration, { scale: scale }, "-="+duration);


	if( $elem.data("number") !== undefined ){
		klAnimateNumber( $elem );
	}


}

function klAnimateNumber( $elem ){

	var toNumber = $elem.data("number");
	if( isNaN(toNumber) ){
		return;
	}

	var timer   = ( $elem.data("timer") !== undefined ) ? $elem.data("timer") : 2;
	var initial = ( $elem.data("initial") !== undefined ) ? $elem.data("initial") : 0;
	
	if( $elem.data("color") !== undefined ){
		var tl = new TimelineLite();
			tl.to( $elem, timer, { color: $elem.data("color") } );
	}

	timer *= 1000;
	// Animate the element's value from x to y:
	  $({newValue: initial }).animate({newValue: toNumber}, {
	      duration: timer,
	      easing:'swing',
	      step: function() { 
	          $elem.text(klSeparateNumberComa(Math.round(this.newValue)));
	      }
	  });	 
}

function klSeparateNumberComa(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
}


})();