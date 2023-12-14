<template>
    <footer>
        <div class="signature">
            <p class="small">by <a href="https://rabsystems.com.br" target="_blank">Rabsystems</a></p>
        </div>
        <div class="navigation-menu">
            <ul>
                <li v-on:click="selectThisMenu(0)" :id="'menu-' + 0">Início</li>
                <li v-on:click="selectThisMenu(1)" :id="'menu-' + 1">Projetos</li>
                <li v-on:click="selectThisMenu(2)" :id="'menu-' + 2">Contato</li>
            </ul>
        </div>
        <div class="social-network-icons">
            <a href="https://www.facebook.com/say.feli10" class="facebook" target="_blank">
                <i class="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/lipeedarling/" class="instagram" target="_blank">
                <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/in/saymonflima/" class="linkedin" target="_blank">
                <i class="fab fa-linkedin"></i>
            </a>
        </div>
    </footer>
</template>
<script>
import $ from 'jquery';

export default {
    name: "footerComponent",
    methods: {
        selectThisMenu: function (menu_number) {
            $(".navigation-menu li").removeClass("main-menu-active-item");
            $("#menu-" + menu_number).addClass("main-menu-active-item");

            this.$emit("changeMenu", menu_number);
        }
    }
}
</script>
<style scoped>
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 2rem;
}

.navigation-menu ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    color: var(--gray-high);
    display: flex;
    align-items: center;
}

    .navigation-menu ul li {
        margin: 0 .5rem;
        padding: .5rem .8rem;
        cursor: pointer;
        transition: color 0.4s;
        position: relative;
    }

        .navigation-menu ul li:hover, .navigation-menu ul li.main-menu-active-item {
            color: var(--blue);
        }

        .navigation-menu ul li.main-menu-active-item::after {
            animation: selectThisMenu 0.5s ease-in-out;
            animation-fill-mode: forwards;
        }

        .navigation-menu ul li::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 0;
            height: 3px;
            border-radius: 2px;
            background: var(--blue);
        }

@keyframes selectThisMenu {
    from {
        width: 0;
    }
    to {
        width: calc(100% - 1.6rem);
    }
}

.social-network-icons {
    display: flex;
    align-items: center;
}

    .social-network-icons a {
        margin: 0 .5rem;
        transition: color 0.4s, background 0.4s;
    }

.facebook:hover {
    color: #0866ff;
}

.instagram:hover {
    background: linear-gradient(-110deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #FFDC80);
    -webkit-background-clip: text;
    color: transparent;
}

.linkedin:hover {
    color: #0a66c2;
}

@media (max-width: 1050px) {
    footer {
        padding: 0.5rem 2rem;
    }

}
</style>