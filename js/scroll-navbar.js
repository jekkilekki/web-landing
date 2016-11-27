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

    /* Turn on active state on the correct link when scrolling */
    /* @link:  http://codetheory.in/change-active-state-links-sticky-navigation-scroll/ */
    var sections = $( '.section' ),
        nav = $( 'nav' ),
        nav_height = nav.outerHeight();

    $(window).on("resize", function() {
      var containers = $( '.full-height' );
      containers.each(function() {
        var containerHeight = $(this).height() + nav_height;
        if( containerHeight >= $(window).height() ) {
          $(this).css( "padding-top", "6em" );
          $(this).css( "margin-bottom", "6em" );
          $('.top').addClass( 'mobile-landscape' );
        } else {
          $(this).css( "padding-top", ( $(window).height() - containerHeight ) / 2 + "px" );
          $(this).css( "margin-bottom", ( $(window).height() - containerHeight ) / 2 + "px" );
        }
        $('.top').css( "margin-bottom", "0" ); // be sure there is NO bottom margin for the top gif section
      });
    }).resize();

    // Try to get the nav-links to STOP being active on click
    // (currently they stay active until the screen has scrolled to the next section)
    var navlinkClicked;
    $('.nav-link').click(function() {
      if( $(this).data( 'clicked' ) ) navlinkClicked = true;
      else navlinkClicked = false;
    });

    /**
     * Active section manager
     *
     * Adds an 'active' class to any active nav-link in the main menu or any currently visible <article>
     */
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

              $('article').last().addClass( 'active' );
              $('.nav-link').last().addClass( 'active' );
          }
       });
    });

    /* Smooth Scroll from CSS Tricks - specific to front page */
    /* @link: https://css-tricks.com/snippets/jquery/smooth-scrolling/ */
    $('a[href*="#"]:not([href="#"])').click(function() {
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

      /**
       * Scroll down button
       *
       * When clicked, it checks the currently 'active' section and scrolls to the NEXT section
       * If the 'active' section is the LAST section, it scrolls back to the top
       */
       var activeSection, activeSectionId = 'home';
         $(window).bind( 'scroll', function() {
           $( '.section' ).each(function() {
             var art = $(this);
             var pos = art.position().top - $(window).scrollTop();

             if( art.hasClass( 'active' ) ) {
               activeSection = art;
               activeSectionId = activeSection.attr( 'id' );
             }
           });
         });

       var articleIds = [ 'home' ];
       var articles = $( 'article' ).each( function() {
         articleIds.push( this.id );
       });
       var firstSectionId = 'home';

      $( '.view-more' ).click( function() {
        // As long as this is not the LAST element in the articleIds array (end of the page)
        if ( activeSectionId !== articleIds[ articleIds.length - 1 ] ) {
          var target = $('#' + articleIds[ $.inArray( activeSectionId, articleIds ) + 1 ] );
            $('html,body').animate({
                scrollTop: target.offset().top - nav_height + 1 // add 1px to be sure we cross INTO the next section
            }, 1000);
            return false;
        } else {
          var target = $('#home');
            $('html,body').animate({
                scrollTop: 0
            }, 1000);
            activeSectionId = 'home';
            nav.find( 'a[href="#top"]' ).addClass( 'active' );
            return false;
          }
      });

      $('.increase-font').click( function() {
        var currentFontSize = parseFloat( $('body').css('font-size'), 10 );
        var newFontSize = currentFontSize * 1.1;
        $('body').css( "font-size", newFontSize );
      });
      $('.decrease-font').click( function() {
        var currentFontSize = parseFloat( $('body').css('font-size'), 10 );
        var newFontSize = currentFontSize / 1.1;
        $('body').css( "font-size", newFontSize );
      });
      $('.reset-font').click( function() {
        $('body').css( "font-size", "16px" );
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
