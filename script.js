let hasUserInteracted = false;

function initMedia() {
  const music = document.getElementById('background-music');
  if (!music) return;

  music.volume = 0.35;
  music.loop = true;
  music.preload = 'auto';
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const profileBlock = document.getElementById('profile-block');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const cursor = document.querySelector('.custom-cursor');

  const isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches;

  const PROFILE_NAME =
    'TurkdogruDev/T.Dev';

  const PROFILE_BIO =
    'I dont know what to put but my favorite color is white.';

  const START_MESSAGE =
    'Click To Enter!';

  const COUNTER_KEY =
    'turkdogrudev_profile_views_v12';

  const START_COUNT =
    10258;

  initMedia();


  /* =====================================
     CUSTOM TEMPLATE CURSOR
  ===================================== */

  if (isTouchDevice) {

    document.body.classList.add(
      'touch-device'
    );

    if (cursor) {
      cursor.style.display =
        'none';
    }

  } else if (cursor) {

    let mouseX =
      -100;

    let mouseY =
      -100;

    let cursorX =
      -100;

    let cursorY =
      -100;

    let lastSparkAt =
      0;


    function makeSpark(x, y) {

      const spark =
        document.createElement(
          'span'
        );

      spark.className =
        'cursor-spark';


      const angle =
        Math.random() *
        Math.PI *
        2;


      const distance =
        8 +
        Math.random() *
        17;


      const dx =
        Math.cos(angle) *
        distance;


      const dy =
        Math.sin(angle) *
        distance;


      const size =
        2 +
        Math.random() *
        3;


      spark.style.left =
        `${x}px`;

      spark.style.top =
        `${y}px`;

      spark.style.width =
        `${size}px`;

      spark.style.height =
        `${size}px`;

      spark.style.setProperty(
        '--spark-x',
        `${dx}px`
      );

      spark.style.setProperty(
        '--spark-y',
        `${dy}px`
      );


      document.body.appendChild(
        spark
      );


      window.setTimeout(
        () => {

          spark.remove();

        },
        650
      );
    }


    document.addEventListener(
      'mousemove',
      (event) => {

        mouseX =
          event.clientX;

        mouseY =
          event.clientY;


        cursor.classList.add(
          'cursor-active'
        );


        const now =
          performance.now();


        if (
          now -
          lastSparkAt >
          28
        ) {

          makeSpark(
            mouseX,
            mouseY
          );

          lastSparkAt =
            now;
        }

      }
    );


    function animateCursor() {

      /*
        Cursor çok geriden gelmesin.
        Template hissi için hafif smooth.
      */

      cursorX +=
        (
          mouseX -
          cursorX
        ) *
        0.58;


      cursorY +=
        (
          mouseY -
          cursorY
        ) *
        0.58;


      cursor.style.left =
        `${cursorX}px`;

      cursor.style.top =
        `${cursorY}px`;


      requestAnimationFrame(
        animateCursor
      );
    }


    animateCursor();


    /* TIKLAMA */

    document.addEventListener(
      'mousedown',
      () => {

        document.body.classList.add(
          'cursor-clicking'
        );

      }
    );


    document.addEventListener(
      'mouseup',
      () => {

        document.body.classList.remove(
          'cursor-clicking'
        );

      }
    );


    /* LINK / BUTTON HOVER */

    document.addEventListener(
      'mouseover',
      (event) => {

        const clickable =
          event.target.closest(
            'a, button, .profile-picture, .badge-container'
          );


        if (clickable) {

          document.body.classList.add(
            'cursor-hovering'
          );

        }

      }
    );


    document.addEventListener(
      'mouseout',
      (event) => {

        const clickable =
          event.target.closest(
            'a, button, .profile-picture, .badge-container'
          );


        if (clickable) {

          document.body.classList.remove(
            'cursor-hovering'
          );

        }

      }
    );


    /* PENCEREDEN ÇIKINCA CURSORU GİZLE */

    document.documentElement.addEventListener(
      'mouseleave',
      () => {

        cursor.classList.remove(
          'cursor-active'
        );

      }
    );


    document.documentElement.addEventListener(
      'mouseenter',
      () => {

        cursor.classList.add(
          'cursor-active'
        );

      }
    );

  }


  /* =====================================
     BROKEN ASSET FALLBACKS

     Badge dosyası yoksa kırık görsel yerine
     yazı göster.
  ===================================== */

  const badgeFallbacks = {

    'Staff':
      'S',

    'Owner':
      'O',

    'Partner':
      'P',

    'Developer':
      '</>',

    'Bug Bounty':
      'BB',

    'Hated by Guns.lol':
      'HG',

    'Hated by Fakecrime.bio':
      'HF',

    'Verified':
      '✓',

    'Rule Maker':
      'RM'

  };


  document
    .querySelectorAll('.badge')
    .forEach((img) => {

      img.addEventListener(
        'error',
        () => {

          const fallback =
            document.createElement(
              'span'
            );


          fallback.className =
            'badge badge-fallback';


          fallback.textContent =
            badgeFallbacks[
              img.alt
            ] ||
            '•';


          img.replaceWith(
            fallback
          );

        },
        {
          once: true
        }
      );

    });


  document
    .querySelectorAll('.skill-icon')
    .forEach((img) => {

      img.addEventListener(
        'error',
        () => {

          img.style.display =
            'none';

        },
        {
          once: true
        }
      );

    });


  /* =====================================
     CLICK TO ENTER TYPEWRITER
  ===================================== */

  let startIndex =
    0;

  let startCursorVisible =
    true;

  let startTypedText =
    '';


  function typeWriterStart() {

    if (!startText) {
      return;
    }


    if (
      startIndex <
      START_MESSAGE.length
    ) {

      startTypedText =
        START_MESSAGE.slice(
          0,
          startIndex + 1
        );


      startIndex +=
        1;


      window.setTimeout(
        typeWriterStart,
        90
      );

    }


    startText.textContent =
      startTypedText +
      (
        startCursorVisible
          ? '|'
          : ' '
      );

  }


  window.setInterval(
    () => {

      if (
        !startText ||
        hasUserInteracted
      ) {
        return;
      }


      startCursorVisible =
        !startCursorVisible;


      startText.textContent =
        startTypedText +
        (
          startCursorVisible
            ? '|'
            : ' '
        );

    },
    500
  );


  /* =====================================
     VISITOR COUNTER

     İlk yükleme:
     10,258

     Sonraki:
     10,259
     10,260
     ...
  ===================================== */

  function initializeVisitorCounter() {

    if (!visitorCount) {
      return;
    }


    let count =
      START_COUNT;


    try {

      const saved =
        Number.parseInt(
          localStorage.getItem(
            COUNTER_KEY
          ),
          10
        );


      if (
        Number.isFinite(
          saved
        ) &&
        saved >=
          START_COUNT
      ) {

        count =
          saved + 1;

      }


      localStorage.setItem(
        COUNTER_KEY,
        String(count)
      );

    } catch (error) {

      console.warn(
        'Visitor counter could not use localStorage:',
        error
      );

    }


    visitorCount.textContent =
      count.toLocaleString(
        'en-US'
      );

  }


  initializeVisitorCounter();


  /* =====================================
     PROFILE NAME / BIO TYPEWRITER
  ===================================== */

  function typeTextOnce(
    element,
    text,
    speed,
    glitch = false
  ) {

    if (!element) {
      return;
    }


    let index =
      0;


    element.textContent =
      '';


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
          '|';


        if (
          glitch &&
          Math.random() <
            0.08
        ) {

          element.classList.add(
            'glitch'
          );


          window.setTimeout(
            () => {

              element.classList.remove(
                'glitch'
              );

            },
            160
          );

        }


        window.setTimeout(
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


  /* =====================================
     OPEN PROFILE + MUSIC
  ===================================== */

  function enterSite(event) {

    if (
      event?.type ===
      'touchstart'
    ) {

      event.preventDefault();

    }


    if (hasUserInteracted) {
      return;
    }


    hasUserInteracted =
      true;


    /* GİRİŞ EKRANINI KAPAT */

    startScreen?.classList.add(
      'hidden'
    );


    /* MUSIC.MP3 */

    if (backgroundMusic) {

      backgroundMusic.volume =
        0.35;

      backgroundMusic.muted =
        false;

      backgroundMusic.loop =
        true;


      backgroundMusic
        .play()
        .catch(
          (error) => {

            console.warn(
              'music.mp3 could not be played:',
              error
            );

          }
        );

    }


    /* PROFİLİ GÖSTER */

    if (profileBlock) {

      profileBlock.classList.remove(
        'hidden'
      );


      profileBlock.classList.remove(
        'profile-appear'
      );


      /*
        Animation reset.
      */

      void profileBlock.offsetWidth;


      profileBlock.classList.add(
        'profile-appear'
      );


      profileBlock.style.opacity =
        '1';

    }


    profileContainer?.classList.add(
      'orbit'
    );


    /* NAME */

    typeTextOnce(
      profileName,
      PROFILE_NAME,
      85,
      true
    );


    /* BIO */

    window.setTimeout(
      () => {

        typeTextOnce(
          profileBio,
          PROFILE_BIO,
          32,
          false
        );

      },
      320
    );

  }


  startScreen?.addEventListener(
    'click',
    enterSite,
    {
      once: true
    }
  );


  startScreen?.addEventListener(
    'touchstart',
    enterSite,
    {
      once: true,
      passive: false
    }
  );


  /* =====================================
     ORIGINAL-LIKE 3D PROFILE TILT

     ÖNEMLİ:
     translate(-50%, -50%) burada korunuyor.
     Bu olmazsa kutu hareket ederken
     konumundan kaçar.
  ===================================== */

  if (
    profileBlock &&
    !isTouchDevice
  ) {

    let targetX =
      0;

    let targetY =
      0;


    let currentX =
      0;

    let currentY =
      0;


    profileBlock.addEventListener(
      'mousemove',
      (event) => {

        const rect =
          profileBlock.getBoundingClientRect();


        const centerX =
          rect.left +
          rect.width / 2;


        const centerY =
          rect.top +
          rect.height / 2;


        const maxTilt =
          8;


        targetX =
          (
            (
              event.clientY -
              centerY
            ) /
            rect.height
          ) *
          maxTilt;


        targetY =
          -
          (
            (
              event.clientX -
              centerX
            ) /
            rect.width
          ) *
          maxTilt;

      }
    );


    profileBlock.addEventListener(
      'mouseleave',
      () => {

        targetX =
          0;

        targetY =
          0;

      }
    );


    function animateTilt() {

      currentX +=
        (
          targetX -
          currentX
        ) *
        0.10;


      currentY +=
        (
          targetY -
          currentY
        ) *
        0.10;


      if (
        hasUserInteracted
      ) {

        profileBlock.style.transform =
          `
          translate(-50%, -50%)
          perspective(1000px)
          rotateX(${currentX}deg)
          rotateY(${currentY}deg)
          `;

      }


      requestAnimationFrame(
        animateTilt
      );

    }


    animateTilt();

  }


  /* =====================================
     PROFILE IMAGE EFFECTS
  ===================================== */

  profilePicture?.addEventListener(
    'mouseenter',
    () => {

      if (!glitchOverlay) {
        return;
      }


      glitchOverlay.style.opacity =
        '1';


      window.setTimeout(
        () => {

          glitchOverlay.style.opacity =
            '0';

        },
        350
      );

    }
  );


  function fastOrbit(event) {

    if (
      event?.type ===
      'touchstart'
    ) {

      event.preventDefault();

    }


    if (!profileContainer) {
      return;
    }


    profileContainer.classList.remove(
      'fast-orbit',
      'orbit'
    );


    /*
      CSS animasyonunu resetle.
    */

    void profileContainer.offsetWidth;


    profileContainer.classList.add(
      'fast-orbit'
    );


    window.setTimeout(
      () => {

        profileContainer.classList.remove(
          'fast-orbit'
        );


        void profileContainer.offsetWidth;


        profileContainer.classList.add(
          'orbit'
        );

      },
      500
    );

  }


  profilePicture?.addEventListener(
    'click',
    fastOrbit
  );


  profilePicture?.addEventListener(
    'touchstart',
    fastOrbit,
    {
      passive: false
    }
  );


  /* =====================================
     START
  ===================================== */

  typeWriterStart();

});
