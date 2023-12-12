<template>
    <div class="portfolio-main-page">
        <div class="home-button">
            <img src="../assets/img/rabsystems-icon.png">
        </div>
        <div class="pagination-left">
            <techMoon />
        </div>
        <div class="presentation-circle">
            <div class="main-text">
                <h1 id="hello-text" class="typed-text" interval="7">Olá.</h1>
                <div class="secondary-text">
                    <h2>Saymon Felipe</h2>
                    <p>Desenvolvedor full stack <br> e web designer</p>
                </div>
            </div>
            <techCircle />
            <div class="menu-texts">
                <div class="text">
                    <p>UX/UI</p>
                </div>
                <div class="text">
                    <p>Front end</p>
                </div>
                <div class="text">
                    <p>Back end</p>
                </div>
                <div class="text">
                    <p>Database</p>
                </div>
                <div class="text">
                    <p>Dev ops</p>
                </div>
            </div>
            <audioManager />
        </div>
        <div class="pagination-right">
            <techMoon />
        </div>
    </div>
</template>
<script>
import techCircle from "../components/techCircle.vue";
import techMoon from "../components/techMoon.vue";
import audioManager from "../components/audioManager.vue";
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "mainPage",
    mixins: [globalMethods],
    mounted: function () {
        this.typeText("hello-text");
    },
    components: {
        techCircle,
        techMoon,
        audioManager
    }
}
</script>
<style scoped>

.portfolio-main-page {
    height: 100vh;
    width: 100vw;
}

.pagination-left, .pagination-right {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
}

.pagination-left {
    left: calc(-5rem - 11vw);
}

.pagination-right {
    right: calc(-5rem - 11vw);
}

.presentation-circle {
    margin: auto;
    height: fit-content;
    width: fit-content;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.home-button {
    width: calc(2rem + 2vw);
    height: calc(2rem + 2vw);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #404040;
    cursor: pointer;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 4vh;
}

.main-text {
    position: absolute;
    top: 0;
    left: -23%;
    bottom: 0;
    margin: auto;
    z-index: 5;
    height: fit-content;
}

@media (max-width: 1550px) {
    .main-text {
        top: 10%;
        bottom: initial;
        margin: initial;
    }
}

.main-text h1, .main-text h2, .main-text p {
    text-shadow: 3px 3px 7px rgba(0, 0, 0, 1);
}

.secondary-text {
    position: relative;
    padding-left: 63px;
}

    .secondary-text::before {
        content: '';
        width: 40px;
        height: 4px;
        border-radius: 4px;
        background: var(--gray-high);
        position: absolute;
        left: 0;
        top: 14px;
        margin: auto;
    }

.menu-texts {
    height: fit-content;
    position: absolute;
    top: 0;
    bottom: 0;
    right: -3rem;
    margin: auto;
}

    .menu-texts .text {
        margin: 2rem 0;
        width: 90px;
        cursor: pointer;
        transition: transform 0.4s;
    }

        .menu-texts .text:hover {
            transform: translateX(7%);
        }

    .text:nth-child(1) {
        margin-left: -17%;
    }

    .text:nth-child(2) {
        margin-left: -7%;
    }

    .text:nth-child(4) {
        margin-left: -7%;
    }

    .text:nth-child(5) {
        margin-left: -17%;
    }

.typed-text {
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid #333;
    animation: blink-caret 1s step-end infinite;
}

@keyframes blink-caret {
    from,
    to {
        border-color: transparent;
    }
    50% {
        border-color: #333;
    }
}
</style>