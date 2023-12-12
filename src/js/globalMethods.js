import $ from 'jquery';

export const globalMethods = {
    methods: {
        typeText: function (elementId, invert = false, textParam = "") {
            const $element = $(`#${elementId}`);
            let animationInterval = parseInt($element.attr("interval"));
            let textToType = textParam || $element.text();
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
                        this.typeText(elementId, false, textToType);
                    }, 1500)
                }

                if (invert) {
                    index--;
                } else {
                    index++;
                }
            }, 150);
        }
    },
    mounted: function() {
    },
    data() {
        return {
        }
    }
}