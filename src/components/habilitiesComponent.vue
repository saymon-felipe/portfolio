<template>
    <div class="habilities-component">
        <div class="habilities" v-if="type == 'ux'">
            <img src="../assets/img/logos/photoshop-icon.png" alt="Photoshop">
            <img src="../assets/img/logos/xd.png" alt="Adobe XD">
            <img src="../assets/img/logos/figma-icon.png" alt="Figma">
            <img src="../assets/img/logos/dribbble-icon.png" alt="Dribbble">
        </div>
        <div class="habilities" v-if="type == 'front'">
            <img src="../assets/img/logos/html-css-js.png" alt="HTML, CSS e JS">
            <img src="../assets/img/logos/vue.png" alt="Vue">
            <img src="../assets/img/logos/bootstrap.png" alt="Bootstrap">
            <img src="../assets/img/logos/jquery.png" alt="Jquery">
            <img src="../assets/img/logos/ionic.png" alt="Ionic">
            <img src="../assets/img/logos/react.png" alt="React">
        </div>
        <div class="habilities" v-if="type == 'back'">
            <img src="../assets/img/logos/node.png" alt="Node">
            <img src="../assets/img/logos/python.png" alt="Python">
            <img src="../assets/img/logos/csharp.png" alt="C-Sharp">
            <img src="../assets/img/logos/vb.png" alt="VIsual Basic">
        </div>
        <div class="habilities" v-if="type == 'db'">
            <img src="../assets/img/logos/mysql.png" alt="My Sql">
            <img src="../assets/img/logos/sqlserver.png" alt="Sql Server">
        </div>
        <div class="habilities" v-if="type == 'dev'">
            <img src="../assets/img/logos/aws.png" alt="Aws">
            <img src="../assets/img/logos/docker.png" alt="Docker">
            <img src="../assets/img/logos/git.png" alt="Git">
            <img src="../assets/img/logos/github.png" alt="Github">
            <img src="../assets/img/logos/heroku.png" alt="Heroku">
            <img src="../assets/img/logos/netlify.png" alt="Netlify">
        </div>
    </div>
</template>
<script>
export default {
    name: "habilitiesComponent",
    props: ["type"]
}
</script>
<style scoped>

.habilities-component {
    width: calc(9rem + 12vw);
    height: calc(9rem + 12vw);
    background: var(--white);
    border-radius: 50%;
    position: relative;
    z-index: 5;
    box-shadow: inset 5px 10px 16px rgba(0, 0, 0, 0.8);
    transform: scale(1.3);
}

.habilities {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 1.5rem 0;
    align-content: center;
}

    .habilities img {
        width: 6em;
        max-width: 100%;
        object-fit: contain;
        display: block;
        padding: 0 1rem;
        z-index: 6;
    }

@media (max-width: 1050px) {
    .habilities {
        width: calc(5rem + 9vw);
        height: calc(5rem + 9vw);
    }
}

</style>