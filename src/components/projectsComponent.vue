<template>
    <div class="projects-component">
        <div class="projects-container">
            <div class="projects-internal">
                <div class="project" v-for="(project, index) in projects" :key="index" v-on:click="showOptions(project.link, project.url, project.title)">
                    <img :src="project.url" :alt="project.title">
                    <div class="project-details">
                        <h2 :title="project.title">{{ project.title }}</h2>
                        <p :title="project.description">{{ project.description }}</p>
                    </div>
                </div>
            </div>
            <div class="options-container">
                <div class="option" v-on:click="sendToLink()" :class="currentSendLink == '' ? 'disabled' : ''">
                    <i class="fas fa-external-link-alt"></i>
                </div>
                <div class="option" v-on:click="openShowModal()">
                    <i class="far fa-eye"></i>
                </div>
            </div>
        </div>
        <div class="options-container-wrapper" v-if="this.currentImage != ''" v-on:click="hideOptions()"></div>
        <modal v-if="showModal" :modaltitle="modalTitle" :modaltext="modalText" :modalicon="modalIcon" :modalclosebutton="modalCloseButton" :withanimation="withAnimation" :modalimageurl="modalImageUrl" @closeModal="hideModal()"></modal>
    </div>
</template>
<script>
import $ from 'jquery';
import { globalMethods } from "../js/globalMethods.js";
import modal from "./modal.vue";

export default {
    name: "projectsComponent",
    mixins: [globalMethods],
    data() {
        return {
            projects: [
            {
                    url: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/cda-thumb.png",
                    title: "CDA Esports - Onde nascem lendas.",
                    description: "Site comercial para apresentação do produto Cademint, que é um sistema de gerenciamento de tarefas. (Em construção)",
                    link: ""
                },
                {
                    url: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/portal-aluno-thumb.png",
                    title: "Portal do aluno - Solutto ERP",
                    description: "E-commerce especializado em material didático. (Em lançamento)",
                    link: ""
                },
                {
                    url: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/portal-aluno-2-thumb.png",
                    title: "Carrinho de compras - Solutto ERP",
                    description: "Carrinho de compras do e-commerce. (Em lançamento)",
                    link: ""
                },
                {
                    url: require("../assets/img/projects/mokaly-thumb.png"),
                    title: "Mokaly",
                    description: "Site comercial para apresentação do produto Mokaly, uma ferramenta de integração de equipes distribuídas.",
                    link: "https://www.mokaly.com"
                },
                {
                    url: require("../assets/img/projects/solutto-thumb.png"),
                    title: "Solutto - ERP para franquias",
                    description: "Site comercial para apresentação do produto Solutto, um sistema de ERP para franquias.",
                    link: "https://www.solutto.com.br"
                },
                {
                    url: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/sistema-mokaly-thumb.png",
                    title: "Mokaly (Sistema)",
                    description: "Sistema interno do produto Mokaly, uma ferramenta de integração de equipes distribuídas.",
                    link: "https://app.mokaly.com"
                },
                {
                    url: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/sistema-solutto-thumb.png",
                    title: "Solutto - ERP para franquias (Sistema)",
                    description: "Sistema interno e modular do Solutto, ERP para franquias.",
                    link: "https://sistema.solutto.com.br"
                },
                {
                    url: "https://rabsystems-storage.s3.sa-east-1.amazonaws.com/gourmetech.png",
                    title: "Gourmetech - ERP para restaurantes",
                    description: "Gourmetech é um sistema totalmente modular construído para impulsionar a gestão de restaurantes. (Em construção)",
                    link: ""
                },
                {
                    url: require("../assets/img/projects/rabsystems-site-thumb.png"),
                    title: "Rabsystems - Conectando ideias, criando possibilidades",
                    description: "Site comercial da Rabsystems, empresa de criação de sites e softwares.",
                    link: "https://rabsystems.com.br"
                },
                {
                    url: require("../assets/img/projects/rabsystems-thumb.png"),
                    title: "Rabsystems - Conectando ideias, criando possibilidades",
                    description: "Sistema interno da Rabsystems, feito para gerenciar os pedidos dos clientes e promover a comunicação entre cliente e desenvolvedor.",
                    link: "https://app.rabsystems.com.br/login"
                },
                {
                    url: require("../assets/img/projects/cademint-system-thumb.png"),
                    title: "Cademint - Organize. Colabore. Conquiste.",
                    description: "Sistema de gerenciamento que utiliza um kanban como forma de organizar tarefas e compromissos.",
                    link: "https://app-cademint.netlify.app/login"
                },
                {
                    url: require("../assets/img/projects/chatnet.jpg"),
                    title: "Chatnet",
                    description: "App para comunicação entre usuários que funciona sem a necessidade de estar conectado à internet. (Em construção)",
                    link: ""
                }
            ],
            currentSendLink: "",
            currentImage: "",
            currentTitle: ""
        }
    },
    methods: {
        sendToLink: function () {
            if (this.currentSendLink == "") return;

            window.open(this.currentSendLink, "_blank");
        },
        openShowModal: function () {
            this.fillModalVariables(this.currentTitle, "", "", true, true, this.currentImage);
        },
        hideOptions: function (event) {
            console.log(event)

            let optionsContainer = $(".options-container");

            optionsContainer.removeClass("show");

            this.currentSendLink = "";
            this.currentImage = "";
            this.currentTitle = "";
        },
        showOptions: function (external_link, image, title) {
            let optionsContainer = $(".options-container");

            optionsContainer.removeClass("show");
            
            setTimeout(() => {
                optionsContainer.addClass("show");
            }, 400)

            this.currentSendLink = external_link;
            this.currentImage = image;
            this.currentTitle = title;

            setTimeout(() => {
                this.translateOptionsWrapper();
            }, 1)
        },
        translateOptionsWrapper: function () {
            let wrapper = $(".options-container-wrapper");
            
            if (wrapper.css("transform") != "none" && wrapper.css("transform") != undefined) return;

            let wrapperPosition = wrapper.position();

            let calculatedX = wrapperPosition.left;
            let calculatedY = wrapperPosition.top;
            
            wrapper.css("transform", `translate(-${calculatedX}px, -${calculatedY}px)`);
        },
        monitorateScroll: function () {
            let self = this;
            let containerScroll = $(".projects-internal");
            
            containerScroll.scrollTop(0);

            containerScroll.on("scroll", () => {
                self.chooseScroll();
            })
        },
        resetScrollView: function (className, secondClass) {
            let containerShadow = $(".projects-container");

            containerShadow.removeClass(className).removeClass(secondClass);
        },
        chooseScroll: function () {
            let containerScroll = $(".projects-internal");
            let containerShadow = $(".projects-container");

            containerShadow.removeClass("shadow-bottom").removeClass("shadow-top").removeClass("all-shadows");

            const scrollPosition = Math.floor(containerScroll.scrollTop());
            const bottomLimit = Math.floor(containerScroll.prop("scrollHeight") - containerScroll.innerHeight());

            if (scrollPosition <= 16) {
                
                containerShadow.addClass("shadow-bottom-show");
                setTimeout(() => {
                    containerShadow.addClass("shadow-bottom");
                }, 1)

                setTimeout(() => {
                    this.resetScrollView("shadow-top-show", "all-shadows-show");
                }, 400);
            } else if (scrollPosition > 16 && scrollPosition < bottomLimit) {
                containerShadow.addClass("all-shadows-show");
                setTimeout(() => {
                    containerShadow.addClass("all-shadows");
                }, 1)
            } else {
                this.resetScrollView();
                containerShadow.addClass("shadow-top-show");
                setTimeout(() => {
                    containerShadow.addClass("shadow-top");
                }, 1)

                setTimeout(() => {
                    this.resetScrollView("shadow-bottom-show", "all-shadows-show");
                }, 400);
            }
        }
    },
    mounted: function () {
        this.chooseScroll();
        this.monitorateScroll();
    },
    components: {
        modal
    }
}
</script>
<style scoped>

