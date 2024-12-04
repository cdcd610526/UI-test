(function fairyDustCursor() {
    var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
    var width = window.innerWidth;
    var height = window.innerHeight;
    var cursor = { x: width / 2, y: width / 2 };
    var particles = [];
    var isMouseDown = false;  // 添加 isMouseDown 变量，初始为 false

    function init() {
        bindEvents();
        loop();
    }

    // 绑定需要的事件
    function bindEvents() {
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onWindowResize);
        document.addEventListener('mousedown', onMouseDown); // 鼠标按下事件
        document.addEventListener('mouseup', onMouseUp); // 鼠标松开事件
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;
    }

    function onMouseMove(e) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        // 只有在鼠标按下时才生成粒子
        if (isMouseDown) {
            addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
        }
    }

    function onMouseDown(e) {
        isMouseDown = true; // 开始按下鼠标时，启用拖尾效果
    }

    function onMouseUp(e) {
        isMouseDown = false; // 松开鼠标时，禁用拖尾效果
    }

    function addParticle(x, y, color) {
        var particle = new Particle();
        particle.init(x, y, color);
        particles.push(particle);
    }

    function updateParticles() {
        for (var i = 0; i < particles.length; i++) {
            particles[i].update();
        }
        for (var i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].die();
                particles.splice(i, 1);
            }
        }
    }

    function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }

    function Particle() {
        this.character = "*";
        this.lifeSpan = 120; //ms
        this.initialStyles = {
            "position": "fixed",
            "display": "inline-block",
            "top": "0px",
            "left": "0px",
            "pointerEvents": "none",
            "touch-action": "none",
            "z-index": "10000000",
            "fontSize": "25px",
            "will-change": "transform"
        };

        this.init = function (x, y, color) {
            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };
            this.position = { x: x + 10, y: y + 10 };
            this.initialStyles.color = color;

            this.element = document.createElement('span');
            this.element.innerHTML = this.character;
            applyProperties(this.element, this.initialStyles);
            this.update();

            document.querySelector('.js-cursor-container').appendChild(this.element);
        };

        this.update = function () {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;

            this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
        }

        this.die = function () {
            this.element.parentNode.removeChild(this.element);
        }

    }

    function applyProperties(target, properties) {
        for (var key in properties) {
            target.style[key] = properties[key];
        }
    }

    if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
})();
