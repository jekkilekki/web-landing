$( document ).ready( function() {

    // $( 'body' ).scrollspy( { target: '#main-nav' } );

    /**
     * Set an 'active' class for ALL links that are clicked on
     */
    $( 'a' ).click(function() {
       $( 'a.active' ).removeClass( 'active' );
       $(this).addClass( 'active' );
    });

    $( '.get-started-cards .card' ).on("mouseover", function() {
      $(this).removeClass( 'active' );
      $(this).addClass( 'hovered' );
    });
    $( '.get-started-cards .card' ).on("mouseout", function() {
      $(this).removeClass( 'hovered' );
      $(this).addClass( 'active' );
    });

    var containers = $( '#hero .container, #get-started .container, #contact .container' );
    $(window).on("resize", function() {
      containers.each(function() {
        var containerHeight = $(this).height();
        if( containerHeight >= $(window).height() ) {
          $(this).css( "padding-top", "6em" );
          $(this).css( "margin-bottom", "0" );
        } else {
          $(this).css( "padding-top", ( $(window).height() - containerHeight - 73 ) / 2 + "px" );
          $(this).css( "margin-bottom", ( $(window).height() - containerHeight - 73 ) / 2 + "px" );
        }
      });
    }).resize();


    /* Turn on active state on the correct link when scrolling */
    /* @link:  http://codetheory.in/change-active-state-links-sticky-navigation-scroll/ */
    var sections = $( 'article' ),
        nav = $( 'nav, .view-more' ),
        nav_height = nav.outerHeight();

    // Try to get the nav-links to STOP being active on click
    // (currently they stay active until the screen has scrolled to the next section)
    var navlinkClicked;
    $('.nav-link').click(function() {
      if( $(this).data( 'clicked' ) ) navlinkClicked = true;
      else navlinkClicked = false;
    });

    $(window).on( 'scroll', function() {
       var cur_pos = $(this).scrollTop();

       sections.each(function() {
          var top = $(this).offset().top - nav_height,
              bottom = top + $(this).outerHeight();

          if ( ( cur_pos >= top && cur_pos <= bottom ) || navlinkClicked ) {
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
    $('a[href*="#"]:not([href="#"]), .view-more').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - nav_height + 1 // add 1px to be sure we cross INTO the next section
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

    // Scroll arrow function - always scroll to next section if clicked, (back to top if clicked at last section - or display: none?)
    // @TODO: Make this work
    var firstSectionId = '#home';
    var activeSection, activeSectionId = '#home';
    var nextSection, nextSectionId = '#features';
      $(window).bind( 'scroll', function() {
        $( '.section' ).each(function() {
          var art = $(this);
          var pos = art.position().top - $(window).scrollTop();

          if( pos <= 0 && art.hasClass( 'active' ) ) {
            activeSection = art;
            activeSectionId = '#' + activeSection.attr( 'id' );

            nextSection = art.nextAll( 'article' );
            nextSectionId = '#' + nextSection.attr( 'id' );
          }
        });
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
