<template>
    <div class="modal">
        <div class="close-button" v-on:click="closeModal()" v-if="modalclosebutton">
            <i class="fa fa-times"></i>
        </div>
        <h2 id="modal-title" :datatext="modaltitle" interval="7">{{ modaltitle }}</h2>
        <p id="modal-text" :datatext="modaltext" interval="5" speed="50">{{ modaltext }}</p>
        <i id="fullscreen-icon" class="animate__animated animate__pulse animate__infinite infinite" :class="modalicon" v-on:click="submitModal()"></i>
        <div class="animation-container">
            <lottie-player id="rotate-phone" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>
        <div class="slot-container">
            <slot></slot>
        </div>
        <div class="modal-image" v-if="modalimageurl != ''">
            <img :src="modalimageurl">
        </div>
    </div>
</template>
<script>
import { globalMethods } from "../js/globalMethods.js";
import rotatePhoneJson from "../assets/animations/rotate-phone.json";
import $ from 'jquery';

export default {
    name: "modalComponent",
    mixins: [globalMethods],
    props: ["modaltitle", "modaltext", "modalicon", "modalclosebutton", "withanimation", "modalimageurl"],
    methods: {
        submitModal: function () {
            this.$emit("saveModal", true);
        },
        closeModal: function () {
            this.$emit("closeModal", true);
        }
    },
    mounted: function () {
        this.typeText("modal-title");
        this.typeText("modal-text");

        const player = document.querySelector("#rotate-phone");

        if (player) {
            player.addEventListener("rendered", () => {
                player.load(
                    rotatePhoneJson
                );

                if (this.withanimation && this.modalimageurl == "") {
                    $(".animation-container").css("display", "flex");
                }
            });
        }

        if ($("#fullscreen-icon").hasClass("fas")) {
            $(".slot-container").hide();
        } else {
            $(".slot-container").show();
        }
    }
}
</script>
<style scoped>
.modal {
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    padding: 2em;
    display: flex;
    flex-direction: column;
}

#fullscreen-icon, .animation-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    color: var(--gray-high);
    width: 100vw;
    text-align: center;
    font-size: 5em;
    cursor: pointer;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

    .modal lottie-player {
        width: 10rem;
        height: fit-content;
    }

    .modal img {
        width: 100%;
        height: 86%;
        object-fit: contain;
        flex: 1;
        border-radius: 20px;
        margin-top: 1rem;
        border: 2px solid var(--gray-high);
        background-color: var(--black);
    }

.animation-container {
    display: none;
}

.close-button {
    z-index: 1000;
    left: initial;
    right: 2rem;
    color: var(--gray-high);
}

    .close-button i {
        position: relative !important;
        font-size: 1.4rem;
        bottom: initial;
    }
</style>