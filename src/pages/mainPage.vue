<template>
    <div class="portfolio-main-page">
        <div class="home-button" v-on:click="restoreMenu()">
            <img src="../assets/img/rabsystems-icon.png">
        </div>
        <div class="pagination-left" v-on:click="backScroll()">
            <techMoon />
        </div>
        <div class="presentation-circle">
            <div class="main-text">
                <h1 id="principal-text" class="typed-text" interval="7" datatext="Olá.">Olá.</h1>
                <div class="secondary-text">
                    <h2>Saymon Felipe</h2>
                    <p>Desenvolvedor full stack e web designer</p>
                </div>
            </div>
            <div class="home-content">
                <lottie-player id="click" class="click-audio" background="transparent" speed="1" loop autoplay v-on:click="showHabilitiesModal()"></lottie-player>
                <div class="habilities-container">
                    <habilitiesComponent :type="habilities" />
                </div>
                <techCircle />
                <div class="menu-texts">
                    <div class="text hover-audio click-audio" v-on:click="selectMenu(1)">
                        <p>UX/UI</p>
                    </div>
                    <div class="text hover-audio click-audio" v-on:click="selectMenu(2)">
                        <p>Front end</p>
                    </div>
                    <div class="text hover-audio click-audio" v-on:click="selectMenu(3)">
                        <p>Back end</p>
                    </div>
                    <div class="text hover-audio click-audio" v-on:click="selectMenu(4)">
                        <p>Database</p>
                    </div>
                    <div class="text hover-audio click-audio" v-on:click="selectMenu(5)">
                        <p>Dev ops</p>
                    </div>
                </div>
                <audioManager />
            </div>
            <div class="projects-content">
                <projectsComponent />
            </div>
            <div class="contact-content">
                <contactComponent />
            </div>
        </div>
        <div class="pagination-right" v-on:click="advanceScroll()">
            <techMoon />
        </div>
        <footerComponent @changeMenu="changeMenu($event)" :menuselected="pageScroll" />
        <modal v-if="showModal" :modaltitle="modalTitle" :modaltext="modalText" :modalicon="modalIcon" :modalclosebutton="modalCloseButton" :withanimation="withAnimation" :modalimageurl="modalImageUrl" @saveModal="initiateFullScreen($event)" @closeModal="hideModal()">
            <responsiveHabilitiesComponent :type="habilities" v-if="!withAnimation" />
        </modal>
    </div>
</template>
<script>
import techCircle from "../components/techCircle.vue";
import techMoon from "../components/techMoon.vue";
import audioManager from "../components/audioManager.vue";
import modal from "../components/modal.vue";
import responsiveHabilitiesComponent from "../components/responsiveHabilitiesComponent.vue";
import habilitiesComponent from "../components/habilitiesComponent.vue";
import footerComponent from "../components/footerComponent.vue";
import projectsComponent from "../components/projectsComponent.vue";
import contactComponent from "../components/contactComponent.vue";
import clickJson from "../assets/animations/click.json";
import { globalMethods } from "../js/globalMethods.js";
import $ from 'jquery';
import gsap from 'gsap';

