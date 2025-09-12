(() => {

    const texts = document.querySelectorAll('.text-container span');
    let index = 0;
    const delay = 15000; // 10 seconds

    setInterval(() => {
        texts[index].classList.remove('active');   // hide current
        index = (index + 1) % texts.length;        // move to next
        texts[index].classList.add('active');      // show next
    }, delay);

    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");

    btn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            btn.textContent = "Stop";
        } else {
            music.pause();
            btn.textContent = "Click";
        }
    });



    // ====== Плавная смена времени суток + звезды ======
    const castle = document.getElementById('castle');
    let hour = 0; // 0-23
    function updateTimeOfDay() {
        // hour меняем медленно — например, +0.05 каждый тик
        hour = (hour + 0.05) % 24;

        let castle = document.getElementById('castle');

        if (hour < 6) { // ночь
            castle.style.background = 'linear-gradient(#001020, #000010)';
            showStars(true);
        }
    }
    function showStars(visible) {
        let stars = document.querySelectorAll('.star');
        if (stars.length === 0 && visible) {
            for (let i = 0; i < 150; i++) { // было 50 → стало 150
                const s = document.createElement('span');
                s.classList.add('star');
                s.style.left = Math.random() * window.innerWidth + 'px';
                s.style.top = Math.random() * window.innerHeight + 'px';
                s.style.animationDelay = Math.random() * 2 + 's';
                castle.appendChild(s);
            }
        }
        stars.forEach(star => {
            star.style.opacity = visible ? 1 : 0;
        });
    }
    // Меняем каждые 5 секунд для демо (можно сделать медленнее)
    setInterval(updateTimeOfDay, 100);
    updateTimeOfDay();





    const flower = document.getElementById("flower-wrap");
    const flowerBox = document.getElementById("flower-wrap"); // добавь эту строку

    function createFallingHeart() {
        const heart = document.createElement('span');
        heart.classList.add('falling-heart');

        const size = Math.random() * 6 + 6; // 6-12px
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';

        const x = Math.random() * (flowerBox.offsetWidth - size);
        heart.style.left = x + 'px';
        heart.style.top = '-10px';

        const duration = Math.random() * 3 + 2; // 2-5 сек
        heart.style.animationDuration = duration + 's';

        flowerBox.appendChild(heart);

        setTimeout(() => heart.remove(), duration * 1000);
    }

    // Создаём сердца чаще
    setInterval(createFallingHeart, 100);

// Генерация снежинки
    function createSnowflake() {
        const snow = document.createElement("span");
        snow.classList.add("snowflake");

        // Размер снежинки случайный
        const size = Math.random() * 3 + 2; // 2-5px
        snow.style.width = size + "px";
        snow.style.height = size + "px";

        // Стартовая позиция внутри цветка
        const x = Math.random() * (flower.offsetWidth - size);
        const y = Math.random() * 20; // чуть сверху
        snow.style.left = x + "px";
        snow.style.top = y + "rem";

        // Случайная длительность падения
        const duration = Math.random() * 3 + 2; // 2-5 сек
        snow.style.animationDuration = duration + "s";

        flower.appendChild(snow);

        // Удаляем после анимации
        setTimeout(() => snow.remove(), duration * 1000);
    }

// Постоянное создание снежинок (интенсивность выше)
    setInterval(createSnowflake, 100); // каждые 0.1 сек

// Постоянное появление снежинок
    setInterval(createSnowflake, 100); // каждые 0.3 сек



    // Handle hearts -> open modals
    const hearts = document.querySelectorAll(".heart");
    const modals = document.querySelectorAll(".modal");
    const closes = document.querySelectorAll(".close");

