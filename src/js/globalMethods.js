import $ from 'jquery';

export const globalMethods = {
    methods: {
        typeText(elementId) {
            const $element = $(`#${elementId}`);
            let textToType = $element.text();
            let index = 0;

            $element.html("&nbsp;");
      
            const intervalId = setInterval(() => {
                let typedText = textToType.slice(0, index);
                if (typedText.trim() != "") {
                    $element.text(typedText); // Atualiza o texto no elemento jQuery
                }
                index++;
      
                if (index > textToType.length) {
                    clearInterval(intervalId);
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