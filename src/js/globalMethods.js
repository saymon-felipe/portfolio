import $ from 'jquery';

export const globalMethods = {
    methods: {
        typeText: function (elementId, invert = false) {
            const $element = $(`#${elementId}`);
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
            }, 150);
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
                h1Element.html(h1).css("opacity", 1);
                pElement.html(p).css("opacity", 1);
            }, 400)
        }
    },
    mounted: function() {
    },
    data() {
        return {
        }
    }
}