export default {
    name: "mainPage",
    mixins: [globalMethods],
    data() {
        return {
            habilities: "",
            pageScroll: 0,
            previousScroll: 0
        }
    },
    watch: {
        pageScroll: function () {
            this.changePageContent(this.pageScroll, this.previousScroll);
        }
    },
    methods: {
        checkPaginations: function () {
            if (this.pageScroll == 0) {
                $(".pagination-left").addClass("pagination-disabled");
            } else if (this.pageScroll == 2) {
                $(".pagination-right").addClass("pagination-disabled");
            }
        },
        changePaginations: function (direction) {
            const paginationLeft = $(".pagination-left");
            const paginationRight = $(".pagination-right");
            const paginations = $(".pagination-right, .pagination-left");

            if (direction == "left") {

                gsap.to(paginations, {
                    x: '-102vw',
                    rotate: 360,
                    duration: 1,
                    ease: "ease-in-out"
                });

                setTimeout(() => {
                    paginationLeft.css("opacity", 0);

                    gsap.to(paginationLeft, {
                        x: '0',
                        duration: 0.31,
                        onComplete: function () {
                            gsap.set(paginationLeft, { x: 0 });

                            gsap.to(paginations, {
                                rotate: 0,
                                duration: 0.9
                            });
                        }
                    });

                    setTimeout(() => {
                        paginationLeft.css("opacity", 1);
                        paginationRight.css("opacity", 0);

                        paginations.removeClass("pagination-disabled");

                        gsap.to(paginationRight, {
                            x: '10vw',
                            duration: 0.1
                        });

                        setTimeout(() => {
                            paginationRight.css("opacity", 1);

                            this.checkPaginations();

                            gsap.to(paginationRight, {
                                x: '0',
                                duration: 0.9,
                                ease: "ease-in-out"
                            });
                        }, 100)
                    }, 310)
                }, 800)
            } else if (direction == "right") {
                gsap.to(paginations, {
                    x: '102vw',
                    rotate: -360,
                    duration: 1,
                    ease: "ease-in-out"
                });

                setTimeout(() => {
                    paginationRight.css("opacity", 0);
                    
                    gsap.to(paginationRight, {
                        x: '0',
                        duration: 0.31,
                        onComplete: function () {
                            gsap.set(paginationRight, { x: "0" });

                            gsap.to(paginations, {
                                rotate: 0,
                                duration: 0.5
                            });
                        }
                    });

                    setTimeout(() => {
                        paginationRight.css("opacity", 1);
                        paginationLeft.css("opacity", 0);

                        paginations.removeClass("pagination-disabled");

                        gsap.to(paginationLeft, {
                            x: '-10vw',
                            duration: 0.1
                        });

                        setTimeout(() => {
                            paginationLeft.css("opacity", 1);

                            this.checkPaginations();

                            gsap.to(paginationLeft, {
                                x: '0',
                                duration: 0.5,
                                ease: "ease-in-out"
                            });
                        }, 100)
                    }, 310)
                }, 800)
            }
        },
        slideFirstContentToLeft: function () {
            const homeContent = $(".home-content");
            const homeButton = $(".home-button");

            gsap.to(homeContent, {
                x: '-100vw',
                duration: 1,
                ease: "ease-in-out"
            });

            gsap.to(homeButton, {
                x: '-100vw',
                duration: 1,
                ease: "ease-in-out"
            });
        },
        slideFirstContentToRight: function () {
            const homeContent = $(".home-content");
            const homeButton = $(".home-button");

            gsap.to(homeContent, {
                x: '0',
                duration: 1,
                ease: "ease-in-out"
            });

            gsap.to(homeButton, {
                x: '0',
                duration: 1,
                ease: "ease-in-out"
            });
        },
        slideSecondContentToLeft: function (moreLeft = false) {
            const homeContent = $(".projects-content");

            gsap.to(homeContent, {
                x: moreLeft ? '-100vw' : '9vw',
                duration: 1,
                ease: "ease-in-out"
            });
        },
        slideSecondContentToRight: function (zeroPosition = false) {
            const homeContent = $(".projects-content");

            gsap.to(homeContent, {
                x: zeroPosition ? '9vw' : '100vw',
                duration: 1,
                ease: "ease-in-out"
            });
        },
        slideThirdContentToLeft: function () {
            const homeContent = $(".contact-content");

            gsap.to(homeContent, {
                x: '9vw',
                duration: 1,
                ease: "ease-in-out"
            });
        },
        slideThirdContentToRight: function () {
            const homeContent = $(".contact-content");

            gsap.to(homeContent, {
                x: '100vw',
                duration: 1,
                ease: "ease-in-out"
            });
        },
        changePageContent: function (current_page_number, previous_page_number) {
            switch (current_page_number) {
                case 0:
                    this.loadHome();
                    if (previous_page_number != 0) {
                        this.changePaginations("right");
                        this.slideFirstContentToRight();
                        this.slideSecondContentToRight();
                        this.slideThirdContentToRight();
                    }
                    break;
                case 1:
                    this.loadProjects();
                    if (previous_page_number == 0) {
                        this.changePaginations("left");
                        this.slideFirstContentToLeft();
                        this.slideSecondContentToLeft();
                        
                    } else if (previous_page_number == 2) {
                        this.changePaginations("right");
                        this.slideSecondContentToRight(true);
                        this.slideThirdContentToRight();
                    }
                    break;
                case 2:
                    this.loadContact();
                    if (previous_page_number == 0 || previous_page_number == 1) {
                        this.changePaginations("left");
                        this.slideFirstContentToLeft();
                        this.slideSecondContentToLeft(true);
                        this.slideThirdContentToLeft();
                    }
                    break;
            }
        },
        backScroll: function () {
            if (this.pageScroll != 0) {
                this.pageScroll--;
                setTimeout(() => {
                    this.previousScroll--;
                }, 1)
            }
        },
        advanceScroll: function () {
            if (this.pageScroll < 2) {
                this.pageScroll++;
                setTimeout(() => {
                    this.previousScroll++;
                }, 1)
            }
        },
        loadProjects: function () {
            this.setText("Projetos.", "", "Web: código e design. HTML, CSS, JavaScript. Frameworks e libs.");
        },
        loadHome: function () {
            this.restoreMenu();
            this.setText("Olá.", "", "Desenvolvedor full stack e web designer");
        },
        loadContact: function () {
            this.setText("Contato.", "", "Saiba como me encontrar. Ouse me chamar");
        },
        changeMenu: function (event) {
            this.pageScroll = event;
            setTimeout(() => {
                this.previousScroll = event;
            }, 1)
        },
        selectMenu: function (index) {
            $(".menu-texts .text").removeClass("selected");
            $(".menu-texts").removeClass("selected-menu");
            
            $(".menu-texts").addClass("selected-menu");
            $(`.menu-texts .text:nth-child(${index})`).addClass("selected");

            this.hideHabilitiesContainer().then(() => {
                switch (index) {
                    case 1:
                        this.setText("UX/UI", "", "Design intuitivo que cativa e simplifica interações.");
                        this.habilities = "ux";
                        break;
                    case 2:
                        this.setText("Front end", "", "Transformando ideias em experiências visuais interativas.");
                        this.habilities = "front";
                        break;
                    case 3:
                        this.setText("Back end", "", "Potencializando a funcionalidade por trás das telas.");
                        this.habilities = "back";
                        break;
                    case 4:
                        this.setText("Database", "", "Armazenando, organizando e gerenciando informações.");
                        this.habilities = "db";
                        break;
                    case 5:
                        this.setText("Dev ops", "", "Integração contínua, entrega rápida, colaboração eficiente.");
                        this.habilities = "dev";
                        break;
                }

                this.rollMenuToTop();
            });
        },
        hideHabilitiesContainer: function () {
            return new Promise((resolve) => {
                const habilitiesComponent = $(".habilities-container");

                habilitiesComponent.css("opacity", 0);

                setTimeout(() => {
                    habilitiesComponent.hide();
                    resolve();
                }, 400)   
            }) 
        },
        showHabilitiesContainer: function () {
            const habilitiesComponent = $(".habilities-container");

            habilitiesComponent.show();

            setTimeout(() => {
                habilitiesComponent.css("opacity", 1);
            }, 1)
        },
        hideInicialPhoto: function () {
            let photo = $("#profile-photo");
            photo.animate({ opacity: 0 }, 500, () => {
                photo.hide();
            })
        },
        showInicialPhoto: function () {
            let photo = $("#profile-photo");
            photo.show();
            setTimeout(() => {
                photo.animate({ opacity: 1 }, 500)
            }, 1)
        },
        hideClickAnimation: function () {
            return new Promise((resolve) => {
                const clickAnimation = $("#click");

                clickAnimation.css("opacity", 0);
                setTimeout(() => {
                    clickAnimation.hide();
                    resolve();
                }, 400)
            })
        },
        showClickAnimation: function () {
            return new Promise((resolve) => {
                const clickAnimation = $("#click");

                clickAnimation.show();
                
                setTimeout(() => {
                    clickAnimation.css("opacity", 1);
                    resolve();
                }, 400)
            })
        },
        restoreMenu: function () {
            const menu = $(".menu-texts");
            const menuItems = $('.text');
            const innerCircle = $(".tech-circle-container .inner-circle");

            if (!$(".home-button").hasClass("clicable")) return;

            this.setText("Olá.", "Saymon Felipe", "Desenvolvedor full stack e web designer");
            this.showInicialPhoto();

            this.hideClickAnimation().then(() => {
                this.habilities = "";
            })

            this.hideHabilitiesContainer().then(() => {
                gsap.to(innerCircle, { //Retornar a escala do circulo central para 1
                    scale: '1',
                    duration: 0.4
                });
            });

            //Posições iniciais dos itens do menu
            const initialPositions = [
                { marginLeft: '-17%' },
                { marginLeft: '-7%' },
                { marginLeft: 0 },
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
            const innerCircle = $(".tech-circle-container .inner-circle");

            $(".home-button").addClass("clicable");

            this.hideInicialPhoto();

            if ($(window).width() < 1050) {
                gsap.to(menu, {
                    x: '50%',
                    duration: 0.4
                });

                gsap.to(menuItems, {
                    marginLeft: '-17%',
                    duration: 0.5,
                    stagger: 0.05
                });

                if (this.isMobileDevice()) {
                    this.hideClickAnimation().then(() => {
                        this.showClickAnimation();
                    });
                }
            } else {
                gsap.to(menu, {
                    x: '-7.8vw',
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
                        stagger: 0.05
                    });

                    gsap.to(innerCircle, {
                        scale: '1.3',
                        duration: 0.4,
                        onComplete: () => {
                            this.showHabilitiesContainer();
                        }
                    });
                }, 200)
            }
        },
        showHabilitiesModal: function () {
            this.fillModalVariables("", "Essas são minhas habilidades nessa categoria", "", true);
        }
    },
    mounted: function () {
        const player = document.querySelector("#click");
        player.addEventListener("rendered", () => {
            player.load(
                clickJson
            );
        });

        this.initEventListeners();
        this.checkPaginations();
    },
    components: {
        techCircle,
        techMoon,
        audioManager,
        modal,
        responsiveHabilitiesComponent,
        habilitiesComponent,
        footerComponent,
        projectsComponent,
        contactComponent
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
    z-index: 999;
}

