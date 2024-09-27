/*!
    Title: Dev Portfolio Template
    Version: 1.2.2
    Last Change: 03/25/2020
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Show current year
    $("#current-year").text(new Date().getFullYear());

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    function handleVideoVisibility() {
        const video = document.querySelector('.project-video video');
        
        if (video) { // Asegurarse de que existe el video antes de añadir el observador
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play(); // Reproducir el video si está visible
                    } else {
                        video.pause(); // Pausar el video si no está visible
                    }
                });
            }, {
                threshold: 0.5 // Definir qué porcentaje del video debe ser visible para activar
            });
            
            observer.observe(video);
        }
    }

    function handleImageTilt(){
        const tiltContainers = document.querySelectorAll('.tilt-container'); // Selecciona todos los contenedores

        tiltContainers.forEach(tiltContainer => { // Itera sobre cada contenedor
            const image = tiltContainer.querySelector('img');

            // Leer el color de sombra desde el atributo de datos
            const shadowColor = tiltContainer.getAttribute('data-shadow-color');

            tiltContainer.addEventListener('mousemove', (e) => {
                const rect = tiltContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const midX = rect.width / 2;
                const midY = rect.height / 2;

                const rotateX = ((y - midY) / midY) * 10;
                const rotateY = ((midX - x) / midX) * 10;

                // Sombra dinámica
                const shadowX = (midX - x) / 20;
                const shadowY = (midY - y) / 20;

                // Aplica la transformación y la sombra
                image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                image.style.boxShadow = `${shadowX}px ${shadowY}px 12px ${shadowColor}`; // Usa el color de sombra del atributo
            });

            tiltContainer.addEventListener('mouseleave', () => {
                image.style.transform = 'rotateX(0) rotateY(0)';
                image.style.boxShadow = `2px 4px 12px ${shadowColor}`; // Mantén el mismo color al salir
            });
    });}

    // Llamar a la función para manejar la visibilidad del video
    handleVideoVisibility();

    handleImageTilt();
})(jQuery);
