(() => {

    "use strict";


    /* =========================
       SETTINGS
    ========================= */

    const PROFILE_NAME =
        "TurkdogruDev/T.Dev";


    const PROFILE_BIO =
        "I dont know what to put but my favorite color is white.";


    const START_MESSAGE =
        "Click To Enter!";


    const START_COUNTER =
        10258;


    /*
        Eski 921.xxx localStorage değerinden
        etkilenmemesi için yeni key.
    */

    const COUNTER_KEY =
        "turkdogrudev_views_v10";


    /* =========================
       ELEMENTS
    ========================= */

    const startScreen =
        document.getElementById(
            "start-screen"
        );


    const startText =
        document.getElementById(
            "start-text"
        );


    const profileShell =
        document.getElementById(
            "profile-shell"
        );


    const profileCard =
        document.getElementById(
            "profile-card"
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
        document.getElementById(
            "profile-picture"
        );


    const visitorCount =
        document.getElementById(
            "visitor-count"
        );


    const backgroundMusic =
        document.getElementById(
            "background-music"
        );


    const customCursor =
        document.getElementById(
            "custom-cursor"
        );


    const isTouchDevice =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    let entered =
        false;


    /* =========================
       CUSTOM CURSOR
    ========================= */

    function initializeCustomCursor() {

        if (
            !customCursor ||
            isTouchDevice
        ) {
            return;
        }


        /*
            Gerçek mouse koordinatı.
        */

        let mouseX =
            window.innerWidth / 2;


        let mouseY =
            window.innerHeight / 2;


        /*
            Custom cursor koordinatı.
        */

        let cursorX =
            mouseX;


        let cursorY =
            mouseY;


        let lastSparkTime =
            0;


        /*
            Mouse hareketi.
        */

        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;


                mouseY =
                    event.clientY;


                customCursor.style.opacity =
                    "1";


                /*
                    Çok fazla particle üretmemek
                    için 24ms throttle.
                */

                const now =
                    performance.now();


                if (
                    now -
                    lastSparkTime >
                    24
                ) {

                    createCursorSpark(
                        mouseX,
                        mouseY
                    );


                    lastSparkTime =
                        now;
                }

            }
        );


        /*
            Smooth custom cursor.
        */

        function animateCursor() {

            cursorX +=
                (
                    mouseX -
                    cursorX
                ) * 0.42;


            cursorY +=
                (
                    mouseY -
                    cursorY
                ) * 0.42;


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
            Mouse tıklama.
        */

        document.addEventListener(
            "mousedown",
            () => {

                document.body.classList.add(
                    "cursor-click"
                );

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                document.body.classList.remove(
                    "cursor-click"
                );

            }
        );


        /*
            Link / buton / profil fotoğrafı
            üstüne gelince büyüsün.
        */

        document.addEventListener(
            "mouseover",
            (event) => {

                const interactive =
                    event.target.closest(
                        "a, button, .profile-picture"
                    );


                if (interactive) {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }

            }
        );


        document.addEventListener(
            "mouseout",
            (event) => {

                const interactive =
                    event.target.closest(
                        "a, button, .profile-picture"
                    );


                if (interactive) {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }

            }
        );


        /*
            Tarayıcı dışına çıkınca gizle.
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


    /* =========================
       CURSOR SPARK
    ========================= */

    function createCursorSpark(
        x,
        y
    ) {

        const spark =
            document.createElement(
                "div"
            );


        spark.className =
            "cursor-spark";


        /*
            Mouse etrafında random
            saçılma yönü.
        */

        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            8 +
            Math.random() *
            18;


        const sparkX =
            Math.cos(angle) *
            distance;


        const sparkY =
            Math.sin(angle) *
            distance;


        spark.style.left =
            x + "px";


        spark.style.top =
            y + "px";


        spark.style.setProperty(
            "--spark-x",
            sparkX + "px"
        );


        spark.style.setProperty(
            "--spark-y",
            sparkY + "px"
        );


        /*
            Parçacıkların büyüklüğü
            biraz farklı olsun.
        */

        const size =
            2 +
            Math.random() *
            4;


        spark.style.width =
            size + "px";


        spark.style.height =
            size + "px";


        document.body.appendChild(
            spark
        );


        setTimeout(
            () => {

                spark.remove();

            },
            600
        );

    }


    /* =========================
       COUNTER
    ========================= */

    function initializeCounter() {

        if (!visitorCount) {
            return;
        }


        let count =
            START_COUNTER;


        /*
            localStorage bazı gizli
            modlarda hata verebilir.
        */

        try {

            const stored =
                Number.parseInt(
                    localStorage.getItem(
                        COUNTER_KEY
                    ),
                    10
                );


            /*
                İlk açılış:
                10,258

                Sonraki:
                10,259
                10,260...
            */

            if (
                Number.isFinite(stored) &&
                stored >= START_COUNTER
            ) {

                count =
                    stored + 1;

            }


            localStorage.setItem(
                COUNTER_KEY,
                String(count)
            );

        } catch (error) {

            console.warn(
                "Sayaç localStorage kullanamadı.",
                error
            );

        }


        visitorCount.textContent =
            count.toLocaleString(
                "en-US"
            );

    }


    /* =========================
       START TYPEWRITER
    ========================= */

    function initializeStartText() {

        if (!startText) {
            return;
        }


        startText.textContent =
            "";


        let index =
            0;


        function write() {

            if (
                index <
                START_MESSAGE.length
            ) {

                index++;


                startText.textContent =
                    START_MESSAGE.slice(
                        0,
                        index
                    ) + "|";


                setTimeout(
                    write,
                    90
                );

            } else {

                startText.textContent =
                    START_MESSAGE;


                blinkStartCursor();

            }

        }


        write();

    }


    function blinkStartCursor() {

        if (!startText) {
            return;
        }


        let visible =
            true;


        setInterval(
            () => {

                /*
                    Giriş yapıldıysa artık
                    bunun çalışmasının önemi yok.
                */

                if (entered) {
                    return;
                }


                visible =
                    !visible;


                startText.textContent =
                    START_MESSAGE +
                    (
                        visible
                            ? "|"
                            : " "
                    );

            },
            500
        );

    }


    /* =========================
       NORMAL TYPEWRITER
    ========================= */

    function typeText(
        element,
        text,
        speed
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

                index++;


                element.textContent =
                    text.slice(
                        0,
                        index
                    ) + "|";


                /*
                    Name üzerinde
                    küçük glitch ihtimali.
                */

                if (
                    element ===
                        profileName &&
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
                        170
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


    /* =========================
       MUSIC
    ========================= */

    function playMusic() {

        if (!backgroundMusic) {

            console.warn(
                "background-music bulunamadı."
            );

            return;

        }


        backgroundMusic.volume =
            0.35;


        backgroundMusic.loop =
            true;


        backgroundMusic.muted =
            false;


        /*
            currentTime = 0 diyerek
            her girişte baştan başlat.
        */

        try {

            backgroundMusic.currentTime =
                0;

        } catch (error) {
            /* ignore */
        }


        const playPromise =
            backgroundMusic.play();


        if (
            playPromise &&
            typeof playPromise.catch ===
                "function"
        ) {

            playPromise.catch(
                (error) => {

                    console.warn(
                        "music.mp3 oynatılamadı:",
                        error
                    );

                }
            );

        }

    }


    /* =========================
       ENTER SITE
    ========================= */

    function enterSite() {

        if (entered) {
            return;
        }


        entered =
            true;


        /*
            Start screen kapat.
        */

        if (startScreen) {

            startScreen.classList.add(
                "hidden"
            );

        }


        /*
            Profil göster.
        */

        if (profileShell) {

            /*
                Önce hidden classı kaldır.
            */

            requestAnimationFrame(
                () => {

                    profileShell.classList.remove(
                        "profile-hidden"
                    );

                }
            );

        }


        /*
            User interaction olduğu için
            müzik burada çalışabilir.
        */

        playMusic();


        /*
            Name + bio.
        */

        typeText(
            profileName,
            PROFILE_NAME,
            70
        );


        setTimeout(
            () => {

                typeText(
                    profileBio,
                    PROFILE_BIO,
                    28
                );

            },
            350
        );

    }


    /* =========================
       3D PROFILE CARD TILT
    ========================= */

    function initializeCardTilt() {

        if (
            !profileCard ||
            isTouchDevice
        ) {
            return;
        }


        /*
            Target rotation.
        */

        let targetRotateX =
            0;


        let targetRotateY =
            0;


        /*
            Current smooth rotation.
        */

        let currentRotateX =
            0;


        let currentRotateY =
            0;


        const MAX_ROTATION =
            7;


        /*
            Mouse profil kutusunun
            üzerinde hareket ettiğinde.
        */

        profileCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    profileCard.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const percentageX =
                    (
                        x -
                        centerX
                    ) /
                    centerX;


                const percentageY =
                    (
                        y -
                        centerY
                    ) /
                    centerY;


                targetRotateY =
                    percentageX *
                    MAX_ROTATION;


                targetRotateX =
                    -percentageY *
                    MAX_ROTATION;

            }
        );


        /*
            Mouse karttan çıkınca
            normal konuma dön.
        */

        profileCard.addEventListener(
            "mouseleave",
            () => {

                targetRotateX =
                    0;


                targetRotateY =
                    0;

            }
        );


        /*
            Smooth animation.
        */

        function animateTilt() {

            currentRotateX +=
                (
                    targetRotateX -
                    currentRotateX
                ) * .09;


            currentRotateY +=
                (
                    targetRotateY -
                    currentRotateY
                ) * .09;


            profileCard.style.transform =
                `
                    rotateX(
                        ${currentRotateX}deg
                    )
                    rotateY(
                        ${currentRotateY}deg
                    )
                `;


            requestAnimationFrame(
                animateTilt
            );

        }


        animateTilt();

    }


    /* =========================
       AVATAR EFFECT
    ========================= */

    function initializeAvatarEffect() {

        if (!profilePicture) {
            return;
        }


        profilePicture.addEventListener(
            "click",
            () => {

                /*
                    Avatar click animation.
                */

                profilePicture.animate(
                    [
                        {
                            transform:
                                "scale(1)"
                        },

                        {
                            transform:
                                "scale(.93)"
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
                            480,

                        easing:
                            "ease-out"
                    }
                );

            }
        );

    }


    /* =========================
       IMAGE FALLBACK
    ========================= */

    function initializeProfileImage() {

        if (!profilePicture) {
            return;
        }


        /*
            GitHub avatar.
        */

        profilePicture.src =
            "https://github.com/TurkdogruDev.png?size=320";


        profilePicture.addEventListener(
            "error",
            () => {

                console.warn(
                    "GitHub avatar yüklenemedi."
                );

            }
        );

    }


    /* =========================
       START EVENTS
    ========================= */

    if (startScreen) {

        /*
            CLICK
        */

        startScreen.addEventListener(
            "click",
            enterSite,
            {
                once: true
            }
        );


        /*
            TOUCH
        */

        startScreen.addEventListener(
            "touchstart",
            enterSite,
            {
                once: true,
                passive: true
            }
        );

    }


    /* =========================
       INITIALIZE
    ========================= */

    initializeCustomCursor();

    initializeCounter();

    initializeStartText();

    initializeCardTilt();

    initializeAvatarEffect();

    initializeProfileImage();

})();