.pagination-left {
    left: calc(-5rem - 11vw);
}

.pagination-right {
    right: calc(-5rem - 11vw);
}

.pagination-disabled {
    opacity: 0.5 !important;
}

.presentation-circle {
    margin: auto;
    width: calc(14rem + 28vw);
    height: calc(14rem + 28vw);
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

@media (max-width: 1050px) {
    .tech-circle-container {
        width: calc(10rem + 18vw);
        height: calc(10rem + 18vw);
    }
}

.home-content, .projects-content, .contact-content {
    position: absolute;
    z-index: 6;
}

.projects-content, .contact-content {
    transform: translateX(103vw);
    right: 0;
    z-index: 9999;
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
    z-index: 9;
}

.main-text {
    position: absolute;
    top: 0;
    left: -30%;
    bottom: 0;
    margin: auto;
    z-index: 7;
    height: fit-content;
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

.menu-texts.selected-menu {
    right: 0;
    left: 0;
}

.menu-texts {
    height: fit-content;
    position: absolute;
    top: 0;
    bottom: 0;
    right: calc(-1rem - 3vw);
    margin: auto;
    transition: all 0.5s ease-in-out;
    z-index: 5;
}

    .menu-texts .text {
        margin: 2rem 0;
        width: 104px;
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

@media (max-width: 1050px) {

    .pagination-left {
        left: calc(-3rem - 9vw);
    }

    .pagination-right {
        right: calc(-3rem - 9vw);
    }

    .main-text {
        left: -17%;
    }

    .main-text p {
        max-width: 200px !important;
    }

    .menu-texts {
        right: calc(-2rem - 7vw);
    }

        .menu-texts .text {
            margin-top: 0.7rem;
            margin-bottom: 0.7rem;
        }
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

#click {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 6;
    transition: opacity 0.4s;
    opacity: 0;
    display: none;
    cursor: pointer;
    z-index: 9;
}

@media (max-width: 1050px) {

    #click {
        width: calc(5rem + 9vw);
        height: calc(5rem + 9vw);
    }
}

.habilities-container {
    transition: opacity 0.4s;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    /*display: flex;*/
    display: none;
    opacity: 0;
    align-items: center;
    justify-content: center;
    z-index: 6;
    width: fit-content;
    height: fit-content;
}
</style>