$( document ).ready( function() {

    // $( 'body' ).scrollspy( { target: '#main-nav' } );

    /**
     * Set an 'active' class for ALL links that are clicked on
     */
    $( 'a' ).click(function() {
       $( 'a.active' ).removeClass( 'active' );
       $(this).addClass( 'active' );
    });

    /* Turn on active state on the correct link when scrolling */
    /* @link:  http://codetheory.in/change-active-state-links-sticky-navigation-scroll/ */
    var sections = $( 'section' ),
        nav = $( 'nav, .view-more' ),
        nav_height = nav.outerHeight();

    $(window).on( 'scroll', function() {
       var cur_pos = $(this).scrollTop();

       sections.each(function() {
          var top = $(this).offset().top  - nav_height,
              bottom = top + $(this).outerHeight();

          if ( cur_pos >= top && cur_pos <= bottom ) {
              nav.find( 'a' ).removeClass( 'active' );
              sections.removeClass( 'active' );

              $(this).addClass( 'active' );
              nav.find( 'a[href="#' + $(this).attr('id') + '"]').addClass( 'active' );
          }
          else if ( cur_pos + $(window).height() > $(document).height() - 100 ) {
              nav.find( 'a' ).removeClass( 'active' );
              sections.removeClass( 'active' );

              $('section').last().addClass( 'active' );
              $('.nav-link').last().addClass( 'active' );
          }
       });
    });

    /* Smooth Scroll from CSS Tricks - specific to front page */
    /* @link: https://css-tricks.com/snippets/jquery/smooth-scrolling/ */
    $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - nav_height
                }, 1000);
                return false;
            } else {
                $('html,body').animate({
                    scrollTop: 0
                }, 1000);
                return false;
            }
        }
    });

    // nav.find('a').on('click', function () {
    //   var $el = $(this)
    //     , id = $el.attr('href');
    //
    //   $('.nav-link').removeClass( 'active' );
    //   $el.addClass( 'active' );
    //   $('html, body').animate({
    //     scrollTop: $(id).offset().top - nav_height
    //   }, 500);

      //return false;
    //});
  });