// Фиксированные "магические" позиции сердец (не над цветком)
    const heartPaths = [
        {left: 40, top: 22, dx: 15, dy: -10, duration: 4}
    ];

    hearts.forEach((heart, i) => {
        heart.addEventListener("click", () => {
            const modalId = heart.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "block";
        });
        const path = heartPaths[i % heartPaths.length];

        // Начальная позиция
        heart.style.left = path.left + "%";
        heart.style.top = path.top + "%";

        // Уникальные движения по траектории
        const dx = path.dx + Math.random() * 10 - 5; // добавляем небольшую случайность
        const dy = path.dy + Math.random() * 10 - 5;
        heart.style.setProperty("--x", dx + "px");
        heart.style.setProperty("--y", dy + "px");

        // Длительность анимации с небольшой вариацией
        const duration = path.duration + Math.random() * 0.5 - 0.25;
        heart.style.animationDuration = duration + "s";
    });

// Close when clicking X
    closes.forEach(close => {
        close.addEventListener("click", () => {
            close.closest(".modal").style.display = "none";
        });
    });

// Close when clicking outside modal
    window.addEventListener("click", (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    });



    const head = document.getElementsByTagName('head')[0];
    let animationId = 1;

    function CreateMagicDust(x1, x2, y1, y2, sizeRatio, fallingTime, animationDelay, node = 'main') {
        let dust = document.createElement('span');
        let animation = document.createElement('style');
        animation.innerHTML = '\
        @keyframes blink' + animationId + '{\
            0% {\
                top: ' + y1 + 'px;\
                left: ' + x1 + 'px;\
                width: ' + 2*sizeRatio + 'px;\
                height: ' + 2*sizeRatio + 'px;\
                opacity: .4\
            }\
            20% {\
                width: ' + 4*sizeRatio + 'px;\
                height: ' + 4*sizeRatio + 'px;\
                opacity: .8\
            }\
            35% {\
                width: ' + 2*sizeRatio + 'px;\
                height: ' + 2*sizeRatio + 'px;\
                opacity: .5\
            }\
            55% {\
                width: ' + 3*sizeRatio + 'px;\
                height: ' + 3*sizeRatio + 'px;\
                opacity: .7\
            }\
            80% {\
                width: ' + sizeRatio + 'px;\
                height: ' + sizeRatio + 'px;\
                opacity: .3\
            }\
            100% {\
                top: ' + y2 + 'px;\
                left: ' + x2 + 'px;\
                width: ' + 0 + 'px;\
                height: ' + 0 + 'px;\
                opacity: .1\
            }}';
        head.appendChild(animation);
        dust.classList.add('dustDef');
        dust.setAttribute('style', `animation: blink${animationId++} ${fallingTime}s cubic-bezier(.71, .11, .68, .83) infinite ${animationDelay}s`);
        document.getElementById(node).appendChild(dust);
    }

    // yes, I'm doing it manually to get the effect I want.. can be easily changed to render randomly
    [[130, 132, 150, 152, .15, 2.5,.1, 'sub'],
        [65, 63, 300, 299, .5, 2, .2, 'sub' ],
        [70, 70, 150, 150, .45, 2, .5],
        [75, 78, 160, 170, .6, 2, 1],
        [80, 82, 160, 180, .6, 1, .4],
        [85, 100, 160, 170, .5, 2, .5],
        [125, 110, 170, 180, .25, 3, 1.5],
        [90, 90, 115, 115, .4, 2, 2],
        [93, 95, 200, 200, .4, 3, 1.5],
        [100, 100, 145, 155, .45, 1, .5],
        [100, 90, 170, 230, .35, 2, .75],
        [100, 102, 115, 112, .35, 3, .25],
        [100, 95, 170, 200, .55, 1.5, .75],
        [100, 97, 150, 190, .7, 2, 1.5],
        [105, 100, 160, 180, .5, 1.5, .725],
        [125, 125, 180, 190, .25, 1, .725],
        [130, 130, 135, 135, .45, 3, 1.5],
        [135, 132, 170, 190, .25, 2.5, .75],
        [135, 132, 320, 315, .2, 5, .3, 'sub']
    ].forEach((o) => CreateMagicDust(...o));



})();
