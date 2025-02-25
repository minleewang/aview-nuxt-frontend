<template>
    <div id="Home_main">
        <section id="HomeMain">
            <HomeMain @scroll-to-home-second="goToHomeSecond" />
        </section>
        <section id="HomeSecond">
            <HomeSecond />
        </section>
        <section id="HomeThird">
            <HomeThird />
        </section>
        <section id="HomeFooter">
            <HomeFooter />
        </section>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import HomeMain from './components/HomeMain.vue';
import HomeSecond from './components/HomeSecond.vue';
import HomeThird from './components/HomeThird.vue';
import HomeFooter from './components/HomeFifth.vue'

export default defineComponent({
    components: {
        HomeMain,
        HomeSecond,
        HomeThird,
        HomeFooter,
    },
    setup() {
        function goToHomeSecond() {
            const element = document.getElementById('HomeSecond')
            if (element) {
                const offset = 50
                const elementPosition = element.getBoundingClientRect().top
                const offsetPosition = elementPosition + window.pageYOffset - offset

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                })
            }
        }
        return {
            goToHomeSecond
        }
    }
})
// import { defineComponent } from 'vue';

// export default defineComponent({
//     setup() {
//         const router = useRouter()

//         const activeButton = ref('backlog-board-btn')
//         const isSearchActive = ref(false)
//         const showCards = ref([true, true, true])

//         function setActive(buttonType) {
//             activeButton.value = buttonType
//         }

//         function searchToggle() {
//             isSearchActive.value = !isSearchActive.value
//         }

//         function goToProjectManage() {
//             router.push('/projectManage')
//         }

//         return {
//             activeButton,
//             isSearchActive,
//             showCards,

//             setActive,
//             searchToggle,
//             goToProjectManage,
//         }
//     }
// })
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>