<template>
    <div class="tech-moon-container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle class="circle" cx="50" cy="50" r="40"/>
            <circle class="circle-half" cx="50" cy="50" r="40"/>
        </svg>
        <div class="circle-content">
            <div class="inner-circle">
                <img src="../assets/img/moon.png">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "techMoon"
}
</script>
<style scoped>

.tech-moon-container {
    width: fit-content;
    height: fit-content;
    border-radius: 50%;
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: rotate 60s infinite ease-in-out;
    transform: rotate(360deg);
}

@keyframes rotate {
    0% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(0);
    }
}

.circle-content {
    position: absolute;
}

.tech-moon-container {
    position: relative;
    width: calc(8rem + 22vw);
    height: calc(8rem + 22vw);
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
    stroke-dasharray: 400 1000; /* Define o traçado inicial como zero e o comprimento total do círculo como 1000 */
}

.circle-half {
    stroke: var(--white);
    stroke-width: 0.4;
    stroke-dasharray: 45 1000; /* Define o traçado inicial como zero e o comprimento total do círculo como 1000 */
    stroke-linecap: round;
    z-index: 3;
    transform-origin: center;
    animation: rotateCircleLine 8s ease-in-out infinite alternate;
    transform: rotate(-35deg);
}

@keyframes rotateCircleLine {
    to {
        transform: rotate(-20deg);
    }
}

.inner-circle {
    width: calc(4rem + 9vw);
    height: calc(4rem + 9vw);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    transition: all 0.4s;
}

    .inner-circle:hover {
        width: calc(4.4rem + 9vw);
        height: calc(4.4rem + 9vw);
    }

    .pagination-disabled .inner-circle:hover {
        width: calc(4rem + 9vw) !important;
        height: calc(4rem + 9vw) !important;
        cursor: default !important;
    }

    .inner-circle img {
        width: 95%;
        pointer-events: none;
        user-select: none;
        border: 7px solid transparent;
        outline: 5px solid var(--white);
        border-radius: 50%;
    }

@media (max-width: 1050px) {
    .tech-moon-container {
        width: calc(6rem + 15vw);
        height: calc(6rem + 15vw);
    }

    .inner-circle {
        width: calc(3rem + 8vw);
        height: calc(3rem + 8vw);
    }

        .inner-circle:hover {
            width: calc(3.4rem + 8vw);
            height: calc(3.4rem + 8vw);
        }

        .pagination-disabled .inner-circle:hover {
            width: calc(4rem + 9vw) !important;
            height: calc(4rem + 9vw) !important;
            cursor: default !important;
        }
}

</style>