<template>
    <div>
        <div id="overlay" @click="offModalAutoDebet()">
        </div>
        <div id="modal-term-dialog" @click="offModalAutoDebet()">
            <div class="modal" id="modal-term" @click.stop="">
                <div class="header" id="header">
                    <div class="text-lg text-center p-2 font-semibold">Syarat Dan ketentuan</div>
                </div>
                <div class="body p-2">
                    <div v-if="pageStatus == 'term-load'" class="flex justify-center mt-5">
                        <div class="loader"></div>
                    </div>
                    <div v-html="term"></div>
                    <button type="button" @click="offModalAutoDebet();autoDebet = true;"
                        class="w-full rounded-lg text-white p-2 text-md font-bold pointer mt-3 bg-primary">Setuju</button>
                    <button type="button" @click="offModalAutoDebet()"
                        class="pointer w-full rounded-lg text-black bg-gray-300 mt-3 p-2 text-md font-bold">Tutup</button>
                </div>
            </div>
        </div>

        <div class="flex justify-center">
            <div class="main-wrapper relative">
                <div class="flex w-full border-b border-gray-200 px-3 py-2 flex justify-center">
                    <img src="~/assets/logo.jpg" style="width:150px" />
                </div>

                <div class="p-3">
                    <div class="flex justify-between items-center">
                        <div class="font-bold text-lg">Kejar Promo Hari Ini</div>
                        <svg width="30px" height="30px" viewBox="-3 0 32 32" version="1.1" style="cursor:pointer;"
                            @click="redirectAllPromo()" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink">
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
                <div v-if="pageStatus == 'home-load'" class="flex justify-center mt-5">
                    <div class="loader"></div>
                </div>
                <div class="w-full" v-show="pageStatus != 'home-load'">
                    <div class="banner">
                        <img @click="redirectPromo(context.id)" v-for="context in banner" :src="context.bannerurl"
                            class="w-full">                          \                        
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200">
                    <div class="text-lg font-bold">Paket Langganan</div>
                    <div class="text-gray-600">Pilih dibawah ini untuk langganan regular atau auto debet</div>
                    <div class="flex items-center">
                        <button type="button"
                            @click="type = 'regular';canChoosePacket = false;choosePacket = '';pricePacket = 0; disc = 0; voucher = ''; homeReguler()"
                            :class="type == 'regular' ? 'active' : ''" class="option-type mt-3 mr-3">Reguler</button>
                        <button type="button"
                            @click="type = 'auto';canChoosePacket = false;choosePacket = '';pricePacket = 0; disc = 0; voucher = ''; homeAutoDebet()"
                            :class="type == 'auto' ? 'active' : ''" class="option-type mt-3">Auto Debet</button>
                    </div>
                    <div class="mt-3" v-if="type == 'auto'">
                        <div class="font-semibold mb-2">No. Handphone</div>
                        <input type="number"
                            @input="canChoosePacket = false;choosePacket = '';pricePacket = 0;disc = 0; voucher = '';"
                            class="w-full p-3 border-gray-300 rounded-xl border" v-model="phone"
                            placeholder="Masukan No Handphone" />
                        <div class="text-xs text-gray-600 pt-1">Mohon input nomor HP yang dapat dihubungi supaya
                            dapat
                            kami
                            bantu jika ada kendala</div>
                    </div>
                    <div class="mt-3">
                        <div class="font-semibold mb-2">No SMC ID</div>
                        <input type="number"
                            @input="canChoosePacket = false;choosePacket = '';pricePacket = 0;disc = 0; voucher = '';"
                            class="w-full p-3 border-gray-300 rounded-xl border" v-model="smc"
                            placeholder="Masukan No SMC ID" />
                    </div>
                    <button type="button" :disabled="!smc || pageStatus == 'packet-load' || pageStatus == 'home-load'"
                        @click="canChoosePacket = false; choosePacket = ''; pricePacket = 0; processPacket()"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Proses</button>
                </div>
                <div v-if="pageStatus == 'packet-load' || pageStatus == 'home-load'" class="flex justify-center mt-5">
                    <div class="loader"></div>
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'regular'">
                    <div class="text-lg font-bold">{{ titlePromo }}</div>
                    <div class="text-gray-600 mb-3">{{ subTitlePromo }}</div>
                    <div class="border border-gray-200 rounded-lg mb-3 shadow-lg"
                        v-for="(context, index) in packetPromoRegular">
                        <div style="cursor:pointer;" @click="redirectPacket(context.groupid, context.pakettype)">
                            <img :src="context.bannerurl" class="w-full rounded-lg" style="filter:blur(1px)">
                        </div>
                        <div class="p-3">
                            <div class="justify-between flex items-center mb-3">
                                <div>
                                    <div class="text-base font-semibold">{{context.nama}}</div>
                                </div>
                                <div>
                                    <template v-if="context.promo">
                                        <div class="text-gray-600 text-xs text-right"
                                            style="text-decoration: line-through;">Rp
                                            {{ rupiahFormat(stringToNumber(context.price)) }}</div>
                                        <div class="text-red-500 font-bold text-base pt-1 text-right">Rp
                                            {{ rupiahFormat(stringToNumber(context.promo)) }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="text-red-500 font-bold text-base pt-1 text-right">Rp
                                            {{ rupiahFormat(stringToNumber(context.price)) }}
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <button type="button" class="option-type mt-1 mr-3" v-for="child in context.paket"
                                    :class="`${!canChoosePacket ? 'disabled' : ''} ${choosePacket == child.paketid ? 'active' : ''}`"
                                    @click="changeChooseRegular(child.paketid, child.harga, child.harganormal, child.pakettype, true, index)">{{child.masaaktif}}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'regular'">
                    <div class="text-lg font-bold">{{ title }}</div>
                    <div class="text-gray-600 mb-3">{{ subTitle }}</div>
                    <div class="border border-gray-200 rounded-lg mb-3 shadow-lg"
                        v-for="(context, index) in packetRegular">
                        <div style="cursor:pointer;" @click="redirectPacket(context.groupid, context.pakettype)">
                            <img :src="context.bannerurl" class="w-full rounded-lg" style="filter:blur(1px)">
                        </div>
                        <div class="p-3">
                            <div class="justify-between flex items-center mb-3">
                                <div>
                                    <div class="text-base font-semibold">{{context.nama}}</div>
                                </div>
                                <div>
                                    <template v-if="context.promo">
                                        <div class="text-gray-600 text-xs text-right"
                                            style="text-decoration: line-through;">Rp
                                            {{ rupiahFormat(stringToNumber(context.price)) }}</div>
                                        <div class="text-red-500 font-bold text-base pt-1 text-right">Rp
                                            {{ rupiahFormat(stringToNumber(context.promo)) }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="text-red-500 font-bold text-base pt-1 text-right">Rp
                                            {{ rupiahFormat(stringToNumber(context.price)) }}
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <button type="button" class="option-type mt-1 mr-3" v-for="child in context.paket"
                                    :class="`${!canChoosePacket ? 'disabled' : ''} ${choosePacket == child.paketid ? 'active' : ''}`"
                                    @click="changeChooseRegular(child.paketid, child.harga, child.harganormal, child.pakettype, false, index)">{{child.masaaktif}}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'auto'">
                    <div class="border border-gray-200 rounded-lg mb-3 shadow-lg" v-for="context in packetAutoDebet">
                        <div style="cursor:pointer;" @click="redirectPacket(context.id)">
                            <img :src="context.bannerurl" class="w-full rounded-lg" style="filter:blur(1px)">
                        </div>
                        <div class="p-3">
                            <div class="justify-between flex items-center mb-3">
                                <div>
                                    <div class="text-base font-semibold">{{context.paketname}}</div>
                                    <div class="text-gray-600">{{context.periode}}</div>
                                </div>
                                <div>
                                    <template v-if="context.promoprice">
                                        <div class="text-gray-600 text-xs text-right"
                                            style="text-decoration: line-through;">Rp
                                            {{ rupiahFormat(stringToNumber(context.normalprice)) }}</div>
                                        <div class="text-red-500 font-bold text-base pt-1 text-right">Rp
                                            {{ rupiahFormat(stringToNumber(context.promoprice)) }}
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="text-red-500 font-bold text-base pt-1 text-right">Rp
                                            {{ rupiahFormat(stringToNumber(context.promoprice)) }}
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <button type="button" class="option-type mt-1 mr-3"
                                    :class="`${!canChoosePacket ? 'disabled' : ''} ${choosePacket == context.id ? 'active' : ''}`"
                                    @click="changeChoose(context.id, context.promoprice, context.normalprice)">30
                                    Hari</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'auto'">
                    <div class="flex items-center">
                        <div class="checkbox-auto pointer mr-3 rounded-lg" :class="autoDebet ? 'active' : ''"
                            @click="clickedAutoDebet">
                            <i class="bi bi-check" v-if="autoDebet"></i>
                        </div>
                        <div class="text-black font-medium text-sm">Saya Setuju Auto Debet</div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'regular'">

                    <div class="flex items-center justify-between" style="cursor:pointer;"
                        @click="redirectInputPromo()">
                        <div class="flex items-center">
                            <img style="width:30px"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtUlEQVR4nO1ZzW8bRRRflQPwLyC4IA5IiEqlnrEbIgXPLGn4SChS01YEpSSQSqVpEgGSaS+JOAUOQA+V+GiR4NADHMild6hqiBsSihAqqqh6QS2lkMSe2bXX3uxDbzb+duIdxxvVpU960urt7uz7zfu9N292DOOe3MUi4/QdwcjbRieKYNFDgtE1waknOR02OkkEo3HBaE5yCqiC07w0yV7jThC7N/KIYPSaZPRUxox2w7Sxo/K+MGNPSk5Xis6XlWQkiz1VO56IkycEJzOSk9+sHvpw6ACESQ5UOiYYvSE4+URy0pfp3f244PRmvfOlSNzEZ/BZfEcweqPqvkkOhA5AcvLxRg5uXclHoQMQnKbCAiA4mQ/VeYjFHhSMOuEBoHn8RmgAMGnDow9Vmnlm99Ntdxx6eh7AgSUn58IGIDk5h9/Cb7bssGV2PWSxSL/gdFYyelFwkg3fcVqbDwUsrYKRT3EhzPLIo4EBSE5/326HZTNl9EpgAIKT94MObB95FdzkBfDSq+CtLoObSoJ9/PUQIkJnAwNIxyNdgZyfeAMg74CSQh6gUChd4726d/q6wXr52ZYA2JzsCQwA24PNVtSiuj//pPx1ly6B9WKPUrxWtsVU3fPOl5+Bl0lDbiahSR9yq7ZlaU4jRs42G9izbeVs9t3Jkg2vUfBe1Qwe3u9Hy1sD+9iIJn3IGUNXrHh0oNnARbGPDpcdPTpcsldFaz0y+W+/1qaPxSL92gAEi+5sGoHVFT8CJ6bKEUhM+BGwrJItNzvt2/69DdYA009gFt2pN/smiSDvmuZA8oLP918vg3WoH6yDL4B7edG3Lcz7s7fPBG9lWdly751sKYElo/8ETmJhEi4ZSQeqDEeGAJz1KlQpjgP2m6+pZwrn53xAqWRrzvNiFKiULPLc5s5zMqR2TxoD2+OjquJA1lYz7V78DuzRgz6dJscAPA8glwVraN+WAMjS6kxHN+L8JO5ht/qRkvbugbU/rvoB+fx0Oxc0TzKSCB2Ac+a0cn7t+jWQe7vCB9AqhRop0gVpg/RBGimqHRsBdz6p2g2km7u0oN1ybEqhVpJ4I8WEVR3F+Tnf+fGRxsmed1QhaFsS65bRRoqlUtX8lWVVQhUgTHLVciyANfi8KrlYelHc5PftLaM6C1kddQaYWqxQcPEq2pEyKNnE8ZIte3JK2XAxbPtCpqLA6Uu6APJz3/iz+ssiSDNaBqDRcshGExOPDmgDEJx8oeM8Jik2aorXh/dX3StHYKIcgRNTdS3HxhEgZ7Wcx9ZVcvKXFvdnEqpVxpa5LqmXFqrb7v54uRVfTAXIAXILBgfvCwzA38DrJ7DarPR119mzE2MVm52Cv/kpthzjwVpr3GQFpw8jH7QCYDNFEO6lH9Q6gImrWo6xVwK/j9vcDt/Uk6v/n98qHf9jq93JraNpnWTVFeh77P7Kk5e204ZRJ5SZrxT8BR4eAPKjEbbgIURoFGLkw20/YpKc3hacfIVVSx0x1RwbVTtI/8Zn1G96Rk8JTv6sodDgthzy4Y9WLLGWSWO1f8wkj+xquJ9Qtsiuymdh2tiBY6yX6ys4tnHHHrPGaa/RSSI6+aC7KIKTt1BLhntyF8p/acyeDK0PLc4AAAAASUVORK5CYII=">
                                
                            <div class="pl-3 text-sm" v-if="!voucher" :class="voucher ? 'text-black' : 'text-gray-600'">
                                {{ voucher ? voucher : 'Makin hemat dengan promo' }}</div>
                                <div class="pl-3 text-sm" v-if="voucher" :class="voucher ? 'text-black' : 'text-gray-600'">Voucher digunakan<br>{{ voucher }}<br>{{ rupiahFormat(stringToNumber(disc)) }}</div>
                        </div>
                        <div class="flex items-center">
                            <i class="bi bi-x-circle mr-2" v-if="voucher" @click.stop="voucher = ''; disc = 0" style="cursor:pointer;font-size:23px;color:black;"></i>
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
                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'regular'">
                    <div class="flex justify-between text-base mt-2 mb-5">
                        <div class="font-bold">Harga</div>
                        <div class="text-right font-bold">Rp {{ rupiahFormat(stringToNumber(pricePacket)) }}</div>
                    </div>
                    <div class="flex justify-between text-base mt-2 mb-5">
                        <div class="font-bold">Disc</div>
                        <div class="text-right font-bold">Rp {{ rupiahFormat(stringToNumber(disc)) }}</div>
                    </div>
                    <div class="flex justify-between text-base mt-2 mb-5">
                        <div class="font-bold">Total Pembelian</div>
                        <div class="text-right font-bold">Rp {{ rupiahFormat(stringToNumber(pricePacket - disc)) }}
                        </div>
                    </div>
                    <button type="button" :disabled="!choosePacket" @click="redirectPayment()"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Pembayaran</button>

                </div>
                <div class="p-3 border-b border-gray-200" v-if="type == 'auto'">
                    <div class="flex justify-between text-base mt-2 mb-5">
                        <div class="font-bold">Total Pembelian</div>
                        <div class="text-right font-bold">Rp {{ rupiahFormat(stringToNumber(pricePacket)) }}</div>
                    </div>
                    <button type="button" :disabled="!autoDebet || !choosePacket" @click="redirectPayment()"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Pembayaran</button>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import axios from "axios";

    import {
        useToast
    } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    const config = useRuntimeConfig()

    const $toast = useToast();
    const router = useRouter();
    const route = useRoute();

    const pageStatus = ref('standby');
    const title = ref('');
    const subTitle = ref('');

    const titlePromo = ref('');
    const subTitlePromo = ref('');

    const packetAutoDebet = ref([]);
    const packetRegular = ref([]);
    const packetPromoRegular = ref([]);
    const banner = ref([]);


    const term = ref('');


    const type = ref('regular');
    const phone = ref('');
    const smc = ref('')

    const voucher = ref('');
    const disc = ref(0)

    const choosePacket = ref('');
    const pricePacket = ref(0);
    const canChoosePacket = ref(false)

    const autoDebet = ref(false);

    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })

    onMounted(() => {       
        if (sessionStorage.getItem('phone')) {
            phone.value = sessionStorage.getItem('phone');
            sessionStorage.removeItem('phone');
        }

        if (sessionStorage.getItem('smc')) {
            smc.value = sessionStorage.getItem('smc');
            sessionStorage.removeItem('smc');
        }

        if (sessionStorage.getItem('type')) {
            type.value = sessionStorage.getItem('type');
            sessionStorage.removeItem('type');
        }

        if (sessionStorage.getItem('voucher') && sessionStorage.getItem('packet') && smc.value && type.value ==
            'regular') {
            voucher.value = sessionStorage.getItem('voucher');
            sessionStorage.removeItem('voucher');
        }

        if (sessionStorage.getItem('disc') && sessionStorage.getItem('packet') && smc.value && type.value ==
            'regular') {
            disc.value = sessionStorage.getItem('disc');
            sessionStorage.removeItem('disc');
        }


        pageStatus.value = 'home-load';

        if (type.value == 'auto') {
            homeAutoDebet()
        } else {
            homeReguler()
        }



    })

    function homeReguler() {
        pageStatus.value = 'home-load'
        axios.get(config.public.API_URL + 'homeregular', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                banner.value = response.data.data.banner;
                packetRegular.value = response.data.data.paket;
                packetPromoRegular.value = response.data.data.paketpromo;

                title.value = response.data.data.pakettitle;
                subTitle.value = response.data.data.paketsubtitle;

                titlePromo.value = response.data.data.paketpromotitle;
                subTitlePromo.value = response.data.data.paketpromosubtitle;

                for (let i = 0; i < packetRegular.value.length; i++) {
                    if (packetRegular.value[i].paket.length > 0) {
                        packetRegular.value[i].pakettype = packetRegular.value[i].paket[0].pakettype
                        packetRegular.value[i].price = packetRegular.value[i].paket[0].harganormal
                        packetRegular.value[i].promo = packetRegular.value[i].paket[0].harga
                    }

                }

                for (let i = 0; i < packetPromoRegular.value.length; i++) {
                    if (packetPromoRegular.value[i].paket.length > 0) {
                        packetPromoRegular.value[i].pakettype = packetPromoRegular.value[i].paket[0].pakettype
                        packetPromoRegular.value[i].price = packetPromoRegular.value[i].paket[0].harganormal
                        packetPromoRegular.value[i].promo = packetPromoRegular.value[i].paket[0].harga
                    }
                }
                if (smc.value && type.value == 'regular') {
                    getPacketRegular()
                }
                setTimeout(() => {
                    initSlider()
                }, 1);

            } else {
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });
        });
    }

    function homeAutoDebet() {
        pageStatus.value = 'home-load'
        axios.get(config.public.API_URL + 'homeautodebet', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                banner.value = response.data.data.banner;
                packetAutoDebet.value = response.data.data.paket;

                title.value = response.data.data.pakettitle;
                subTitle.value = response.data.data.paketsubtitle;


                if (smc.value && type.value == 'auto') {
                    getPacketAutoDebet()
                }


                setTimeout(() => {
                    initSlider()
                }, 1);
            } else {
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });
        });
    }

    function initSlider() {
        $('.banner').owlCarousel({
            items: 1,
            loop: true,
            margin: 0,
            autoPlay : 1500,            
        });
    }

    function processPacket() {
        if (type.value == 'regular') {
            getPacketRegular()
        } else {
            getPacketAutoDebet()
        }
    }

    function getPacketRegular() {
        pageStatus.value = 'packet-load';
        packetRegular.value = [];
        packetPromoRegular.value = [];

        choosePacket.value = ''
        pricePacket.value = 0
        canChoosePacket.value = false;

        axios.get(config.public.API_URL + 'paketregular?smcid=' + smc.value, {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                packetRegular.value = response.data.data.paket;
                packetPromoRegular.value = response.data.data.paketpromo;

                for (let i = 0; i < packetRegular.value.length; i++) {
                    if (packetRegular.value[i].paket.length > 0) {
                        packetRegular.value[i].pakettype = packetRegular.value[i].paket[0].pakettype
                        packetRegular.value[i].price = packetRegular.value[i].paket[0].harganormal
                        packetRegular.value[i].promo = packetRegular.value[i].paket[0].harga
                    }

                    if (sessionStorage.getItem('packet')) {
                        let check = packetRegular.value[i].paket.findIndex((e) => e.paketid == sessionStorage
                            .getItem('packet'))
                        if (check >= 0) {
                            packetRegular.value[i].pakettype = packetRegular.value[i].paket[check].pakettype
                            packetRegular.value[i].price = packetRegular.value[i].paket[check].harganormal
                            packetRegular.value[i].promo = packetRegular.value[i].paket[check].harga

                            choosePacket.value = sessionStorage.getItem('packet');
                            if (packetRegular.value[i].paket[check].harga) {
                                pricePacket.value = packetRegular.value[i].paket[check].harga;
                            } else {
                                pricePacket.value = packetRegular.value[i].paket[check].harganormal;
                            }

                            sessionStorage.removeItem('packet');

                        }
                    }
                }

                for (let i = 0; i < packetPromoRegular.value.length; i++) {
                    if (packetPromoRegular.value[i].paket.length > 0) {
                        packetPromoRegular.value[i].pakettype = packetPromoRegular.value[i].paket[0].pakettype
                        packetPromoRegular.value[i].price = packetPromoRegular.value[i].paket[0].harganormal
                        packetPromoRegular.value[i].promo = packetPromoRegular.value[i].paket[0].harga
                    }

                    if (sessionStorage.getItem('packet')) {
                        let check = packetPromoRegular.value[i].paket.findIndex((e) => e.paketid ==
                            sessionStorage.getItem('packet'))
                        if (check >= 0) {
                            packetPromoRegular.value[i].pakettype = packetPromoRegular.value[i].paket[check]
                                .pakettype
                            packetPromoRegular.value[i].price = packetPromoRegular.value[i].paket[check]
                                .harganormal
                            packetPromoRegular.value[i].promo = packetPromoRegular.value[i].paket[check].harga

                            choosePacket.value = sessionStorage.getItem('packet');
                            if (packetPromoRegular.value[i].paket[check].harga) {
                                pricePacket.value = packetPromoRegular.value[i].paket[check].harga;
                            } else {
                                pricePacket.value = packetPromoRegular.value[i].paket[check].harganormal;
                            }

                            sessionStorage.removeItem('packet');

                        }
                    }
                }
                canChoosePacket.value = true;
            } else {
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });
        });
    }

    function getPacketAutoDebet() {
        pageStatus.value = 'packet-load';
        packetAutoDebet.value = [];

        choosePacket.value = ''
        pricePacket.value = 0
        canChoosePacket.value = false;

        axios.get(config.public.API_URL + 'paketautodebet?smcid=' + smc.value, {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                packetAutoDebet.value = response.data.data.paket;


                if (sessionStorage.getItem('packet')) {
                    let check = packetAutoDebet.value.findIndex((e) => e.id == sessionStorage.getItem('packet'))
                    if (check >= 0) {
                        choosePacket.value = sessionStorage.getItem('packet');
                        if (packetAutoDebet.value[check].promoprice) {
                            pricePacket.value = packetAutoDebet.value[check].promoprice;
                        } else {
                            pricePacket.value = packetAutoDebet.value[check].normalprice;
                        }

                        sessionStorage.removeItem('packet');

                    }

                }
                canChoosePacket.value = true;
            } else {
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            console.log(error)
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });
        });
    }

    function redirectPacket(id, typePacket) {
        if (phone.value) {
            sessionStorage.setItem('phone', phone.value);
        }

        if (smc.value) {
            sessionStorage.setItem('smc', smc.value);
        }

        if (choosePacket.value) {
            sessionStorage.setItem('packet', choosePacket.value);
        }

        if (voucher.value) {
            sessionStorage.setItem('voucher', voucher.value);
        }

        if (disc.value) {
            sessionStorage.setItem('disc', disc.value);
        }

        sessionStorage.setItem('type', type.value);
        router.push({
            path: '/detail',
            query: {
                id: id,
                type: typePacket
            }
        })

    }

    function redirectAllPromo() {
        if (phone.value) {
            sessionStorage.setItem('phone', phone.value);
        }

        if (smc.value) {
            sessionStorage.setItem('smc', smc.value);
        }

        if (choosePacket.value) {
            sessionStorage.setItem('packet', choosePacket.value);
        }

        if (voucher.value) {
            sessionStorage.setItem('voucher', voucher.value);
        }

        if (disc.value) {
            sessionStorage.setItem('disc', disc.value);
        }

        sessionStorage.setItem('type', type.value);

        router.push({
            path: '/promo',
        })
    }

    function redirectPromo(id) {
        if (phone.value) {
            sessionStorage.setItem('phone', phone.value);
        }

        if (smc.value) {
            sessionStorage.setItem('smc', smc.value);
        }

        if (choosePacket.value) {
            sessionStorage.setItem('packet', choosePacket.value);
        }

        if (voucher.value) {
            sessionStorage.setItem('voucher', voucher.value);
        }

        if (disc.value) {
            sessionStorage.setItem('disc', disc.value);
        }
        sessionStorage.setItem('type', type.value);

        router.push({
            path: '/promo-detail',
            query: {
                id: id
            }
        })

    }

    function redirectPayment() {
        router.push({
            path: '/payment',
            query: {
                smc: smc.value,
                phone: phone.value,
                packet: choosePacket.value,
                type: type.value,
                voucher: voucher.value,
                refcode: route.params.id
            }
        })
    }

    function changeChoose(id, promo, normal) {
        if (canChoosePacket.value) {
            choosePacket.value = id;
            if (promo)
                pricePacket.value = stringToNumber(promo)
            else
                pricePacket.value = stringToNumber(normal)
        }

    }

    function changeChooseRegular(id, promo, normal, type, packetPromo = false, indexPacket) {
        if (canChoosePacket.value) {
            choosePacket.value = id;
            if (promo)
                pricePacket.value = stringToNumber(promo)
            else
                pricePacket.value = stringToNumber(normal)
        }

        if (packetPromo) {
            packetPromoRegular.value[indexPacket].pakettype = type;
            packetPromoRegular.value[indexPacket].price = normal;
            packetPromoRegular.value[indexPacket].promo = promo;
        } else {
            packetRegular.value[indexPacket].pakettype = type;
            packetRegular.value[indexPacket].price = normal;
            packetRegular.value[indexPacket].promo = promo;
        }

    }

    function clickedAutoDebet() {
        if (autoDebet.value) {
            autoDebet.value = false
        } else {

            pageStatus.value = 'term-load';

            axios.get(config.public.API_URL + 'termautodebet', {
                headers: {
                    'NEX-APIKEY': 'apikey-1234567890'
                }
            }).then(response => {
                if (response.data.success) {
                    term.value = response.data.data.content;
                    pageStatus.value = 'standby';
                } else {
                    $toast.open({
                        message: response.data.message,
                        type: 'error',
                        position: 'top',
                        duration: 2000
                    });
                }
            }).catch(error => {
                $toast.open({
                    message: 'Terjadi kesalahan sistem',
                    type: 'error',
                    position: 'top',
                    duration: 2000

                });
            });
            document.getElementById("overlay").style.display = "block";
            setTimeout(() => {
                document.getElementById('modal-term-dialog').style.display = "block";
            }, 300);
        }


    }

    function redirectInputPromo() {
        if (!smc.value || !choosePacket.value) {
            return false;
        }
        if (phone.value) {
            sessionStorage.setItem('phone', phone.value);
        }

        if (smc.value) {
            sessionStorage.setItem('smc', smc.value);
        }

        if (choosePacket.value) {
            sessionStorage.setItem('packet', choosePacket.value);
        }

        if (voucher.value) {
            sessionStorage.setItem('voucher', voucher.value);
        }

        if (disc.value) {
            sessionStorage.setItem('disc', disc.value);
        }

        sessionStorage.setItem('type', type.value);
        router.push({
            path: '/input-promo',
            query: {
                smcid: smc.value,
                paketid: choosePacket.value
            }

        })
    }

    function offModalAutoDebet() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById('modal-term-dialog').style.display = "none";
    }

    function rupiahFormat(e) {
        if (!e) {
            return '0';
        }
        return new Intl.NumberFormat("id-ID", {
            maximumFractionDigits: 5
        }).format(e);
    }

    function stringToNumber(e) {
        if (e === null || e === '' || e === undefined || e === 'null') {
            return 0
        } else {
            return Number(e);
        }
    }
</script>