let hasUserInteracted = false;

/*
  BODY:
  <body class="home-theme" onload="initMedia()">

  MUSIC:
  <audio id="background-music" loop>
      <source src="music.mp3" type="audio/mpeg">
  </audio>
*/

function initMedia() {
    const music = document.getElementById("background-music");

    if (!music) {
        console.warn("background-music bulunamadı.");
        return;
    }

    music.volume = 0.3;
    music.loop = true;
}


document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTLER
    ========================= */

    const startScreen =
        document.getElementById("start-screen");

    const startText =
        document.getElementById("start-text");

    const profileBlock =
        document.getElementById("profile-block");

    const profileName =
        document.getElementById("profile-name");

    const profileBio =
        document.getElementById("profile-bio");

    const profilePicture =
        document.querySelector(".profile-picture");

    const profileContainer =
        document.querySelector(".profile-container");

    const visitorCount =
        document.getElementById("visitor-count");

    const backgroundMusic =
        document.getElementById("background-music");

    const customCursor =
        document.querySelector(".custom-cursor");

    const glitchOverlay =
        document.querySelector(".glitch-overlay");


    /* =========================
       AYARLAR
    ========================= */

    const NAME =
        "TurkdogruDev/T.Dev";

    const BIO =
        "I dont know what to put but my favorite color is white.";

    const START_MESSAGE =
        "Click To Enter!";

    /*
       Sayaç ilk defa:
       10,258

       Sonraki açılış:
       10,259
       10,260...
    */

    const COUNTER_KEY =
        "turkdogrudev-view-counter-v6";

    const START_COUNTER =
        10258;


    /* =========================
       TOUCH / PC
    ========================= */

    const isTouchDevice =
        window.matchMedia("(pointer: coarse)").matches;


    /* =========================
       CUSTOM CURSOR

       Sistem cursorunu CSS gizliyor.
       Burada yalnızca sitenin
       kendi cursor'u hareket ediyor.
    ========================= */

    function initializeCursor() {

        if (!customCursor) {
            return;
        }

        if (isTouchDevice) {

            document.body.classList.add(
                "touch-device"
            );

            customCursor.style.display =
                "none";

            return;
        }


        document.addEventListener(
            "mousemove",
            (event) => {

                customCursor.style.display =
                    "block";

                customCursor.style.left =
                    event.clientX + "px";

                customCursor.style.top =
                    event.clientY + "px";

            }
        );


        document.addEventListener(
            "mousedown",
            () => {

                customCursor.style.transform =
                    "translate(-50%, -50%) scale(0.8)";

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                customCursor.style.transform =
                    "translate(-50%, -50%) scale(1)";

            }
        );


        document.addEventListener(
            "mouseleave",
            () => {

                customCursor.style.display =
                    "none";

            }
        );


        document.addEventListener(
            "mouseenter",
            () => {

                customCursor.style.display =
                    "block";

            }
        );

    }


    /* =========================
       GITHUB PROFİL FOTOĞRAFI
    ========================= */

    function initializeProfilePicture() {

        if (!profilePicture) {
            return;
        }

        profilePicture.src =
            "https://github.com/TurkdogruDev.png?size=300";

        profilePicture.onerror =
            function () {

                /*
                  GitHub resmi yüklenemezse
                  kırık resim ikonu göstermesin.
                */

                this.style.visibility =
                    "hidden";

            };

    }


    /* =========================
       SAYAC
    ========================= */

    function initializeVisitorCounter() {

        if (!visitorCount) {
            return;
        }

        let count =
            parseInt(
                localStorage.getItem(
                    COUNTER_KEY
                ),
                10
            );


        if (
            Number.isNaN(count) ||
            count < START_COUNTER - 1
        ) {

            count =
                START_COUNTER - 1;

        }


        count++;


        localStorage.setItem(
            COUNTER_KEY,
            String(count)
        );


        visitorCount.textContent =
            count.toLocaleString(
                "en-US"
            );

    }


    /* =========================
       CLICK TO ENTER
       TYPEWRITER
    ========================= */

    function initializeStartText() {

        if (!startText) {
            return;
        }

        let index = 0;
        let text = "";
        let cursorVisible = true;


        function write() {

            if (
                index <
                START_MESSAGE.length
            ) {

                text =
                    START_MESSAGE.slice(
                        0,
                        index + 1
                    );

                index++;


                startText.textContent =
                    text + "|";


                setTimeout(
                    write,
                    90
                );

            } else {

                startText.textContent =
                    START_MESSAGE + "|";

            }

        }


        write();


        setInterval(
            () => {

                cursorVisible =
                    !cursorVisible;

                startText.textContent =
                    text +
                    (
                        cursorVisible
                            ? "|"
                            : " "
                    );

            },
            500
        );

    }


    /* =========================
       İSİM TYPEWRITER
    ========================= */

    let nameAnimationStarted =
        false;


    function typeWriterName() {

        if (
            !profileName ||
            nameAnimationStarted
        ) {
            return;
        }

        nameAnimationStarted =
            true;


        let index = 0;


        profileName.textContent =
            "";


        function writeName() {

            if (index < NAME.length) {

                index++;


                profileName.textContent =
                    NAME.slice(
                        0,
                        index
                    ) + "|";


                /*
                  Hafif glitch.
                */

                if (
                    Math.random() <
                    0.08
                ) {

                    profileName.classList.add(
                        "glitch"
                    );


                    setTimeout(
                        () => {

                            profileName.classList.remove(
                                "glitch"
                            );

                        },
                        150
                    );

                }


                setTimeout(
                    writeName,
                    100
                );

            } else {

                profileName.textContent =
                    NAME;

            }

        }


        writeName();

    }


    /* =========================
       BIO TYPEWRITER
    ========================= */

    let bioAnimationStarted =
        false;


    function typeWriterBio() {

        if (
            !profileBio ||
            bioAnimationStarted
        ) {
            return;
        }

        bioAnimationStarted =
            true;


        let index = 0;


        profileBio.textContent =
            "";


        function writeBio() {

            if (index < BIO.length) {

                index++;


                profileBio.textContent =
                    BIO.slice(
                        0,
                        index
                    ) + "|";


                setTimeout(
                    writeBio,
                    45
                );

            } else {

                profileBio.textContent =
                    BIO;

            }

        }


        writeBio();

    }


    /* =========================
       MUSIC.MP3
    ========================= */

    function playMusic() {

        if (!backgroundMusic) {

            console.warn(
                "background-music elementi yok."
            );

            return;

        }


        backgroundMusic.volume =
            0.3;

        backgroundMusic.loop =
            true;

        backgroundMusic.muted =
            false;


        const result =
            backgroundMusic.play();


        if (
            result &&
            typeof result.catch ===
                "function"
        ) {

            result.catch(
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
       PROFİLİ GÖSTER
    ========================= */

    function showProfile() {

        if (!profileBlock) {
            return;
        }


        /*
          ÖNEMLİ:

          Original CSS:
          top: 50%;
          left: 50%;
          transform:
          translate(-50%, -50%);

          Bu translate korunmazsa
          kart sağa / aşağı kayıyor.
        */


        profileBlock.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";


        profileBlock.style.opacity =
            "0";


        profileBlock.style.transform =
            `
            translate(-50%, -45%)
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            `;


        profileBlock.classList.remove(
            "hidden"
        );


        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        profileBlock.style.opacity =
                            "1";


                        profileBlock.style.transform =
                            `
                            translate(-50%, -50%)
                            perspective(1000px)
                            rotateX(0deg)
                            rotateY(0deg)
                            `;

                    }
                );

            }
        );


        if (profileContainer) {

            profileContainer.classList.add(
                "orbit"
            );

        }

    }


    /* =========================
       SITEYE GİR
    ========================= */

    function enterSite(event) {

        if (
            event &&
            event.type ===
                "touchstart"
        ) {

            event.preventDefault();

        }


        if (hasUserInteracted) {
            return;
        }


        hasUserInteracted =
            true;


        if (startScreen) {

            startScreen.classList.add(
                "hidden"
            );

        }


        playMusic();

        showProfile();

        typeWriterName();


        setTimeout(
            () => {

                typeWriterBio();

            },
            500
        );

    }


    /* =========================
       PROFİL KARTI 3D HAREKET

       Bu bölüm profil kutusunun
       mouse'a göre düzgün dönmesini
       sağlar.
    ========================= */

    function initializeTilt() {

        if (
            !profileBlock ||
            isTouchDevice
        ) {
            return;
        }


        let targetRotateX = 0;
        let targetRotateY = 0;

        let currentRotateX = 0;
        let currentRotateY = 0;

        let mouseInside =
            false;


        /*
          Çok yüksek yaparsan
          kart gereğinden fazla döner.
        */

        const MAX_ROTATION =
            8;


        profileBlock.addEventListener(
            "mousemove",
            (event) => {

                if (!hasUserInteracted) {
                    return;
                }


                mouseInside =
                    true;


                const rect =
                    profileBlock.getBoundingClientRect();


                const mouseX =
                    event.clientX -
                    rect.left;


                const mouseY =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const percentX =
                    (
                        mouseX -
                        centerX
                    ) /
                    centerX;


                const percentY =
                    (
                        mouseY -
                        centerY
                    ) /
                    centerY;


                /*
                  Mouse sağa:
                  kart sağ tarafa döner.

                  Mouse yukarı:
                  kart yukarı kalkar.
                */

                targetRotateY =
                    percentX *
                    MAX_ROTATION;


                targetRotateX =
                    -percentY *
                    MAX_ROTATION;

            }
        );


        profileBlock.addEventListener(
            "mouseleave",
            () => {

                mouseInside =
                    false;


                targetRotateX =
                    0;


                targetRotateY =
                    0;

            }
        );


        function animateTilt() {

            /*
              LERP sayesinde
              takılmadan yumuşak döner.
            */

            currentRotateX +=
                (
                    targetRotateX -
                    currentRotateX
                ) *
                0.10;


            currentRotateY +=
                (
                    targetRotateY -
                    currentRotateY
                ) *
                0.10;


            if (
                hasUserInteracted &&
                profileBlock
            ) {

                profileBlock.style.transform =
                    `
                    translate(-50%, -50%)
                    perspective(1000px)
                    rotateX(${currentRotateX}deg)
                    rotateY(${currentRotateY}deg)
                    `;

            }


            requestAnimationFrame(
                animateTilt
            );

        }


        animateTilt();

    }


    /* =========================
       PROFİL FOTOĞRAFI EFEKTİ
    ========================= */

    function initializeProfileEffects() {

        if (
            !profilePicture ||
            !profileContainer
        ) {
            return;
        }


        /*
          Mouse avatar üstüne gelince
          glitch.
        */

        profilePicture.addEventListener(
            "mouseenter",
            () => {

                if (!glitchOverlay) {
                    return;
                }


                glitchOverlay.style.opacity =
                    "1";


                setTimeout(
                    () => {

                        glitchOverlay.style.opacity =
                            "0";

                    },
                    350
                );

            }
        );


        /*
          Avatar'a basınca
          beyaz halka hızla döner.
        */

        function fastOrbit() {

            profileContainer.classList.remove(
                "fast-orbit"
            );


            profileContainer.classList.remove(
                "orbit"
            );


            /*
              Animasyonu resetlemek için.
            */

            void profileContainer.offsetWidth;


            profileContainer.classList.add(
                "fast-orbit"
            );


            setTimeout(
                () => {

                    profileContainer.classList.remove(
                        "fast-orbit"
                    );


                    void profileContainer.offsetWidth;


                    profileContainer.classList.add(
                        "orbit"
                    );

                },
                500
            );

        }


        profilePicture.addEventListener(
            "click",
            fastOrbit
        );


        profilePicture.addEventListener(
            "touchstart",
            (event) => {

                event.preventDefault();

                fastOrbit();

            },
            {
                passive: false
            }
        );

    }


    /* =========================
       EVENTLER
    ========================= */

    if (startScreen) {

        startScreen.addEventListener(
            "click",
            enterSite
        );


        startScreen.addEventListener(
            "touchstart",
            enterSite,
            {
                passive: false
            }
        );

    }


    /* =========================
       BAŞLAT
    ========================= */

    initializeCursor();

    initializeProfilePicture();

    initializeVisitorCounter();

    initializeStartText();

    initializeTilt();

    initializeProfileEffects();

});
