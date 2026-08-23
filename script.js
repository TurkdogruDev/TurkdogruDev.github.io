let hasUserInteracted = false;

function initMedia() {
  const backgroundMusic = document.getElementById('background-music');

  if (!backgroundMusic) return;

  backgroundMusic.volume = 0.3;
  backgroundMusic.load();
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
  const cursor = document.querySelector('.custom-cursor');

  const PROFILE_NAME = 'TurkdogruDev/T.Dev';
  const PROFILE_BIO =
    'I dont know what to put but my favorite color is white.';

  const START_MESSAGE = 'Click To Enter!';
  const GITHUB_USER = 'TurkdogruDev';

  // GitHub profil fotoğrafı
  if (profilePicture) {
    profilePicture.src =
      `https://github.com/${GITHUB_USER}.png?size=300`;

    fetch(`https://api.github.com/users/${GITHUB_USER}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('GitHub profile request failed');
        }

        return response.json();
      })
      .then((data) => {
        if (data && data.avatar_url) {
          profilePicture.src = `${data.avatar_url}&s=300`;
        }
      })
      .catch(() => {
        // API çalışmazsa yukarıdaki direkt GitHub avatarı kullanılır.
      });
  }

  const isTouchDevice =
    window.matchMedia('(pointer: coarse)').matches;

  // Özel mouse cursor + beyaz iz efekti
  if (cursor) {
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
      cursor.style.display = 'none';
    } else {
      const trail = [];

      for (let i = 0; i < 8; i++) {
        const dot = document.createElement('div');

        dot.className = 'cursor-trail-dot';
        dot.style.position = 'fixed';
        dot.style.pointerEvents = 'none';
        dot.style.zIndex = '9998';
        dot.style.opacity = String(0.65 - i * 0.065);

        document.body.appendChild(dot);

        trail.push({
          el: dot,
          x: 0,
          y: 0
        });
      }

      let mouseX = innerWidth / 2;
      let mouseY = innerHeight / 2;

      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        cursor.style.display = 'block';
      });

      document.addEventListener('mousedown', () => {
        cursor.style.transform =
          'scale(0.8) translate(-50%, -50%)';
      });

      document.addEventListener('mouseup', () => {
        cursor.style.transform =
          'scale(1) translate(-50%, -50%)';
      });

      const animateTrail = () => {
        let x = mouseX;
        let y = mouseY;

        trail.forEach((dot, index) => {
          dot.x += (x - dot.x) * 0.34;
          dot.y += (y - dot.y) * 0.34;

          dot.el.style.left = `${dot.x}px`;
          dot.el.style.top = `${dot.y}px`;

          dot.el.style.transform =
            `translate(-50%, -50%) scale(${1 - index * 0.07})`;

          x = dot.x;
          y = dot.y;
        });

        requestAnimationFrame(animateTrail);
      };

      animateTrail();
    }
  }

  // Ziyaretçi sayacı
  function initializeVisitorCounter() {
    if (!visitorCount) return;

    let totalVisitors =
      Number(localStorage.getItem('totalVisitorCount')) || 921234;

    if (!localStorage.getItem('hasVisited')) {
      totalVisitors += 1;

      localStorage.setItem(
        'totalVisitorCount',
        String(totalVisitors)
      );

      localStorage.setItem(
        'hasVisited',
        'true'
      );
    }

    visitorCount.textContent =
      totalVisitors.toLocaleString();
  }

  initializeVisitorCounter();

  // Giriş yazısı animasyonu
  let startIndex = 0;
  let startCursorVisible = true;
  let startTextContent = '';

  function typeWriterStart() {
    if (!startText) return;

    if (startIndex < START_MESSAGE.length) {
      startTextContent =
        START_MESSAGE.slice(0, ++startIndex);

      setTimeout(
        typeWriterStart,
        90
      );
    }

    startText.textContent =
      startTextContent +
      (startCursorVisible ? '|' : ' ');
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;

    if (startText) {
      startText.textContent =
        startTextContent +
        (startCursorVisible ? '|' : ' ');
    }
  }, 500);

  // İsim ve bio yazma animasyonu
  function typeOnce(
    element,
    text,
    speed,
    glitchChance = 0.06
  ) {
    if (!element) return;

    let index = 0;

    element.textContent = '';

    const write = () => {
      if (index < text.length) {
        index += 1;

        element.textContent =
          text.slice(0, index) + '|';

        if (Math.random() < glitchChance) {
          element.classList.add('glitch');

          setTimeout(() => {
            element.classList.remove('glitch');
          }, 180);
        }

        setTimeout(
          write,
          speed
        );
      } else {
        element.textContent = text;
      }
    };

    write();
  }

  // Click To Enter'e basınca
  function enterProfile(event) {
    if (event?.type === 'touchstart') {
      event.preventDefault();
    }

    if (hasUserInteracted) return;

    hasUserInteracted = true;

    startScreen?.classList.add('hidden');

    // music.wav başlat
    if (backgroundMusic) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.volume = 0.3;

      backgroundMusic
        .play()
        .catch(() => {
          // Tarayıcı sesi engellerse hata verme.
        });
    }

    // Profil kartını göster
    if (profileBlock) {
      profileBlock.classList.remove('hidden');

      if (window.gsap) {
        gsap.fromTo(
          profileBlock,
          {
            opacity: 0,
            y: -50
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',

            onComplete: () => {
              profileBlock.classList.add(
                'profile-appear'
              );
            }
          }
        );
      } else {
        profileBlock.style.opacity = '1';
      }
    }

    profileContainer?.classList.add('orbit');

    typeOnce(
      profileName,
      PROFILE_NAME,
      110
    );

    setTimeout(() => {
      typeOnce(
        profileBio,
        PROFILE_BIO,
        42,
        0.025
      );
    }, 350);
  }

  startScreen?.addEventListener(
    'click',
    enterProfile,
    {
      once: true
    }
  );

  startScreen?.addEventListener(
    'touchstart',
    enterProfile,
    {
      once: true,
      passive: false
    }
  );

  // Profil fotoğrafına basınca
  // beyaz kenar hızlı dönsün
  const spinAvatarBorder = (event) => {
    if (event?.type === 'touchstart') {
      event.preventDefault();
    }

    if (!profileContainer) return;

    profileContainer.classList.remove(
      'fast-orbit',
      'orbit'
    );

    void profileContainer.offsetWidth;

    profileContainer.classList.add(
      'fast-orbit'
    );

    setTimeout(() => {
      profileContainer.classList.remove(
        'fast-orbit'
      );

      void profileContainer.offsetWidth;

      profileContainer.classList.add(
        'orbit'
      );
    }, 500);
  };

  profilePicture?.addEventListener(
    'click',
    spinAvatarBorder
  );

  profilePicture?.addEventListener(
    'touchstart',
    spinAvatarBorder,
    {
      passive: false
    }
  );

  // Profil kartı mouse ile 3D hareket etsin
  function handleTilt(e) {
    if (!profileBlock || isTouchDevice) {
      return;
    }

    const rect =
      profileBlock.getBoundingClientRect();

    const x =
      e.clientX -
      (rect.left + rect.width / 2);

    const y =
      e.clientY -
      (rect.top + rect.height / 2);

    const rotationX =
      (y / rect.height) * 12;

    const rotationY =
      -(x / rect.width) * 12;

    if (window.gsap) {
      gsap.to(
        profileBlock,
        {
          rotationX,
          rotationY,
          duration: 0.28,
          ease: 'power2.out',
          transformPerspective: 1000
        }
      );
    }
  }

  profileBlock?.addEventListener(
    'mousemove',
    handleTilt
  );

  profileBlock?.addEventListener(
    'mouseleave',
    () => {
      if (window.gsap) {
        gsap.to(
          profileBlock,
          {
            rotationX: 0,
            rotationY: 0,
            duration: 0.45,
            ease: 'power2.out'
          }
        );
      }
    }
  );

  typeWriterStart();
});
