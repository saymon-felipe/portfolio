<template>
    <div class="contact-container">
        <form @submit.prevent="sendContact()" id="contact-form">
            <div class="form-group divide">
                <input type="text" name="name" id="name" placeholder="Nome" required>
                <input type="email" name="email" id="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <div class="rabsystems-input">
                    <div class="flag-input">
                        <div class="current-flag-container"></div>
                        <div class="flag-list"></div>
                    </div>
                    <input type="tel" name="tel" id="tel-input" required>
                </div>
            </div>
            <div class="form-group">
                <textarea name="message" id="message" cols="30" rows="5" placeholder="Mensagem" maxlength="5000" required></textarea>
            </div>
            <div class="form-group form-bottom">
                <div class="contacts">
                    <div class="contact">
                        <a href="mailto:linnubr@gmail.com">
                            <i class="fas fa-envelope"></i>
                            <span>linnubr@gmail.com</span>
                        </a>
                    </div>
                    <div class="contact">
                        <a href="https://api.whatsapp.com/send?phone=43996352536&text=Olá, estou entrando em contato através do seu portfólio." target="_blank">
                            <i class="fab fa-whatsapp"></i>
                            <span>(43) 9 9635-2536</span>
                        </a>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Enviar</button>
            </div>
            <div class="form-group">
                <p class="response">{{ response }}</p>
            </div>
        </form>
        <img src="../assets/img/el-psy-congroo.png" alt="El psy congroo">
    </div>
</template>
<script>
import $ from 'jquery';
import api from '../configs/api.js';
import { globalMethods } from "../js/globalMethods.js";

export default {
    name: "contactComponent",
    mixins: [globalMethods],
    data() {
        return {
            response: ""
        }
    },
    methods: {
        resetResponse: function () {
            return new Promise((resolve) => {
                let responseElement = $(".response");
                let formBottom = $(".form-bottom");

                responseElement.css("opacity", 0);
                
                setTimeout(() => {
                    responseElement.hide();
                    formBottom.show();

                    this.response = "";
                    responseElement.removeClass("success").removeClass("error");
                    
                    setTimeout(() => {
                        formBottom.css("opacity", 1);
                        resolve();
                    }, 1)   
                }, 400)
            })
        },
        fillResponse: function (message, classString) {
            let responseElement = $(".response");
            let formBottom = $(".form-bottom");

            this.response = message;
            responseElement.addClass(classString);

            formBottom.css("opacity", 0);
            
            setTimeout(() => {
                formBottom.hide();
                responseElement.show();

                setTimeout(() => {
                    responseElement.css("opacity", 1);
                }, 1)   
            }, 400)
        },
        sendContact: function () {
            let self = this;
            let data = $("#contact-form").serializeArray().reduce(function (obj, item) { // Pega todos os dados do formulário e coloca em um objeto.
                obj[item.name] = item.value;
                return obj;
            }, {});
            
            self.resetResponse().then(() => {
                if ($("#tel-input").attr("is_valid") == "true") {
                    data['tel'] = self.getTelInputValue();

                    api.post("/contact", data).then(() => {
                        self.fillResponse("Mensagem enviada com sucesso!", "success");
                        $("input, textarea").val('');
                    }).catch(() => {
                        self.fillResponse("Ocorreu um erro ao enviar sua mensagem.", "error");
                    }).then(() => {
                        setTimeout(() => {
                            self.resetResponse();
                        }, 5 * 1000);
                    })
                } else {
                    self.fillResponse("Telefone inválido.", "error");
                    setTimeout(() => {
                        self.resetResponse();
                    }, 5 * 1000);
                }
            });
        }
    }
}
</script>
<style scoped>
.contact-container {
    height: 100%;
    width: calc(7em + 27vw);
    position: relative;
}

img {
    position: absolute;
    left: -60%;
}

.contacts {
    color: var(--gray-high);
}

    .contacts i {
        margin-right: 1rem;
    }

.contact {
    cursor: pointer;
}

.contact:first-child {
    margin-bottom: .5rem;
}

.response {
    display: none;
    opacity: 0;
}

.form-bottom, .response {
    transition: opacity 0.4s;
}

@media (max-width: 1050px) {
    img {
        display: none;
    }
}
</style>