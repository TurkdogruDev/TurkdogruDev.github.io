(() => {

    "use strict";


    /* ========================================
       SETTINGS
    ======================================== */

    const PROFILE_NAME =
        "TurkdogruDev/T.Dev";


    const PROFILE_BIO =
        "I dont know what to put but my favorite color is white.";


    const START_MESSAGE =
        "Click To Enter!";


    const COUNTER_START =
        10258;


    /*
        Eski 921.xxx sayaçtan tamamen ayrı.
    */
    const COUNTER_KEY =
        "turkdogrudev_profile_views_v30";


    /*
        Siteye daha önce girildi mi?
    */
    const ENTER_KEY =
        "turkdogrudev_entered_v30";


    /* ========================================
       ELEMENTS
    ======================================== */

    const startScreen =
        document.getElementById(
            "start-screen"
        );


    const startText =
        document.getElementById(
            "start-text"
        );


    const profileBlock =
        document.getElementById(
            "profile-block"
        );


    const profileName =
        document.getElementById(
            "profile-name"
        );


    const profileBio =
        document.getElementById(
            "profile-bio"
        );


    const profilePicture =
        document.querySelector(
            ".profile-picture"
        );


    const visitorCount =
        document.getElementById(
            "visitor-count"
        );


    const music =
        document.getElementById(
            "background-music"
        );


    const customCursor =
        document.querySelector(
            ".custom-cursor"
        );


    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    let entered =
        false;


    /* ========================================
       SAFE LOCAL STORAGE
    ======================================== */

    function storageGet(key) {

        try {

            return localStorage.getItem(
                key
            );

        } catch (error) {

            return null;

        }

    }


    function storageSet(
        key,
        value
    ) {

        try {

            localStorage.setItem(
                key,
                value
            );

        } catch (error) {

            console.warn(
                "localStorage unavailable:",
                error
            );

        }

    }


    /* ========================================
       CUSTOM CURSOR
    ======================================== */

    function initializeCursor() {

        if (
            !customCursor ||
            isTouchDevice
        ) {

            return;

        }


        let mouseX =
            -100;


        let mouseY =
            -100;


        let cursorX =
            -100;


        let cursorY =
            -100;


        let lastSpark =
            0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;


                mouseY =
                    event.clientY;


                customCursor.style.opacity =
                    "1";


                const now =
                    performance.now();


                /*
                    Particle sayısını sınırlıyoruz.
                */
                if (
                    now -
                    lastSpark >
                    42
                ) {

                    createCursorSpark(
                        mouseX,
                        mouseY
                    );


                    lastSpark =
                        now;

                }

            }
        );


        /*
            Smooth cursor loop.
        */
        function animateCursor() {

            cursorX +=
                (
                    mouseX -
                    cursorX
                ) *
                0.72;


            cursorY +=
                (
                    mouseY -
                    cursorY
                ) *
                0.72;


            customCursor.style.left =
                cursorX + "px";


            customCursor.style.top =
                cursorY + "px";


            requestAnimationFrame(
                animateCursor
            );

        }


        animateCursor();


        /*
            CLICK
        */
        document.addEventListener(
            "mousedown",
            () => {

                document.body.classList.add(
                    "cursor-clicking"
                );

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                document.body.classList.remove(
                    "cursor-clicking"
                );

            }
        );


        /*
            HOVER
        */
        document.addEventListener(
            "mouseover",
            (event) => {

                const target =
                    event.target.closest(
                        "a, button, .profile-picture"
                    );


                if (target) {

                    document.body.classList.add(
                        "cursor-hovering"
                    );

                }

            }
        );


        document.addEventListener(
            "mouseout",
            (event) => {

                const target =
                    event.target.closest(
                        "a, button, .profile-picture"
                    );


                if (target) {

                    document.body.classList.remove(
                        "cursor-hovering"
                    );

                }

            }
        );


        /*
            Browser dışına çıkınca gizle.
        */
        document.documentElement.addEventListener(
            "mouseleave",
            () => {

                customCursor.style.opacity =
                    "0";

            }
        );


        document.documentElement.addEventListener(
            "mouseenter",
            () => {

                customCursor.style.opacity =
                    "1";

            }
        );

    }


    /* ========================================
       CURSOR SPARK
    ======================================== */

    function createCursorSpark(
        x,
        y
    ) {

        const spark =
            document.createElement(
                "span"
            );


        spark.className =
            "cursor-spark";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            4 +
            Math.random() *
            10;


        const dx =
            Math.cos(angle) *
            distance;


        const dy =
            Math.sin(angle) *
            distance;


        spark.style.left =
            x + "px";


        spark.style.top =
            y + "px";


        spark.style.setProperty(
            "--x",
            dx + "px"
        );


        spark.style.setProperty(
            "--y",
            dy + "px"
        );


        document.body.appendChild(
            spark
        );


        setTimeout(
            () => {

                spark.remove();

            },
            500
        );

    }


    /* ========================================
       VISITOR COUNTER
    ======================================== */

    function initializeCounter() {

        if (!visitorCount) {
            return;
        }


        let count =
            COUNTER_START;


        const stored =
            Number.parseInt(
                storageGet(
                    COUNTER_KEY
                ),
                10
            );


        if (
            Number.isFinite(
                stored
            ) &&
            stored >=
                COUNTER_START
        ) {

            count =
                stored + 1;

        }


        storageSet(
            COUNTER_KEY,
            String(count)
        );


        visitorCount.textContent =
            count.toLocaleString(
                "en-US"
            );

    }


    /* ========================================
       CLICK TO ENTER TYPEWRITER
    ======================================== */

    function initializeStartText() {

        if (!startText) {
            return;
        }


        let index =
            0;


        let currentText =
            "";


        let cursorVisible =
            true;


        startText.textContent =
            "";


        function write() {

            if (
                index <
                START_MESSAGE.length
            ) {

                index +=
                    1;


                currentText =
                    START_MESSAGE.slice(
                        0,
                        index
                    );


                startText.textContent =
                    currentText +
                    "|";


                setTimeout(
                    write,
                    85
                );

            }

        }


        write();


        setInterval(
            () => {

                if (entered) {
                    return;
                }


                cursorVisible =
                    !cursorVisible;


                startText.textContent =
                    currentText +
                    (
                        cursorVisible
                            ? "|"
                            : " "
                    );

            },
            500
        );

    }


    /* ========================================
       PROFILE TYPEWRITER
    ======================================== */

    function typeText(
        element,
        text,
        speed,
        glitch = false
    ) {

        if (!element) {
            return;
        }


        element.textContent =
            "";


        let index =
            0;


        function write() {

            if (
                index <
                text.length
            ) {

                index +=
                    1;


                element.textContent =
                    text.slice(
                        0,
                        index
                    ) +
                    "|";


                if (
                    glitch &&
                    Math.random() <
                        0.07
                ) {

                    element.classList.add(
                        "glitch"
                    );


                    setTimeout(
                        () => {

                            element.classList.remove(
                                "glitch"
                            );

                        },
                        150
                    );

                }


                setTimeout(
                    write,
                    speed
                );

            } else {

                element.textContent =
                    text;

            }

        }


        write();

    }


    /* ========================================
       MUSIC
    ======================================== */

    function playMusic() {

        if (!music) {
            return;
        }


        music.volume =
            0.35;


        music.loop =
            true;


        music.muted =
            false;


        const promise =
            music.play();


        if (
            promise &&
            typeof promise.catch ===
                "function"
        ) {

            promise.catch(
                (error) => {

                    /*
                        Yenileme sonrası tarayıcı
                        autoplay'i engelleyebilir.
                        Bu siteyi bozmaz.
                    */
                    console.warn(
                        "Music autoplay blocked:",
                        error
                    );

                }
            );

        }

    }


    /* ========================================
       ENTER SITE
    ======================================== */

    function enterSite() {

        if (entered) {
            return;
        }


        entered =
            true;


        storageSet(
            ENTER_KEY,
            "yes"
        );


        if (startScreen) {

            startScreen.classList.add(
                "hidden"
            );

        }


        playMusic();


        typeText(
            profileName,
            PROFILE_NAME,
            65,
            true
        );


        setTimeout(
            () => {

                typeText(
                    profileBio,
                    PROFILE_BIO,
                    27
                );

            },
            350
        );

    }


    /* ========================================
       REFRESH FIX
    ======================================== */

    function restoreAfterRefresh() {

        const wasEntered =
            storageGet(
                ENTER_KEY
            ) === "yes";


        if (!wasEntered) {

            return;

        }


        /*
            F5 sonrası giriş ekranını
            direkt kaldırıyoruz.
        */
        entered =
            true;


        if (startScreen) {

            startScreen.classList.add(
                "hidden"
            );

        }


        /*
            Typewriter tekrar çalıştırma.
            Direkt normal yazıları koy.
        */
        if (profileName) {

            profileName.textContent =
                PROFILE_NAME;

        }


        if (profileBio) {

            profileBio.textContent =
                PROFILE_BIO;

        }


        /*
            Burada playMusic() çağırmıyoruz.
            Çünkü browser refresh sonrası
            kullanıcı etkileşimi olmadan
            autoplay'i engeller.
        */

    }


    /* ========================================
       3D PROFILE MOVEMENT
    ======================================== */

    function initializeProfileMovement() {

        if (
            !profileBlock ||
            isTouchDevice
        ) {

            return;

        }


        let targetRotateX =
            0;


        let targetRotateY =
            0;


        let currentRotateX =
            0;


        let currentRotateY =
            0;


        let targetMoveX =
            0;


        let targetMoveY =
            0;


        let currentMoveX =
            0;


        let currentMoveY =
            0;


        const MAX_ROTATE =
            7;


        const MAX_MOVE =
            5;


        /*
            Tüm ekran mouse konumuna göre
            kartı hafif hareket ettirir.
        */
        document.addEventListener(
            "mousemove",
            (event) => {

                const halfWidth =
                    window.innerWidth /
                    2;


                const halfHeight =
                    window.innerHeight /
                    2;


                const percentX =
                    (
                        event.clientX -
                        halfWidth
                    ) /
                    halfWidth;


                const percentY =
                    (
                        event.clientY -
                        halfHeight
                    ) /
                    halfHeight;


                targetRotateY =
                    percentX *
                    MAX_ROTATE;


                targetRotateX =
                    -percentY *
                    MAX_ROTATE;


                targetMoveX =
                    percentX *
                    MAX_MOVE;


                targetMoveY =
                    percentY *
                    MAX_MOVE;

            }
        );


        document.documentElement.addEventListener(
            "mouseleave",
            () => {

                targetRotateX =
                    0;


                targetRotateY =
                    0;


                targetMoveX =
                    0;


                targetMoveY =
                    0;

            }
        );


        function animateProfile() {

            /*
                LERP
            */
            currentRotateX +=
                (
                    targetRotateX -
                    currentRotateX
                ) *
                0.075;


            currentRotateY +=
                (
                    targetRotateY -
                    currentRotateY
                ) *
                0.075;


            currentMoveX +=
                (
                    targetMoveX -
                    currentMoveX
                ) *
                0.075;


            currentMoveY +=
                (
                    targetMoveY -
                    currentMoveY
                ) *
                0.075;


            /*
                Burada translate(-50%)
                YOK.

                Çünkü merkezleme profile-wrapper
                tarafından yapılıyor.
            */
            profileBlock.style.transform =
                `
                    translate3d(
                        ${currentMoveX}px,
                        ${currentMoveY}px,
                        0
                    )
                    rotateX(
                        ${currentRotateX}deg
                    )
                    rotateY(
                        ${currentRotateY}deg
                    )
                `;


            requestAnimationFrame(
                animateProfile
            );

        }


        animateProfile();

    }


    /* ========================================
       AVATAR CLICK EFFECT
    ======================================== */

    function initializeAvatarEffect() {

        if (!profilePicture) {
            return;
        }


        profilePicture.addEventListener(
            "click",
            () => {

                profilePicture.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },

                        {
                            transform:
                                "scale(.92)"
                        },

                        {
                            transform:
                                "scale(1.07)"
                        },

                        {
                            transform:
                                "scale(1)"
                        }
                    ],
                    {
                        duration:
                            450,

                        easing:
                            "ease-out"
                    }
                );

            }
        );

    }


    /* ========================================
       ENTER EVENTS
    ======================================== */

    if (startScreen) {

        startScreen.addEventListener(
            "click",
            enterSite
        );


        startScreen.addEventListener(
            "touchstart",
            enterSite,
            {
                passive: true
            }
        );

    }


    /* ========================================
       START EVERYTHING
    ======================================== */

    initializeCursor();

    initializeCounter();

    initializeStartText();

    initializeProfileMovement();

    initializeAvatarEffect();

    restoreAfterRefresh();

})();
