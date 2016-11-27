/**
 * Script to stick the Bootstrap 4 navbar to the top of the page on scroll
 * Bootstrap 4 removes support for the Affix.js script, so we need our own
 *
 * @link http://bootbites.com/articles/freebie-sticky-bootstrap-navbar-scroll-bootstrap-4
 */
$( document ).ready( function() {

  // Custom
  var stickyToggle = function( sticky, stickyWrapper, scrollElement ) {

    var win = $('#features').offset().top - 73;
    if( $(window).width() > $(window).height() && $(window).height() < 400 ) {
      // win = $('.jumbotron').height() - 73;
      $('.tagline').css( "font-size", "1.5em" );
      $('.demo-btn').css( {
        "font-size": "0.9em",
        "padding": "1em 2em"
      });
    }
    else if( $(window).width() < 575 ){
      $('.tagline').css( "font-size", "1.75em" );
      $('.demo-btn').css( {
        "font-size": "1.1em",
        "padding": "1em 3em"
      });
    }
    else {
      $('.tagline').css( "font-size", "2.25em" );
      $('.demo-btn').css( {
        "font-size": "1.1em",
        "padding": "1em 3em"
      });
    }

    if(sticky.hasClass( 'collapse' ) ) {
      var stickyTop = stickyWrapper.offset().top;
      var stickyHeight = 'auto';
    } else if( sticky.hasClass( 'in' ) ) {
      var stickyTop = stickyWrapper.offset().top;
      var stickyHeight = sticky.outerHeight();
    } else {
      var stickyTop = stickyWrapper.offset().top;
      var stickyHeight = sticky.outerHeight();
    }
    if( scrollElement.scrollTop() >= win ) {
      stickyWrapper.height( stickyHeight );
      sticky.addClass( "is-sticky" );
    } else {
      sticky.removeClass( "is-sticky" );
      stickyWrapper.height( 'auto' );
    }
  };

  // Find all data-toggle="sticky-onscroll" elements
  $( '[data-toggle="sticky-onscroll"]' ).each( function() {
    var sticky = $(this);
    // insert a hidden element to maintain actual top offset on each page
    var stickyWrapper = $( '<div>' ).addClass( 'sticky-wrapper' );

    sticky.before( stickyWrapper );
    sticky.addClass( 'sticky' );

    // Scroll & resize events
    $( window ).on( 'scroll.sticky-onscroll resize.sticky-onscroll', function() {
      stickyToggle( sticky, stickyWrapper, $(this) );
    });

    // On page load
    stickyToggle( sticky, stickyWrapper, $(window) );
  });

});
