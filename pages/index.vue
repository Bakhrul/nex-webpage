<template>
    <div>
        <div class="flex justify-center">
            <div class="main-wrapper relative">
                <div class="flex w-full border-b border-gray-200 px-3 py-2 flex justify-center">
                    <img src="~/assets/logo.jpg" style="width:150px" />
                </div>

                <div class="p-3">
                    <div class="flex justify-between items-center">
                        <div class="font-bold text-lg">Kejar Promo Hari Ini</div>
                        <svg width="30px" height="30px" viewBox="-3 0 32 32" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="icomoon-ignore">
                            </g>
                            <path
                                d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z"
                                fill="#000000">

                            </path>
                            <path
                                d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z"
                                fill="#000000">

                            </path>
                        </svg>
                    </div>
                </div>
                <div class="banner">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/business-banner-template-design-f4b281ca556e3d500e78fc6260273284_screen.jpg?ts=1561497794"
                        class="w-full">
                    <img src="https://marketplace.canva.com/EAE9QjX6rhA/1/0/1600w/canva-blue-pink-gradient-fashion-banner-cVzLo3B1IHE.jpg"
                        class="w-full">
                    <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/church-facebook-banner-design-template-7471ce255b02886530d575e1b4029e63_screen.jpg?ts=1584732765"
                        class="w-full">
                </div>
                <div class="p-3 border-b border-gray-200">
                    <div class="text-lg font-bold">Paket Langganan</div>
                    <div class="text-gray-600">Pilih dibawah ini untuk reguler atau Auto Debet</div>
                    <div class="flex items-center">
                        <button type="button" @click="type = 'reguler'" :class="type == 'reguler' ? 'active' : ''"
                            class="option-type mt-3 mr-3">Reguler</button>
                        <a href="https://nexautodebet-webpage.vercel.app/"><button type="button"
                                :class="type == 'auto' ? 'active' : ''" class="option-type mt-3">Auto Debet</button></a>
                    </div>
                    <template v-if="type == 'reguler'">
                        <div class="mt-3">
                            <div class="font-semibold mb-2">No SMC ID</div>
                            <input type="text" class="w-full p-3 border-gray-300 rounded-xl border" v-model="smc"
                                placeholder="Masukan No SMC ID" />
                        </div>
                    </template>
                    <button type="button" :disabled="!smc" @click="clickProcess = true;choose1 = ''"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Proses</button>
                </div>
                <div class="p-3 border-b border-gray-200">
                    <div class="text-lg font-bold">Serbu Promo Hari Ini</div>
                    <div class="text-gray-600 mb-3">Nonton Sepuasnya Hemat hingga 71%</div>
                    <div class="border border-gray-200 rounded-lg mb-3 shadow-lg">
                        <nuxt-link to="/detail">
                            <div class="bg-gradient w-full rounded-t-lg " style="height:150px;"></div>
                        </nuxt-link>
                        <div class="p-3">
                            <div class="justify-between flex items-center">
                                <div class="text-base font-semibold">Paket Basic</div>
                                <div>
                                    <div class="text-gray-600 text-xs text-right"
                                        style="text-decoration: line-through;">Rp
                                        19.900</div>
                                    <div class="text-red-500 font-bold text-base pt-1 text-right">Rp 19.900</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <button type="button" class="option-type mt-1 mr-3"
                                    :class="`${!clickProcess ? 'disabled' : ''} ${choose1 == 1 ? 'active' : ''}`"
                                    @click="changeChoose(1)">30 Hari</button>
                                <button type="button" class="option-type mt-1 mr-3"
                                    :class="`${!clickProcess ? 'disabled' : ''} ${choose1 == 2 ? 'active' : ''}`"
                                    @click="changeChoose(2)">90 Hari</button>
                                <button type="button" class="option-type mt-1"
                                    :class="`${!clickProcess ? 'disabled' : ''} ${choose1 == 3 ? 'active' : ''}`"
                                    @click="changeChoose(3)">180 Hari</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200">
                    <div class="text-lg font-bold">Paket Langganan Reguler</div>
                    <div class="text-gray-600 mb-3">Nonton seru bareng keluarga mulai dari Rp 9.900</div>
                    <div class="border border-gray-200 rounded-lg mb-3 shadow-lg">
                        <nuxt-link to="/detail">
                            <div class="bg-gradient w-full rounded-t-lg " style="height:150px;"></div>
                        </nuxt-link>
                        <div class="p-3">
                            <div class="justify-between flex items-center">
                                <div class="text-base font-semibold">Paket Basic</div>
                                <div>
                                    <div class="text-red-500 font-bold text-base pt-1 text-right">Rp 50.000</div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <button type="button" class="option-type mt-1 mr-3"
                                    :class="`${!clickProcess ? 'disabled' : ''} ${choose1 == 4 ? 'active' : ''}`"
                                    @click="changeChoose(4)">30 Hari</button>
                                <button type="button" class="option-type mt-1 mr-3"
                                    :class="`${!clickProcess ? 'disabled' : ''} ${choose1 == 5 ? 'active' : ''}`"
                                    @click="changeChoose(5)">90 Hari</button>
                                <button type="button" class="option-type mt-1"
                                    :class="`${!clickProcess ? 'disabled' : ''} ${choose1 == 6 ? 'active' : ''}`"
                                    @click="changeChoose(6)">180 Hari</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'reguler'">
                    <nuxt-link to="/input-promo">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <img style="width:30px"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtUlEQVR4nO1ZzW8bRRRflQPwLyC4IA5IiEqlnrEbIgXPLGn4SChS01YEpSSQSqVpEgGSaS+JOAUOQA+V+GiR4NADHMild6hqiBsSihAqqqh6QS2lkMSe2bXX3uxDbzb+duIdxxvVpU960urt7uz7zfu9N292DOOe3MUi4/QdwcjbRieKYNFDgtE1waknOR02OkkEo3HBaE5yCqiC07w0yV7jThC7N/KIYPSaZPRUxox2w7Sxo/K+MGNPSk5Xis6XlWQkiz1VO56IkycEJzOSk9+sHvpw6ACESQ5UOiYYvSE4+URy0pfp3f244PRmvfOlSNzEZ/BZfEcweqPqvkkOhA5AcvLxRg5uXclHoQMQnKbCAiA4mQ/VeYjFHhSMOuEBoHn8RmgAMGnDow9Vmnlm99Ntdxx6eh7AgSUn58IGIDk5h9/Cb7bssGV2PWSxSL/gdFYyelFwkg3fcVqbDwUsrYKRT3EhzPLIo4EBSE5/326HZTNl9EpgAIKT94MObB95FdzkBfDSq+CtLoObSoJ9/PUQIkJnAwNIxyNdgZyfeAMg74CSQh6gUChd4726d/q6wXr52ZYA2JzsCQwA24PNVtSiuj//pPx1ly6B9WKPUrxWtsVU3fPOl5+Bl0lDbiahSR9yq7ZlaU4jRs42G9izbeVs9t3Jkg2vUfBe1Qwe3u9Hy1sD+9iIJn3IGUNXrHh0oNnARbGPDpcdPTpcsldFaz0y+W+/1qaPxSL92gAEi+5sGoHVFT8CJ6bKEUhM+BGwrJItNzvt2/69DdYA009gFt2pN/smiSDvmuZA8oLP918vg3WoH6yDL4B7edG3Lcz7s7fPBG9lWdly751sKYElo/8ETmJhEi4ZSQeqDEeGAJz1KlQpjgP2m6+pZwrn53xAqWRrzvNiFKiULPLc5s5zMqR2TxoD2+OjquJA1lYz7V78DuzRgz6dJscAPA8glwVraN+WAMjS6kxHN+L8JO5ht/qRkvbugbU/rvoB+fx0Oxc0TzKSCB2Ac+a0cn7t+jWQe7vCB9AqhRop0gVpg/RBGimqHRsBdz6p2g2km7u0oN1ybEqhVpJ4I8WEVR3F+Tnf+fGRxsmed1QhaFsS65bRRoqlUtX8lWVVQhUgTHLVciyANfi8KrlYelHc5PftLaM6C1kddQaYWqxQcPEq2pEyKNnE8ZIte3JK2XAxbPtCpqLA6Uu6APJz3/iz+ssiSDNaBqDRcshGExOPDmgDEJx8oeM8Jik2aorXh/dX3StHYKIcgRNTdS3HxhEgZ7Wcx9ZVcvKXFvdnEqpVxpa5LqmXFqrb7v54uRVfTAXIAXILBgfvCwzA38DrJ7DarPR119mzE2MVm52Cv/kpthzjwVpr3GQFpw8jH7QCYDNFEO6lH9Q6gImrWo6xVwK/j9vcDt/Uk6v/n98qHf9jq93JraNpnWTVFeh77P7Kk5e204ZRJ5SZrxT8BR4eAPKjEbbgIURoFGLkw20/YpKc3hacfIVVSx0x1RwbVTtI/8Zn1G96Rk8JTv6sodDgthzy4Y9WLLGWSWO1f8wkj+xquJ9Qtsiuymdh2tiBY6yX6ys4tnHHHrPGaa/RSSI6+aC7KIKTt1BLhntyF8p/acyeDK0PLc4AAAAASUVORK5CYII=">
                                <div class="pl-3 text-base text-gray-600">Makin Hemat Pakai Promo</div>
                            </div>

                            <svg width="30px" height="30px" viewBox="-3 0 32 32" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="icomoon-ignore">
                                </g>
                                <path
                                    d="M13.11 29.113c7.243 0 13.113-5.871 13.113-13.113s-5.87-13.113-13.113-13.113c-7.242 0-13.113 5.871-13.113 13.113s5.871 13.113 13.113 13.113zM13.11 3.936c6.652 0 12.064 5.412 12.064 12.064s-5.412 12.064-12.064 12.064c-6.653 0-12.064-5.412-12.064-12.064s5.411-12.064 12.064-12.064z"
                                    fill="#000000">

                                </path>
                                <path
                                    d="M13.906 21.637l0.742 0.742 6.378-6.379-6.378-6.379-0.742 0.742 5.112 5.112h-12.727v1.049h12.727z"
                                    fill="#000000">

                                </path>
                            </svg>


                        </div>
                    </nuxt-link>
                </div>
                <div class="p-3 border-b border-gray-200">
                    <div class="flex justify-between text-sm">
                        <div>Sub Total</div>
                        <div class="text-right">Rp 50.000</div>
                    </div>
                    <div class="flex justify-between text-sm mt-2">
                        <div>Promo</div>
                        <div class="text-right">Rp 5.000</div>
                    </div>
                    <div class="flex justify-between text-base mt-2 mb-5">
                        <div class="font-bold">Total Pembelian</div>
                        <div class="text-right font-bold">Rp 45.000</div>
                    </div>
                    <nuxt-link to="/payment"><button type="button" :disabled="!choose1"
                            class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Pembayaran</button>
                    </nuxt-link>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>
    const type = ref('reguler');
    const phone = ref('');
    const smc = ref('')
    const choose1 = ref('');
    const clickProcess = ref(false)    

    useSeoMeta({
        title: 'My Amazing Site',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        twitterCard: 'summary_large_image',
    })

    onBeforeRouteLeave((to, from, next) => {
        if ($('.banner').hasClass('slick-initialized')) {
            $('.banner').slick('destroy');
        }

        next()
    })
    onMounted(() => {

        $('.banner').slick({
            infinite: true,
            speed: 500,
            auto: true,
            dots: false,
            arrows: false,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    })

    function changeChoose(type) {
        if (clickProcess.value) {
            choose1.value = type;
        }

    }
</script>