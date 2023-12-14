<template>
    <div class="modal">
        <div class="close-button" v-on:click="closeModal()" v-if="modalclosebutton">
            <i class="fa fa-times"></i>
        </div>
        <h2 id="modal-title" :datatext="modaltitle" interval="7">{{ modaltitle }}</h2>
        <p id="modal-text" :datatext="modaltext" interval="5" speed="50">{{ modaltext }}</p>
        <i id="fullscreen-icon" class="animate__animated animate__pulse animate__infinite infinite" :class="modalicon" v-on:click="submitModal()"></i>
        <div class="animation-container">
            <lottie-player id="rotate-phone" class="click-audio" background="transparent" speed="1" loop autoplay></lottie-player>
        </div>
        <div class="slot-container" v-if="!withanimation">
            <slot></slot>
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
    props: ["modaltitle", "modaltext", "modalicon", "modalclosebutton", "withanimation"],
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
        player.addEventListener("rendered", () => {
            player.load(
                rotatePhoneJson
            );

            if (this.withanimation) {
                $(".animation-container").css("display", "flex");
            }
        });
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
    z-index: 999;
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
}

    .modal lottie-player {
        width: 10rem;
        height: fit-content;
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