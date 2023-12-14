import $ from 'jquery';

export const globalMethods = {
    methods: {
        //Funções texto
        typeText: function (elementId, invert = false) {
            const $element = $(`#${elementId}`);
            const speed = $element.attr("speed") || 150;

            if ($element.length == 0 || !$element.is(":visible")) return;

            let animationInterval = parseInt($element.attr("interval"));
            let textToType = $element.attr("datatext");

            let index = 0;

            $element.css("width", "fit-content");

            if (invert) {
                index = textToType.length;
            } else {
                $element.html("&nbsp;");
            }
            
            const intervalId = setInterval(() => {
                let newElement = $(`#${elementId}`);

                if (newElement.length == 0 || !newElement.is(":visible")) {
                    clearInterval(intervalId);
                    return;
                }

                let typedText = textToType.slice(0, index);

                if (typedText.trim() != "" || invert) {
                    $element.text(typedText.trim()); // Atualiza o texto no elemento jQuery
                }
                
                if (!invert && index > textToType.length) {
                    clearInterval(intervalId);
                    setTimeout(() => {
                        this.typeText(elementId, true);
                    }, animationInterval * 1000);
                }

                if (invert && index == 0) {
                    $element.html("&nbsp;");
                    $element.css("width", 0);
                    clearInterval(intervalId);
                    setTimeout(() => {
                        this.typeText(elementId, false);
                    }, 1500)
                }

                if (invert) {
                    index--;
                } else {
                    index++;
                }
            }, speed);
        },
        setText: function (h1, h2 = "", p) {
            let h1Element = $(".main-text h1");
            let h2Element = $(".main-text h2");
            let pElement = $(".main-text p");
            h1Element.attr("datatext", h1);

            pElement.css("opacity", 0);
            h1Element.css("opacity", 0);

            if (h2 == "") {
                h2Element.css("opacity", 0);
                setTimeout(() => {
                    h2Element.hide();
                }, 400);
            } 

            setTimeout(() => {
                if (h2 != "") {
                    h2Element.show();

                    setTimeout(() => {
                        h2Element.css("opacity", 1);
                    })
                }

                h1Element.html(h1).css("opacity", 1);
                pElement.html(p).css("opacity", 1);
            }, 400)
        },
        playAudio: function (audio_id, volume = 0.2) {
            let audio = $("#" + audio_id)[0];
            audio.currentTime = 0;
            audio.volume = volume;
            audio.play().catch(() => {
                console.log("Error playing audio, please interact with the document first.");
            });
        },
        //Funções modal
        fillModalVariables: function (main_text, complementary_text, modal_icon, allow_close = false, with_animation = false) {
            this.hideModal();

            setTimeout(() => {
                this.showModal = true;
                this.modalCloseButton = allow_close;
                this.modalTitle = main_text;
                this.modalText = complementary_text;
                this.modalIcon = modal_icon;
                this.withAnimation = with_animation;
            }, 10)
        },
        hideModal: function () {
            this.showModal = false;
            this.modalCloseButton = false;
            this.modalTitle = "";
            this.modalText = "";
            this.modalIcon = "";
            this.withAnimation = false;
        },
        //Funções nativas android
        checkIfDeviceIsInPortraitMode: function() {
            if (window.matchMedia("(orientation: landscape)").matches) {
                return false;
            } else {
                return true;
            }
        },
        isMobileDevice: function () {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        initiateFullScreen: function (event) {
            if (event) {
                let element = document.documentElement;

                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.mozRequestFullScreen) { /* Firefox */
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) { /* Chrome, Safari e Opera */
                    element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) { /* IE/Edge */
                    element.msRequestFullscreen();
                }
            }
        },
        requestFullScreen: function () {
            this.fillModalVariables("Tela cheia", "Está página funciona melhor em tela cheia", "fas fa-expand-arrows-alt");
        },
        handleFullscreenChange: function () {
            if (this.isMobileDevice() && !(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement)) {
                this.requestFullScreen();
            } else {
                if (this.checkIfDeviceIsInPortraitMode()) {
                    this.fillModalVariables("Vire o dispositivo", "Por favor gire seu celular para ficar em modo paisagem", "", false, true);
                }
            }
        },
        //Funções de controle de orientação
        handleOrientationChange: function () {
            if (!this.checkIfDeviceIsInPortraitMode()) {
                this.fillModalVariables("Vire o dispositivo", "Por favor gire seu celular para ficar em modo paisagem", "", false, true);
            } else {
                this.hideModal();
            }
        },
        initEventListeners: function () {
            this.handleFullscreenChange();

            window.addEventListener("orientationchange", () => {
                this.handleOrientationChange();
            });
    
            document.addEventListener("fullscreenchange", () => {
                this.handleFullscreenChange();
            });
            document.addEventListener("mozfullscreenchange", () => {
                this.handleFullscreenChange();
            });
            document.addEventListener("webkitfullscreenchange", () => {
                this.handleFullscreenChange();
            });
            document.addEventListener("msfullscreenchange", () => {
                this.handleFullscreenChange();
            });
        }
    },
    mounted: function() {
    },
    data() {
        return {
            showModal: false,
            modalTitle: "",
            modalText: "",
            modalIcon: "",
            modalCloseButton: false,
            withAnimation: false
        }
    }
}