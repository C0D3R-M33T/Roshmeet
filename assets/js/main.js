/* ===================================================================
 * Luther 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function(html) {

    "use strict";

    html.className = html.className.replace(/\bno-js\b/g, '') + ' js ';



   /* Animations
    * -------------------------------------------------- */
    const tl = anime.timeline( {
        easing: 'easeInOutCubic',
        duration: 800,
        autoplay: false
    })
    .add({
        targets: '#loader',
        opacity: 0,
        duration: 1000,
        begin: function(anim) {
            window.scrollTo(0, 0);
        }
    })
    .add({
        targets: '#preloader',
        opacity: 0,
        complete: function(anim) {
            document.querySelector("#preloader").style.visibility = "hidden";
            document.querySelector("#preloader").style.display = "none";
        }
    })
    .add({
        targets: '.s-header',
        translateY: [-100, 0],
        opacity: [0, 1]
    }, '-=200')
    .add({
        targets: [ '.s-intro .text-pretitle', '.s-intro .text-huge-title'],
        translateX: [100, 0],
        opacity: [0, 1],
        delay: anime.stagger(400)
    })
    .add({
        targets: '.circles span',
        keyframes: [
            {opacity: [0, .3]},
            {opacity: [.3, .1], delay: anime.stagger(100, {direction: 'reverse'})}
        ],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-social li',
        translateX: [-50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100, {direction: 'reverse'})
    })
    .add({
        targets: '.intro-scrolldown',
        translateY: [100, 0],
        opacity: [0, 1]
    }, '-=800');



   /* Preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');
        if (!preloader) return;
        
        window.addEventListener('load', function() {
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            document.querySelectorAll('.ss-animated').forEach(function(item){
                item.classList.remove('ss-animated');
            });

            tl.play();
        });

        // force page scroll position to top at page refresh
        // window.addEventListener('beforeunload' , function () {
        //     // window.scrollTo(0, 0);
        // });

    }; // end ssPreloader


   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const toggleButton = document.querySelector('.mobile-menu-toggle');
        const mainNavWrap = document.querySelector('.main-nav-wrap');
        const siteBody = document.querySelector("body");

        if (!(toggleButton && mainNavWrap)) return;

        toggleButton.addEventListener('click', function(event) {
            event.preventDefault();
            toggleButton.classList.toggle('is-clicked');
            siteBody.classList.toggle('menu-is-open');
        });

        mainNavWrap.querySelectorAll('.main-nav a').forEach(function(link) {
            link.addEventListener("click", function(event) {

                // at 800px and below
                if (window.matchMedia('(max-width: 800px)').matches) {
                    toggleButton.classList.toggle('is-clicked');
                    siteBody.classList.toggle('menu-is-open');
                }
            });
        });

        window.addEventListener('resize', function() {

            // above 800px
            if (window.matchMedia('(min-width: 801px)').matches) {
                if (siteBody.classList.contains('menu-is-open')) siteBody.classList.remove('menu-is-open');
                if (toggleButton.classList.contains("is-clicked")) toggleButton.classList.remove("is-clicked");
            }
        });

    }; // end ssMobileMenu


   /* Highlight active menu link on pagescroll
    * ------------------------------------------------------ */
    const ssScrollSpy = function() {

        const sections = document.querySelectorAll(".target-section");

        // Add an event listener listening for scroll
        window.addEventListener("scroll", navHighlight);

        function navHighlight() {
        
            // Get current scroll position
            let scrollY = window.pageYOffset;
        
            // Loop through sections to get height(including padding and border), 
            // top and ID values for each
            sections.forEach(function(current) {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 50;
                const sectionId = current.getAttribute("id");
            
               /* If our current scroll position enters the space where current section 
                * on screen is, add .current class to parent element(li) of the thecorresponding 
                * navigation link, else remove it. To know which link is active, we use 
                * sectionId variable we are getting while looping through sections as 
                * an selector
                */
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.add("current");
                } else {
                    document.querySelector(".main-nav a[href*=" + sectionId + "]").parentNode.classList.remove("current");
                }
            });
        }

    }; // end ssScrollSpy


   /* Animate elements if in viewport
    * ------------------------------------------------------ */
    const ssViewAnimate = function() {

        const blocks = document.querySelectorAll("[data-animate-block]");

        window.addEventListener("scroll", viewportAnimation);

        function viewportAnimation() {

            let scrollY = window.pageYOffset;

            blocks.forEach(function(current) {

                const viewportHeight = window.innerHeight;
                const triggerTop = (current.offsetTop + (viewportHeight * .2)) - viewportHeight;
                const blockHeight = current.offsetHeight;
                const blockSpace = triggerTop + blockHeight;
                const inView = scrollY > triggerTop && scrollY <= blockSpace;
                const isAnimated = current.classList.contains("ss-animated");

                if (inView && (!isAnimated)) {
                    anime({
                        targets: current.querySelectorAll("[data-animate-el]"),
                        opacity: [0, 1],
                        translateY: [100, 0],
                        delay: anime.stagger(400, {start: 200}),
                        duration: 800,
                        easing: 'easeInOutCubic',
                        begin: function(anim) {
                            current.classList.add("ss-animated");
                        }
                    });
                }
            });
        }

    }; // end ssViewAnimate


   /* Swiper
    * ------------------------------------------------------ */ 
    const ssSwiper = function() {

        const mySwiper = new Swiper('.swiper-container', {

            slidesPerView: 1,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                // when window width is > 400px
                401: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // when window width is > 800px
                801: {
                    slidesPerView: 2,
                    spaceBetween: 32
                },
                // when window width is > 1200px
                1201: {
                    slidesPerView: 2,
                    spaceBetween: 80
                }
            }
         });

    }; // end ssSwiper


   /* Lightbox
    * ------------------------------------------------------ */
    const ssLightbox = function() {

        const folioLinks = document.querySelectorAll('.folio-list__item-link');
        const modals = [];

        folioLinks.forEach(function(link) {
            let modalbox = link.getAttribute('href');
            let instance = basicLightbox.create(
                document.querySelector(modalbox),
                {
                    onShow: function(instance) {
                        //detect Escape key press
                        document.addEventListener("keydown", function(event) {
                            event = event || window.event;
                            if (event.keyCode === 27) {
                                instance.close();
                            }
                        });
                    }
                }
            )
            modals.push(instance);
        });

        folioLinks.forEach(function(link, index) {
            link.addEventListener("click", function(event) {
                event.preventDefault();
                modals[index].show();
            });
        });

    };  // end ssLightbox


   /* Alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');
  
        boxes.forEach(function(box){

            box.addEventListener('click', function(event) {
                if (event.target.matches(".alert-box__close")) {
                    event.stopPropagation();
                    event.target.parentElement.classList.add("hideit");

                    setTimeout(function(){
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })

    }; // end ssAlertBoxes


   /* Smoothscroll
    * ------------------------------------------------------ */
    const ssMoveTo = function(){

        const easeFunctions = {
            easeInQuad: function (t, b, c, d) {
                t /= d;
                return c * t * t + b;
            },
            easeOutQuad: function (t, b, c, d) {
                t /= d;
                return -c * t* (t - 2) + b;
            },
            easeInOutQuad: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            },
            easeInOutCubic: function (t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t*t + b;
                t -= 2;
                return c/2*(t*t*t + 2) + b;
            }
        }

        const triggers = document.querySelectorAll('.smoothscroll');
        
        const moveTo = new MoveTo({
            tolerance: 0,
            duration: 1200,
            easing: 'easeInOutCubic',
            container: window
        }, easeFunctions);

        triggers.forEach(function(trigger) {
            moveTo.registerTrigger(trigger);
        });

    }; // end ssMoveTo


   /* How I Work Kanban
    * -------------------------------------------------- */
    const ssHowIWork = function() {

        const section = document.querySelector('.how-i-work');
        if (!section) return;

        const data = [
            {
                id: 'think-systems',
                title: 'Systems thinking',
                status: 'Validated',
                text: 'Map dependencies early so decisions land with clear trade-offs and aligned incentives.',
                evidence: ['Space Economy Institute OCI research', 'COSMEON founder work', 'ODEC governance']
            },
            {
                id: 'think-research',
                title: 'Research-first approach',
                status: 'In production',
                text: 'Anchor product direction in evidence and structured exploration before building.',
                evidence: ['Reuters news production SaaS', 'Space Economy Institute OCI research', 'DRDO mission-critical UI']
            },
            {
                id: 'think-feasibility',
                title: 'Feasibility analysis',
                status: 'Shipped',
                text: 'Evaluate technical, operational, and cost feasibility to reduce delivery risk.',
                evidence: ['COSMEON founder work', 'Zapvi personalization e-commerce', 'Superteams AI HR platform']
            },
            {
                id: 'build-design',
                title: 'Product design',
                status: 'In production',
                text: 'Translate complex workflows into intuitive, high-clarity interfaces.',
                evidence: ['DRDO mission-critical UI', 'Superteams AI HR platform', 'Reuters news production SaaS']
            },
            {
                id: 'build-saas',
                title: 'SaaS architecture',
                status: 'Validated',
                text: 'Design scalable systems that balance performance, security, and velocity.',
                evidence: ['Reuters news production SaaS', 'COSMEON founder work', 'Zapvi personalization e-commerce']
            },
            {
                id: 'build-ai',
                title: 'AI workflows',
                status: 'Shipped',
                text: 'Integrate AI into product flows with human-in-the-loop safeguards.',
                evidence: ['Superteams AI HR platform', 'ODEC governance', 'COSMEON founder work']
            },
            {
                id: 'ship-execution',
                title: 'Execution discipline',
                status: 'Shipped',
                text: 'Drive delivery with clear sequencing, accountability, and relentless focus.',
                evidence: ['MUJHackX leadership', 'Reuters news production SaaS', 'COSMEON founder work']
            },
            {
                id: 'ship-stakeholder',
                title: 'Stakeholder alignment',
                status: 'In review',
                text: 'Create shared understanding across teams, partners, and decision-makers.',
                evidence: ['ODEC governance', 'MUJHackX leadership', 'DRDO mission-critical UI']
            },
            {
                id: 'ship-constraints',
                title: 'Delivery under constraints',
                status: 'Validated',
                text: 'Make realistic trade-offs to keep outcomes on time and credible.',
                evidence: ['COSMEON founder work', 'Zapvi personalization e-commerce', 'Space Economy Institute OCI research']
            },
            {
                id: 'scale-founder',
                title: 'Founder mindset',
                status: 'In production',
                text: 'Operate with ownership and momentum from zero to scale.',
                evidence: ['COSMEON founder work', 'Superteams AI HR platform', 'Reuters news production SaaS']
            },
            {
                id: 'scale-governance',
                title: 'Governance thinking',
                status: 'Validated',
                text: 'Build for trust, accountability, and long-term impact.',
                evidence: ['ODEC governance', 'Space Economy Institute OCI research', 'DRDO mission-critical UI']
            },
            {
                id: 'scale-vision',
                title: 'Long-term infrastructure vision',
                status: 'In review',
                text: 'Plan systems with resilience, sustainability, and future readiness.',
                evidence: ['Space Economy Institute OCI research', 'COSMEON founder work', 'ODEC governance']
            }
        ];

        const dataMap = new Map(data.map((item) => [item.id, item]));
        const modal = document.getElementById('how-i-work-modal');
        const modalTitle = document.getElementById('how-i-work-modal-title');
        const modalText = document.getElementById('how-i-work-modal-text');
        const modalList = document.getElementById('how-i-work-modal-list');
        const modalStatus = document.getElementById('how-i-work-modal-status');
        const closeButtons = modal.querySelectorAll('[data-modal-close]');
        let lastFocused = null;
        let isKeyboard = false;

        const focusableSelector =
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

        const openModal = (item, trigger) => {
            if (!item) return;
            lastFocused = isKeyboard ? trigger : null;
            modalStatus.textContent = item.status;
            modalTitle.textContent = item.title;
            modalText.textContent = item.text;
            modalList.innerHTML = '';
            item.evidence.forEach((line) => {
                const li = document.createElement('li');
                li.textContent = line;
                modalList.appendChild(li);
            });
            modal.classList.add('is-open');
            modal.setAttribute('aria-hidden', 'false');
            const firstFocusable = modal.querySelector(focusableSelector);
            if (firstFocusable) firstFocusable.focus();
        };

        const closeModal = () => {
            modal.classList.remove('is-open');
            modal.setAttribute('aria-hidden', 'true');
            if (lastFocused) lastFocused.focus();
        };

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Tab' || event.key.startsWith('Arrow')) {
                isKeyboard = true;
            }
        });

        document.addEventListener('mousedown', () => {
            isKeyboard = false;
        });

        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
                return;
            }
            if (event.key !== 'Tab') return;
            const focusable = Array.from(modal.querySelectorAll(focusableSelector));
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        });

        closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));

        modal.addEventListener('click', (event) => {
            if (event.target.matches('[data-modal-close]')) {
                closeModal();
            }
        });

        section.querySelectorAll('.how-i-work__card').forEach((card) => {
            card.addEventListener('click', () => {
                const item = dataMap.get(card.dataset.cardId);
                openModal(item, card);
            });
        });

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!reduceMotion.matches) {
            section.querySelectorAll('.how-i-work__card').forEach((card) => {
                card.addEventListener('mousemove', (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
                    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
                    card.style.setProperty('--tilt-y', `${x.toFixed(2)}deg`);
                    card.style.setProperty('--tilt-x', `${y.toFixed(2)}deg`);
                    card.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
                    card.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
                });

                card.addEventListener('mouseleave', () => {
                    card.style.removeProperty('--tilt-y');
                    card.style.removeProperty('--tilt-x');
                    card.style.removeProperty('--mouse-x');
                    card.style.removeProperty('--mouse-y');
                });
            });
        }

    }; // end ssHowIWork


   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssMobileMenu();
        ssScrollSpy();
        ssViewAnimate();
        ssSwiper();
        ssLightbox();
        ssAlertBoxes();
        ssMoveTo();
        ssHowIWork();

    })();

})(document.documentElement);
