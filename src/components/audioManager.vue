<template>
    <div class="audio-manager">
        <button v-on:click="avancar()" v-if="false">
            avançar
        </button>
        <div class="audio-buttons">
            <div class="audio-button" v-on:click="toggleBackgroundAudio()">
                <i class="fa" :class="backgroundAudio ? 'fa-volume-up' : 'fa-volume-off'"></i>
            </div>
            <div class="audio-button" v-on:click="toggleContainer()">
                <i class="fas fa-cog"></i>
            </div>
        </div>
        <div class="audio-manager-wrapper" v-on:click="toggleContainer()" v-if="showContainer"></div>
        <div class="audio-manager-container" v-if="showContainer">
            <label for="volumeRange">
                <p>Background:</p>
            </label>
            <input type="range" @input="changeBackgroundVolume($event)" v-model="backgroundVolume" id="volumeRange" min="0" max="1" step="0.1" value="0.5">
        </div>
        <audio id="menu-hover-audio">
            <source src="../assets/audio/menu-hover.mp3" type="audio/mp3">
        </audio>
        <audio id="select-audio">
            <source src="../assets/audio/select.mp3" type="audio/mp3">
        </audio>
        <audio id="background-audio">
            <source src="../assets/audio/background.mp3" type="audio/mp3">
        </audio>
        <audio id="switch-audio">
            <source src="../assets/audio/switch.mp3" type="audio/mp3">
        </audio>
        <audio id="type-audio">
            <source src="../assets/audio/type.mp3" type="audio/mp3">
        </audio>
    </div>
</template>
<script>
import $ from 'jquery';
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "audioManager",
    mixins: [globalMethods],
    data() {
        return {
            showContainer: false,
            backgroundAudio: false,
            backgroundVolume: 0.1
        }
    },
    methods: {
        toggleContainer: function () {
            this.showContainer = !this.showContainer;
        },
        playBackgroundAudio: function () {
            this.playAudio("background-audio", this.backgroundVolume);
        },
        stopBackgroundAudio: function () {
            this.stopAudio("background-audio");
        },
        toggleBackgroundAudio: function () {
            this.backgroundAudio = !this.backgroundAudio;
            this.backgroundVolume = 0.1;

            if (this.backgroundAudio) {
                this.playBackgroundAudio();
            } else {
                this.stopBackgroundAudio();
            }
        },
        stopAudio: function (audio_id) {
            let audio = $("#" + audio_id)[0];
            audio.pause();
        },
        changeBackgroundVolume: function () {
            let audio = $("#background-audio")[0];
            audio.volume = this.backgroundVolume;

            if (audio.paused) {
                this.playAudio("background-audio", this.backgroundVolume);
            }

            if (this.backgroundVolume == 0) {
                this.backgroundAudio = false;
                this.stopAudio("background-audio");
            } else {
                this.backgroundAudio = true;
            }
        },
        avancar: function () {
            let element = $("#background-audio")[0];
            element.currentTime = element.duration - 10;
        }
    },
    mounted: function () {
        let clickElements = $(".click-audio");
        let overElements = $(".hover-audio");

        overElements.on("mouseenter", () => {
            this.playAudio("menu-hover-audio", 0.5);
        })

        clickElements.on("click", () => {
            this.playAudio("select-audio");
        })

        $("#background-audio").on("ended", () => {
            this.playAudio("background-audio");
        })

        $(".home-button").on("click", () => {
            if ($(".home-button").hasClass("clicable")) {
                this.playAudio("switch-audio");
                $(".home-button").removeClass("clicable");
            }
        })

        $(".pagination-left .circle-content, .pagination-right .circle-content").on("click", () => {
            this.playAudio("switch-audio");
        })
    }
}
</script>
<style scoped>
.audio-manager {
    position: absolute;
    right: 0;
    bottom: 0;
}

.audio-buttons {
    display: flex;
    align-items: center;
}

.audio-button {
    width: 50px;
    height: 50px;
    border: 1px solid #404040;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 7px;
}

.audio-button:nth-child(2) {
    width: 40px;
    height: 40px;
}

    .audio-button:nth-child(2) i {
        font-size: 1em;
        margin-left: 0;
    }

    .audio-button i {
        color: var(--gray-high);
        font-size: 1.5em;
        margin-left: -2px;
    }

.audio-manager-container {
    position: absolute;
    bottom: 110%;
    left: 0;
    right: 0;
    width: fit-content;
    margin: auto;
    padding: 1rem;  
    border: 1px solid #404040;
    border-radius: 20px;
    background: var(--black);
    z-index: 6;
    width: fit-content;
    height: fit-content;
}

    .audio-manager-container input {
        margin-top: 10px;
    }

.audio-manager-wrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 5;
}

@media (max-width: 1050px) {
    .audio-manager {
        top: -3vh;
        transform: translateX(5vw);
        height: fit-content;
        z-index: 6;
    }

    .audio-manager-container {
        bottom: 0;
        top: 193%;
    }
}
</style>