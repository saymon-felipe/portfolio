<template>
    <div class="tech-circle-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle class="circle" cx="50" cy="50" r="40"/>
            <circle class="circle-half" cx="50" cy="50" r="40"/>
        </svg>
        <div class="circle-content">
            <div class="inner-circle" ref="dynamicShadow" @click="toggleBounce" :class="{ 'active': isBouncing }">
                <img src="../assets/img/saymon-foto.png" alt="Saymon Felipe">
            </div>
        </div>
    </div>
</template>
<script>
import $ from 'jquery';

export default {
    name: "techCircle",
    data() {
        return {
            isBouncing: false
        }
    },
    methods: {
        toggleBounce() {
            this.isBouncing = true;
            setTimeout(() => {
                this.isBouncing = false;
            }, 500);
        },
    },
    mounted: function () {
        $(document).mousemove((event) => {
            const mouseX = event.clientX;
            const mouseY = event.clientY;

            const shadowX = (mouseX / window.innerWidth) * 20 - 10;
            const shadowY = (mouseY / window.innerHeight) * 20 - 10;

            let element = this.$refs.dynamicShadow;

            if (element != undefined) {
                element.style.setProperty('--shadow-x', `${shadowX}px`);
                element.style.setProperty('--shadow-y', `${shadowY}px`);
            }
        });
    }
}
</script>
<style scoped>    

.circle-content {
    position: absolute;
}

.tech-circle-container {
    position: relative;
    width: calc(16rem + 32vw);
    height: calc(16rem + 32vw);
    display: flex;
    align-items: center;
    justify-content: center;
}

    .tech-circle-container svg {
        position: absolute;
    }

.circle {
    z-index: 2;
}

.circle, .circle-half {
    position: relative;
    fill: transparent;
    stroke: #404040; /* Cinza escuro para a borda do círculo */
    stroke-width: 0.3;
    stroke-dasharray: 246 1000; /* Define o traçado inicial como zero e o comprimento total do círculo como 1000 */
    stroke-linecap: round;
    transform-origin: center;
    transform: rotate(125deg);
    animation: rotateCircle 12s ease-in-out infinite alternate;
}

.circle-half {
    stroke: var(--white);
    stroke-width: 0.4;
    stroke-dasharray: 45 1000; /* Define o traçado inicial como zero e o comprimento total do círculo como 1000 */
    z-index: 3;
    animation: rotateCircleLine 8s ease-in-out infinite alternate;
    transform: rotate(-35deg);
}

@keyframes rotateCircleLine {
    to {
        transform: rotate(-20deg);
    }
}

@keyframes rotateCircle {
    to {
        transform: rotate(140deg);
    }
}

.line {
    fill: none;
    stroke: #fff; /* Branco para a linha */
    stroke-width: 5;
    stroke-dasharray: 50 200; /* Define o comprimento visível (50) e o espaçamento total (200) */
    animation: moveLine 4s linear infinite;
}

@keyframes rotateLine {
    to {
        stroke-dashoffset: -150; /* Move a linha ao longo da circunferência */
    }
}

.inner-circle {
    width: calc(9rem + 12vw);
    height: calc(9rem + 12vw);
    background: var(--white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 5px 10px 16px rgba(0, 0, 0, 0.8);
    position: relative;
    animation: none;
}

.inner-circle.active {
    animation: bounceAnimation 0.6s ease-in-out;
}

    .inner-circle::before {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: inherit;
        box-shadow: var(--shadow-x, 0) var(--shadow-y, 0) 100px rgba(3, 199, 254, 0.7);
    }

    .inner-circle img {
        width: 95%;
        margin-right: -14%;
        margin-top: -28%;
        pointer-events: none;
        user-select: none;
        position: relative;
        z-index: 5;
    }

    @keyframes bounceAnimation {
      10% {
        transform: scale(1.05);
      }
      30% {
        transform: scale(0.95);
      }
      50% {
        transform: scale(1.02);
      }
      70% {
        transform: scale(0.97);
      }
      90% {
        transform: scale(1.01);
      }
      100% {
        transform: scale(1);
      }
    }
</style>