.options-container-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 6;
}

.project {
    width: calc(10rem + 20vw);
    overflow: hidden;
    border-radius: 10px;
    position: relative;
    margin: 1rem 0;
    scroll-snap-align: start;
}

    .project img {
        aspect-ratio: 16 / 9;
        max-width: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

.project-details {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: fit-content;
    background-image: linear-gradient(transparent, var(--black));
    transition: opacity 0.4s;
    opacity: 0;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}

    .project-details h2 {
        font-size: 1rem;
        color: var(--white) !important;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 100%;
        overflow: hidden;
    }

    .project-details p {
        font-size: 0.8rem;
        color: var(--white) !important;
    }

.project:hover .project-details {
    opacity: 1;
}

.disabled, .disabled i {
    cursor: default !important;
    opacity: 0.6;
}

.projects-internal {
    height: 85vh;
    overflow-x: hidden;
    overflow-y: auto;
}

.projects-container {
    position: relative;
    transform: translateY(-5vh);
    overflow: hidden;
    z-index: 7;
}

.projects-container::before, .projects-container::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 30%;
    width: 100%;
    background-image: linear-gradient(var(--black), transparent);
    z-index: 5;
    transition: opacity 0.4s;
    opacity: 0;
    display: none;
}

@media (max-width: 1050px) {
    .projects-container::before, .projects-container::after {
        height: 10%;
    }
}

.projects-container::after {
    bottom: 0;
    top: initial;
    background-image: linear-gradient(transparent, var(--black));
}

.shadow-bottom-show::after, .shadow-top-show::before, .all-shadows-show::after, .all-shadows-show::before {
    display: block;
}


.shadow-bottom::after, .shadow-top::before, .all-shadows::after, .all-shadows::before {
    opacity: 1;
}

.projects-internal::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

.projects-internal::-webkit-scrollbar-thumb {
    background: var(--gray-high);
    border-radius: 10px;
}

.options-container.show {
    transform: translateY(0);
}

.options-container {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    max-height: 100px;
    z-index: 999;
    background-image: linear-gradient(transparent, var(--black));
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s;
    transform: translateY(5em);
}

    .options-container i {
        color: var(--gray-high);
        cursor: pointer;
        transition: all;
        font-size: 2em;
        margin: 0 1rem;
    }
</style>