<template>
    <div class="portfolio-main-page">
        <div class="home-button" v-on:click="deselectMenu(); restoreMenu()">
            <img src="../assets/img/rabsystems-icon.png">
        </div>
        <div class="pagination-left">
            <techMoon />
        </div>
        <div class="presentation-circle">
            <div class="main-text">
                <h1 id="principal-text" class="typed-text" interval="7" datatext="Olá.">Olá.</h1>
                <div class="secondary-text">
                    <h2>Saymon Felipe</h2>
                    <p>Desenvolvedor full stack <br> e web designer</p>
                </div>
            </div>
            <techCircle />
            <div class="menu-texts">
                <div class="text" v-on:click="selectMenu(1)">
                    <p>UX/UI</p>
                </div>
                <div class="text" v-on:click="selectMenu(2)">
                    <p>Front end</p>
                </div>
                <div class="text" v-on:click="selectMenu(3)">
                    <p>Back end</p>
                </div>
                <div class="text" v-on:click="selectMenu(4)">
                    <p>Database</p>
                </div>
                <div class="text" v-on:click="selectMenu(5)">
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
import $ from 'jquery';
import gsap from 'gsap';

export default {
    name: "mainPage",
    mixins: [globalMethods],
    methods: {
        selectMenu: function (index) {
            this.deselectMenu();
            
            $(".menu-texts").addClass("selected-menu");
            $(`.menu-texts .text:nth-child(${index})`).addClass("selected");

            this.rollMenuToTop();
            this.hideInicialPhoto();

            switch (index) {
                case 1:
                    this.setText("UX/UI", "", "Design intuitivo que cativa e simplifica interações.");
                    break;
                case 2:
                    this.setText("Front end", "", "Transformando ideias em experiências visuais interativas.");
                    break;
                case 3:
                    this.setText("Back end", "", "Potencializando a funcionalidade por trás das telas.");
                    break;
                case 4:
                    this.setText("Database", "", "Armazenando, organizando e gerenciando informações.");
                    break;
                case 5:
                    this.setText("Dev ops", "", "Integração contínua, entrega rápida, colaboração eficiente.");
                    break;
            }
        },
        hideInicialPhoto: function () {
            let photo = $(".inner-circle img");
            photo.animate({ opacity: 0 }, 500, () => {
                photo.hide();
            })
        },
        showInicialPhoto: function () {
            let photo = $(".inner-circle img");
            photo.show();
            setTimeout(() => {
                photo.animate({ opacity: 1 }, 500)
            }, 1)
        },
        restoreMenu: function () {
            const menu = $(".menu-texts");
            const menuItems = $('.text');

            if (!$(".home-button").hasClass("clicable")) return;

            this.setText("Olá.", "", "Desenvolvedor full stack e web designer");
            this.showInicialPhoto();

            // Defina as posições iniciais
            const initialPositions = [
                { marginLeft: '-17%' },
                { marginLeft: '-7%' },
                { marginLeft: 0 },  // O terceiro item não será afetado pela animação de margem
                { marginLeft: '-7%' },
                { marginLeft: '-17%' },
            ];

            gsap.to(menu, {
                x: '0',
                y: '0',
                duration: 0.5
            });

            setTimeout(() => {
                gsap.to(menuItems, {
                    marginLeft: function(index) {
                        return initialPositions[index].marginLeft;
                    },
                    textAlign: 'left',
                    marginTop: '0',
                    duration: 0.5,
                    stagger:  0.05
                });
            }, 200)
            
        },
        rollMenuToTop: function () {
            const menu = $(".menu-texts");
            const menuItems = $('.text');
            $(".home-button").addClass("clicable");

            gsap.to(menu, {
                x: '-7vw',
                y: '-30vh',
                duration: 0.4
            });

            setTimeout(() => {
                gsap.to(menuItems, {
                    marginLeft: function(index) {
                        return (index * 120) + 'px';
                    },
                    textAlign: 'center',
                    marginTop: '-55px',
                    duration: 0.5,
                    stagger: 0.05,  // Espaçamento entre os elementos (ajuste conforme necessário)
                });
            }, 200)
        },
        deselectMenu: function () {
            $(".menu-texts .text").removeClass("selected");
            $(".menu-texts").removeClass("selected-menu");
        }
    },
    mounted: function () {
        this.typeText("principal-text");
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

.main-text p {
    max-width: 260px;
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
    transition: all 0.5s ease-in-out;
    z-index: 5;
}

    .menu-texts .text {
        margin: 2rem 0;
        width: 90px;
        height: 24px;
        cursor: pointer;
        transition: transform 0.4s ease-in-out;
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

.selected-menu {
}
</style>