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
                        <div @click="redirectAllPromo()" class="pointer"
                            style="color:#0E64B2 !important;font-weight:600;">Lihat Semua</div>
                    </div>
                </div>
                <div v-if="pageStatus == 'home-load'" class="flex justify-center mt-5">
                    <div class="loader"></div>
                </div>
                <div class="w-full" v-show="pageStatus != 'home-load'">
                    <div class="banner">
                        <carousel :items-to-show="1" :autoplay="2500" :wrapAround="true">
                            <slide v-for="slide in banner" :key="slide">
                                <img @click="redirectPromo(slide.id)" :src="slide.bannerurl" class="w-full">
                            </slide>

                            <template #addons>
                                
                                <pagination />
                            </template>
                        </carousel>

                    </div>
                </div>                
                <div class="p-3 border-b border-gray-200">
                    <div class="text-lg font-bold">Paket Langganan</div>
                            <div class="text-gray-600">Pilih dibawah ini untuk langganan regular atau auto debet</div>
                    <div class="flex items-center">
                        <button type="button"
                            @click="type = 'regular';smc = '';phone = '';canChoosePacket = false;choosePacket = '';pricePacket = 0; disc = 0; voucher = ''; homeReguler();autoDebet = false;validSMC = '';showRegular = false; showRegularPromo = false; showAutoDebet = false"
                            :class="type == 'regular' ? 'active' : ''" class="option-type2 mt-3 mr-3">Reguler</button>
                        <!-- <button type="button"
                            @click="type = 'auto';smc = '';phone = '';canChoosePacket = false;choosePacket = '';pricePacket = 0; disc = 0; voucher = ''; homeAutoDebet(); autoDebet = false;validSMC = '';showRegular = false; showRegularPromo = false; showAutoDebet = false"
                            :class="type == 'auto' ? 'active' : ''" class="option-type2 mt-3">Auto Debet</button> -->
                    </div>
                    <div class="mt-3" v-if="type == 'auto'">
                        <div class="font-semibold mb-2">No. Handphone</div>
                        <input type="number" @keypress="checkDigit" @input="phone = $event.target.value.toString()"
                            class="w-full p-3 border-gray-300 rounded-xl border" :value="phone"
                            placeholder="Masukan No Handphone Awal 0" />
                        <div class="text-gray-600 pt-1" style="font-style:italic;font-size:11px !important">Mohon input nomor HP yang
                            dapat dihubungi supaya
                            dapat
                            kami
                            bantu jika ada kendala</div>
                    </div>
                    <div class="mt-3">
                        <div class="font-semibold mb-2">No SMC ID</div>
                        <div class="relative w-full">
                            <input type="number" @keypress="checkDigit($event)" maxlength="16"
                                @input="canChoosePacket = false;choosePacket = '';pricePacket = 0;disc = 0; voucher = ''; smc = $event.target.value.toString().slice(0, 16); autoDebet = false; validSMC = false; showRegular = false; showRegularPromo = false; showAutoDebet = false; checkSMCID()"
                                class="w-full p-3 border-gray-300 rounded-xl border" :value="smc"
                                placeholder="Masukan No SMC ID" />
                            <div v-if="validSMC == 'yes'"
                                style="position:absolute;right:10px;bottom:10px;width:20px;height:20px;border-radius:100px;"
                                class="text-white bg-green-500 flex items-center justify-center">
                                <i class="bi bi-check"></i>
                            </div>
                            <div v-if="validSMC == 'no'"
                                style="position:absolute;right:10px;bottom:10px;width:20px;height:20px;border-radius:100px;"
                                class="text-white bg-red-500 flex items-center justify-center">
                                <i class="bi bi-x"></i>
                            </div>
                            <div v-if="validSMC == 'loading'"
                                style="position:absolute;right:10px;bottom:10px;border-radius:100px;">
                                <div class="loader-small"></div>
                            </div>
                        </div>
                        <div class="text-gray-600 pt-1" style="font-style:italic;font-size:11px !important">Masukan nomor SMC ID di atas
                            jika ingin memilih paket langganan<br> di bawah ini</div>
                    </div>
                    <!-- <button type="button"
                        :disabled="checkDisabledProcess() || canChoosePacket || pageStatus == 'packet-load' || pageStatus == 'home-load' || validSMC != 'yes'"
                        @click="canChoosePacket = false; choosePacket = ''; pricePacket = 0; processPacket()"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Proses</button> -->
                </div>
                <div v-if="pageStatus == 'home-load'" class="flex justify-center mt-5">
                    <div class="loader"></div>
                </div>
                <div class="p-3 border-b border-gray-200 relative" :class="showRegularPromo ? 'pb-10' : ''"
                    v-if="type == 'regular'">
                    <div class="flex justify-between items-center" :class="showRegularPromo ? 'mb-5' : ''">
                        <div>
                            <div class="text-lg font-bold">{{ titlePromo }}</div>
                            <div class="text-gray-600">{{ subTitlePromo }}</div>
                        </div>
                        <div v-if="titlePromo"> <button type="button" class="bg-white shadow-2xl border border-red"
                                style="border-radius:100px;width:24px;height:24px;font-size:16px;border:1px black solid !important;color:black !important"
                                @click="validSMC == 'yes' ? showRegularPromo = !showRegularPromo : ''"><i class="bi "
                                    :class="showRegularPromo ? 'bi-chevron-up' : 'bi-chevron-down'"></i></button></div>
                    </div>
                    <template v-for="(context, index) in packetPromoRegular" v-if="showRegularPromo">
                        <div class="border border-gray-200 rounded-lg mb-3 shadow-lg" style="min-height:200px"
                            v-if="index <= lastShowIndexPromoRegular">
                            <div style="cursor:pointer;" @click="redirectPacket(context.nama, context.pakettype)">
                                <img :src="context.bannerurl" class="w-full rounded-lg"
                                    style="height:100px;object-fit: cover;object-position:center;">
                            </div>
                            <div class="px-3 py-2">
                                <div class="justify-between flex items-center mb-1">
                                    <div>
                                        <div class="text-sm font-semibold line-clamp-1">{{context.nama}}</div>
                                    </div>
                                    <div style="width:130px">
                                        <template v-if="context.promo">
                                            <div class="text-gray-600 text-xs text-right"
                                                style="text-decoration: line-through;">Rp
                                                {{ rupiahFormat(stringToNumber(context.promo)) }}</div>
                                            <div class="text-red-500 font-bold text-sm pt-1 text-right">Rp
                                                {{ rupiahFormat(stringToNumber(context.price)) }}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="text-red-500 font-bold text-sm pt-1 text-right">Rp
                                                {{ rupiahFormat(stringToNumber(context.price)) }}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="flex items-center flex-wrap">
                                    <button type="button" class="option-type mt-1 mr-3" v-for="child in context.paket"
                                        :class="`${!canChoosePacket ? 'disabled' : ''} ${choosePacket == child.paketid ? 'active' : ''}`"
                                        @click="changeChooseRegular(child.paketid, child.harga, child.harganormal, child.pakettype, true, index)">{{child.masaaktif}}</button>                                      
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="flex justify-center px-3 rounded"
                        style="left:0;z-index:2;position:absolute;bottom:0;width:100%;height:255px;"
                        v-if="showLoadMoreRegular == 'promo-regular' && showRegularPromo">
                        <div class="w-full flex justify-center items-end"
                            style="background:linear-gradient(55deg, #fff, transparent)">
                            <button class="text-blue-700 font-bold" style="height:50px;" :disabled="!canChoosePacket"
                                @click="viewMoreRegular()">Lihat Semua</button>
                        </div>
                    </div>
                </div>
                <div class="p-3 border-b border-gray-200 relative" :class="showRegular ? 'pb-10' : ''"
                    v-if="type == 'regular'">
                    <div class="flex justify-between items-center" :class="showRegular ? 'mb-5' : ''">
                        <div>
                            <div class="text-lg font-bold">{{ title }}</div>
                            <div class="text-gray-600">{{ subTitle }}</div>
                        </div>
                        <div v-if="title"> <button type="button" class="bg-white shadow-2xl border border-red"
                                style="border-radius:100px;width:24px;height:24px;font-size:16px;border:1px black solid !important;color:black !important"
                                @click="validSMC == 'yes' ? showRegular = !showRegular : ''"><i class="bi "
                                    :class="showRegular ? 'bi-chevron-up' : 'bi-chevron-down'"></i></button></div>
                    </div>
                    <template v-for="(context, index) in packetRegular" v-if="showRegular">
                        <div class="border border-gray-200 rounded-lg mb-3 shadow-lg" style="min-height:200px"
                            v-if="index <= lastShowIndexRegular">
                            <div style="cursor:pointer;" @click="redirectPacket(context.nama, context.pakettype)">
                                <img :src="context.bannerurl" class="w-full rounded-lg"
                                    style="height:100px;object-fit: cover;object-position:center;">
                            </div>
                            <div class="p-3">
                                <div class="justify-between flex items-center mb-1">
                                    <div>
                                        <div class="text-sm font-semibold line-clamp-1">{{context.nama}}</div>
                                    </div>
                                    <div style="width:130px">
                                        <template v-if="context.promo">
                                            <div class="text-gray-600 text-xs text-right"
                                                style="text-decoration: line-through;">Rp
                                                {{ rupiahFormat(stringToNumber(context.promo)) }}</div>
                                            <div class="text-red-500 font-bold text-sm pt-1 text-right">Rp
                                                {{ rupiahFormat(stringToNumber(context.price)) }}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="text-red-500 font-bold text-sm pt-1 text-right">Rp
                                                {{ rupiahFormat(stringToNumber(context.price)) }}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="flex items-center flex-wrap">
                                    <button type="button" class="option-type mt-1 mr-3" v-for="child in context.paket"
                                        :class="`${!canChoosePacket ? 'disabled' : ''} ${choosePacket == child.paketid ? 'active' : ''}`"
                                        @click="changeChooseRegular(child.paketid, child.harga, child.harganormal, child.pakettype, false, index)">{{child.masaaktif}}</button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div class="flex justify-center px-3 rounded"
                        style="left:0;z-index:2;position:absolute;bottom:0;width:100%;height:255px;"
                        v-if="showLoadMoreRegular == 'regular' && showRegular">
                        <div class="w-full flex justify-center items-end"
                            style="background:linear-gradient(55deg, #fff, transparent)">
                            <button class="text-blue-700 font-bold" style="height:50px;" :disabled="!canChoosePacket"
                                @click="viewMoreRegular()">Lihat Semua</button>
                        </div>
                    </div>
                </div>

                <div class="p-3 border-b border-gray-200 relative" :class="showAutoDebet ? 'pb-10' : ''"
                    v-if="type == 'auto'">
                    <div class="flex justify-between items-center" :class="showAutoDebet ? 'mb-5' : ''">
                        <div>
                            <div class="text-lg font-bold">{{ title }}</div>
                            <div class="text-gray-600">{{ subTitle }}</div>
                        </div>
                        <div v-if="title"> <button type="button" class="bg-white shadow-2xl border border-red"
                                style="border-radius:100px;width:24px;height:24px;font-size:16px;border:1px black solid !important;color:black !important"
                                @click="validSMC == 'yes' ? showAutoDebet = !showAutoDebet : ''"><i class="bi "
                                    :class="showAutoDebet ? 'bi-chevron-up' : 'bi-chevron-down'"></i></button></div>
                    </div>
                    <template v-for="(context, index) in packetAutoDebet" v-if="showAutoDebet">
                        <div class="border border-gray-200 rounded-lg mb-3 shadow-lg" style="min-height:200px">
                            <div style="cursor:pointer;" @click="redirectPacket(context.id)">
                                <img :src="context.bannerurl" class="w-full rounded-lg"
                                    style="height:100px;object-fit: cover;object-position:center;">
                            </div>
                            <div class="p-3">
                                <div class="justify-between flex items-center mb-1">
                                    <div>
                                        <div class="text-sm font-semibold line-clamp-1">{{context.paketname}}</div>
                                    </div>
                                    <div style="width:130px">
                                        <template v-if="context.harganormal">
                                            <div class="text-gray-600 text-xs text-right"
                                                style="text-decoration: line-through;">Rp
                                                {{ rupiahFormat(stringToNumber(context.harganormal)) }}</div>
                                            <div class="text-red-500 font-bold text-sm pt-1 text-right">Rp
                                                {{ rupiahFormat(stringToNumber(context.harga)) }}
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="text-red-500 font-bold text-sm pt-1 text-right">Rp
                                                {{ rupiahFormat(stringToNumber(context.harga)) }}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                                <div class="flex items-center flex-wrap">
                                    <button type="button" class="option-type mt-1 mr-3"
                                        :class="`${!canChoosePacket ? 'disabled' : ''} ${choosePacket == context.id ? 'active' : ''}`"
                                        @click="changeChoose(context.id, context.harga, context.harganormal)">30
                                        Hari</button>
                                </div>
                            </div>
                        </div>
                    </template>
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
                <div class="p-3 border-b border-gray-200" v-if="type == 'regular'" id="section-voucher">

                    <div class="flex items-center justify-between" style="cursor:pointer;"
                        @click="redirectInputPromo()">
                        <div class="flex items-center">
                            <img src="~/assets/icon-discount.png" style="width:30px" />
                            <div class="pl-3 text-sm" :class="voucher ? 'text-black' : 'text-black'">
                                {{ voucher ? '1 Voucher digunakan' : 'Makin hemat pakai promo' }}</div>
                        </div>
                        <div class="" v-if="voucher" @click.stop="voucher = ''; disc = 0"><i
                                class="bi bi-x-circle text-2xl" style="color:red;"></i></div>
                        <div class="flex items-center" v-if="!voucher">
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
                    <div class="flex justify-between text-base mt-2 mb-2 text-sm">
                        <div class="text-gray-600">Sub Total</div>
                        <div class="text-right text-gray-600">Rp {{ rupiahFormat(stringToNumber(pricePacket)) }}</div>
                    </div>
                    <div class="flex justify-between text-base mt-2 mb-5 text-sm">
                        <div class="text-gray-600">Promo</div>
                        <div class="text-right text-gray-600">Rp {{ rupiahFormat(stringToNumber(disc)) }}</div>
                    </div>
                    <div class="flex justify-between text-base mt-2 mb-2">
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
                    <button type="button" :disabled="disabledButtonPayment()" @click="redirectPayment()"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Pembayaran</button>

                </div>
                <div class="flex justify-center"
                    v-if="showButtonScroll && !showLoadMoreAutoDebet && !showLoadMoreRegular && (packetAutoDebet.length || packetRegular.length || packetPromoRegular.length)"
                    style="height:0 !important;position:fixed;bottom:100px;z-index:99999;width:100%;max-width:480px">
                    <button type="button" class="bg-white shadow-2xl border border-red"
                        style="border-radius:100px;width:40px;height:40px;font-size:28px;border:1px black solid !important;color:black !important"
                        @click="scrollToBottom()"><i class="bi bi-chevron-down"></i></button></div>
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

    const pageStatus = ref('home-load');
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
    const validSMC = ref('');

    const voucher = ref('');
    const disc = ref(0)

    const choosePacket = ref('');
    const pricePacket = ref(0);
    const canChoosePacket = ref(false)

    const showButtonScroll = ref(true);

    const autoDebet = ref(false);

    const showRegularPromo = ref(false);
    const showRegular = ref(false);
    const showAutoDebet = ref(false);

    const lastShowIndexPromoRegular = ref(-1);
    const lastShowIndexRegular = ref(-1);
    const showLoadMoreRegular = ref(false);


    const lastShowIndexAutoDebet = ref(-1);
    const showLoadMoreAutoDebet = ref(false);

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

        window.scrollTo({
            left: 0,
            top: 0
        });
        pageStatus.value = 'home-load';

        if (type.value == 'auto') {
            homeAutoDebet()
        } else {
            homeReguler()
        }
        hasVerticalScroll()
        window.addEventListener("scroll", hasVerticalScroll);

        if (sessionStorage.getItem('to') == 'voucher') {
            if (type.value == 'regular') {
                sessionStorage.removeItem('to');
                setTimeout(() => {
                    document.querySelector('#section-voucher').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 1000);
            }
        }

    })


    function checkSMCID() {
        validSMC.value = '';
        if (smc.value.length !== 16) {
            return false;
        }

        if (type.value == 'regular') {
            getPacketRegular()
        } else {
            getPacketAutoDebet()
        }

    }

    function hasVerticalScroll() {

        if (window.pageYOffset > document.body.scrollHeight - 1000) {
            showButtonScroll.value = false
        } else {
            showButtonScroll.value = true;
        }

    }

    function scrollToBottom() {
        hasVerticalScroll()
        window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    }

    function resetHome() {
        phone.value = ''

        voucher.value = '';
        disc.value = 0;

        choosePacket.value = '';
        pricePacket.value = 0;
        canChoosePacket.value = false;

        autoDebet.value = false;

        lastShowIndexPromoRegular.value = -1;
        lastShowIndexRegular.value = -1;
        showLoadMoreRegular.value = false;


        lastShowIndexAutoDebet.value = -1;
        showLoadMoreAutoDebet.value = false;

        packetAutoDebet.value = []
        packetRegular.value = []
        packetPromoRegular.value = []

        pageStatus.value = 'standby'

    }

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

                title.value = response.data.data.pakettitle;
                subTitle.value = response.data.data.paketsubtitle;

                titlePromo.value = response.data.data.paketpromotitle;
                subTitlePromo.value = response.data.data.paketpromosubtitle;


                // packetRegular.value = response.data.data.paket;

                // packetPromoRegular.value = response.data.data.paketpromo;


                // for (let i = 0; i < packetRegular.value.length; i++) {
                //     if (packetRegular.value[i].paket.length > 0) {
                //         packetRegular.value[i].pakettype = packetRegular.value[i].paket[0].pakettype
                //         packetRegular.value[i].price = packetRegular.value[i].paket[0].harga
                //         packetRegular.value[i].promo = packetRegular.value[i].paket[0].harganormal
                //     }

                // }

                // for (let i = 0; i < packetPromoRegular.value.length; i++) {
                //     if (packetPromoRegular.value[i].paket.length > 0) {
                //         packetPromoRegular.value[i].pakettype = packetPromoRegular.value[i].paket[0].pakettype
                //         packetPromoRegular.value[i].price = packetPromoRegular.value[i].paket[0].harga
                //         packetPromoRegular.value[i].promo = packetPromoRegular.value[i].paket[0].harganormal
                //     }
                // }

                // if (packetPromoRegular.value.length) {
                //     if (packetPromoRegular.value.length == 1) {
                //         lastShowIndexPromoRegular.value = 0;
                //     } else
                //     if (packetPromoRegular.value.length == 2) {
                //         lastShowIndexPromoRegular.value = 1;
                //     } else if (packetPromoRegular.value.length >= 3) {
                //         lastShowIndexPromoRegular.value = 2
                //     }
                // }



                // if (packetPromoRegular.value.length > 0 && packetRegular.value.length > 0) {
                //     if (packetPromoRegular.value.length == 1) {
                //         lastShowIndexRegular.value = 1
                //     } else if (packetPromoRegular.value.length == 2) {
                //         lastShowIndexRegular.value = 0
                //     }
                // } else {
                //     if (packetRegular.value.length >= 3) {
                //         lastShowIndexRegular.value = 2
                //     } else {
                //         lastShowIndexRegular.value = packetRegular.value.length - 1;
                //     }

                // }

                // if ((packetPromoRegular.value.length + packetRegular.value.length) >= 3) {
                //     if (packetPromoRegular.value.length >= 3) {
                //         showLoadMoreRegular.value = 'promo-regular'
                //     } else {
                //         showLoadMoreRegular.value = 'regular'
                //     }

                // }
                if (smc.value && type.value == 'regular') {
                    getPacketRegular()
                }             

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

                title.value = response.data.data.pakettitle;
                subTitle.value = response.data.data.paketsubtitle;

                // packetAutoDebet.value = response.data.data.paket;

                // if (packetAutoDebet.value.length) {
                //     if (packetAutoDebet.value.length == 1) {
                //         lastShowIndexAutoDebet.value = 0;
                //     } else if (packetAutoDebet.value.length == 2) {
                //         lastShowIndexAutoDebet.value = 1;
                //     } else if (packetAutoDebet.value.length >= 3) {
                //         lastShowIndexAutoDebet.value = 2
                //     }
                // }

                // if (packetAutoDebet.value.length >= 3) {
                //     showLoadMoreAutoDebet.value = true;
                // }

                if (smc.value && type.value == 'auto') {
                    getPacketAutoDebet()
                }

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
    

    function processPacket() {
        if (type.value == 'regular') {
            getPacketRegular()
        } else {
            getPacketAutoDebet()
        }
    }

    function getPacketRegular() {

        lastShowIndexPromoRegular.value = -1
        lastShowIndexRegular.value = -1;
        showLoadMoreRegular.value = false;

        pageStatus.value = 'packet-load';
        packetRegular.value = [];
        packetPromoRegular.value = [];

        choosePacket.value = ''
        pricePacket.value = 0
        canChoosePacket.value = false;

        validSMC.value = 'loading';

        axios.get(config.public.API_URL + 'paketregular?smcid=' + smc.value, {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                packetRegular.value = response.data.data.paket;
                packetPromoRegular.value = response.data.data.paketpromo;

                let hasSelectedPacket = false;
                for (let i = 0; i < packetRegular.value.length; i++) {
                    if (packetRegular.value[i].paket.length > 0) {
                        packetRegular.value[i].pakettype = packetRegular.value[i].paket[0].pakettype
                        packetRegular.value[i].price = packetRegular.value[i].paket[0].harga
                        packetRegular.value[i].promo = packetRegular.value[i].paket[0].harganormal
                    }

                    if (sessionStorage.getItem('packet')) {
                        let check = packetRegular.value[i].paket.findIndex((e) => e.paketid == sessionStorage
                            .getItem('packet'))
                        if (check >= 0) {
                            packetRegular.value[i].pakettype = packetRegular.value[i].paket[check].pakettype
                            packetRegular.value[i].price = packetRegular.value[i].paket[check].harga
                            packetRegular.value[i].promo = packetRegular.value[i].paket[check].harganormal

                            choosePacket.value = sessionStorage.getItem('packet');
                            pricePacket.value = packetRegular.value[i].paket[check].harga;

                            hasSelectedPacket = true;
                            sessionStorage.removeItem('packet');

                        }
                    }
                }

                for (let i = 0; i < packetPromoRegular.value.length; i++) {
                    if (packetPromoRegular.value[i].paket.length > 0) {
                        packetPromoRegular.value[i].pakettype = packetPromoRegular.value[i].paket[0].pakettype
                        packetPromoRegular.value[i].price = packetPromoRegular.value[i].paket[0].harga
                        packetPromoRegular.value[i].promo = packetPromoRegular.value[i].paket[0].harganormal
                    }

                    if (sessionStorage.getItem('packet')) {
                        let check = packetPromoRegular.value[i].paket.findIndex((e) => e.paketid ==
                            sessionStorage.getItem('packet'))
                        if (check >= 0) {
                            packetPromoRegular.value[i].pakettype = packetPromoRegular.value[i].paket[check]
                                .pakettype
                            packetPromoRegular.value[i].price = packetPromoRegular.value[i].paket[check]
                                .harga
                            packetPromoRegular.value[i].promo = packetPromoRegular.value[i].paket[check]
                                .harganormal

                            choosePacket.value = sessionStorage.getItem('packet');
                            pricePacket.value = packetPromoRegular.value[i].paket[check].harga;

                            hasSelectedPacket = true;
                            sessionStorage.removeItem('packet');

                        }
                    }
                }

                if (packetPromoRegular.value.length) {
                    if (packetPromoRegular.value.length == 1) {
                        lastShowIndexPromoRegular.value = 0;
                    } else
                    if (packetPromoRegular.value.length == 2) {
                        lastShowIndexPromoRegular.value = 1;
                    } else if (packetPromoRegular.value.length >= 3) {
                        lastShowIndexPromoRegular.value = 2
                    }
                }

                if (packetPromoRegular.value.length > 0 && packetRegular.value.length > 0) {
                    if (packetPromoRegular.value.length == 1) {
                        lastShowIndexRegular.value = 1
                    } else if (packetPromoRegular.value.length == 2) {
                        lastShowIndexRegular.value = 0
                    }
                } else {
                    if (packetRegular.value.length >= 3) {
                        lastShowIndexRegular.value = 2
                    } else {
                        lastShowIndexRegular.value = packetRegular.value.length - 1;
                    }

                }

                if ((packetPromoRegular.value.length + packetRegular.value.length) >= 3) {
                    if (packetPromoRegular.value.length >= 3) {
                        showLoadMoreRegular.value = 'promo-regular'
                    } else {
                        showLoadMoreRegular.value = 'regular'
                    }

                }

                if (hasSelectedPacket) {
                    viewMoreRegular()
                }
                canChoosePacket.value = true;

                showRegularPromo.value = true;
                showRegular.value = true;
                validSMC.value = 'yes';
            } else {
                validSMC.value = 'no';
                resetHome();
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            resetHome();
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });

            validSMC.value = 'no';
        });
    }

    function getPacketAutoDebet() {

        lastShowIndexAutoDebet.value = -1
        showLoadMoreAutoDebet.value = false;

        pageStatus.value = 'packet-load';
        packetAutoDebet.value = [];

        choosePacket.value = ''
        pricePacket.value = 0
        canChoosePacket.value = false;

        validSMC.value = 'loading';
        axios.get(config.public.API_URL + 'paketautodebet?smcid=' + smc.value + '&hpno=' + phone.value, {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                packetAutoDebet.value = response.data.data.paket;

                let hasSelectedPacket = false;
                if (sessionStorage.getItem('packet')) {
                    let check = packetAutoDebet.value.findIndex((e) => e.id == sessionStorage.getItem('packet'))
                    if (check >= 0) {
                        choosePacket.value = sessionStorage.getItem('packet');
                        if (packetAutoDebet.value[check].promoprice) {
                            pricePacket.value = packetAutoDebet.value[check].promoprice;
                        } else {
                            pricePacket.value = packetAutoDebet.value[check].normalprice;
                        }

                        hasSelectedPacket = true;
                        sessionStorage.removeItem('packet');

                    }

                }

                if (packetAutoDebet.value.length) {
                    if (packetAutoDebet.value.length == 1) {
                        lastShowIndexAutoDebet.value = 0;
                    } else
                    if (packetAutoDebet.value.length == 2) {
                        lastShowIndexAutoDebet.value = 1;
                    } else if (packetAutoDebet.value.length >= 3) {
                        lastShowIndexAutoDebet.value = 2
                    }
                }

                if (packetAutoDebet.value.length >= 3) {
                    showLoadMoreAutoDebet.value = true;
                }

                if (hasSelectedPacket) {
                    viewMoreAutoDebet()
                }
                canChoosePacket.value = true;
                showAutoDebet.value = true;
                validSMC.value = 'yes';
            } else {
                validSMC.value = 'no';
                resetHome();
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            validSMC.value = 'no';
            resetHome();
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });
        });
    }

    function redirectPacket(id, typePacket) {

        if (!canChoosePacket.value) {
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
                refcode: ''
            }
        })
    }

    function changeChoose(id, price, promo) {
        if (canChoosePacket.value) {
            choosePacket.value = id;

            pricePacket.value = stringToNumber(price)

        }

    }

    function changeChooseRegular(id, price, promo, type, packetPromo = false, indexPacket) {
        if (canChoosePacket.value) {
            choosePacket.value = id;

            pricePacket.value = stringToNumber(price)

        }

        if (packetPromo) {
            packetPromoRegular.value[indexPacket].pakettype = type;
            packetPromoRegular.value[indexPacket].price = price;
            packetPromoRegular.value[indexPacket].promo = promo;
        } else {
            packetRegular.value[indexPacket].pakettype = type;
            packetRegular.value[indexPacket].price = price;
            packetRegular.value[indexPacket].promo = promo;
        }

    }

    function clickedAutoDebet() {

        if (!canChoosePacket.value) {
            return false;
        }

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
        if (voucher.value) {
            router.push({
                path: '/detail-voucher',
                query: {
                    id: voucher.value,
                    flag: 'remove'
                }

            })
        } else {
            router.push({
                path: '/input-promo',
                query: {
                    smcid: smc.value,
                    paketid: choosePacket.value
                }

            })
        }
    }

    function viewMoreRegular() {
        lastShowIndexPromoRegular.value = packetPromoRegular.value.length;
        lastShowIndexRegular.value = packetRegular.value.length;
        showLoadMoreRegular.value = false;

        setTimeout(() => {
            hasVerticalScroll()
        }, 500);
    }

    function viewMoreAutoDebet() {
        lastShowIndexAutoDebet.value = packetAutoDebet.value.length;
        showLoadMoreAutoDebet.value = false;

        setTimeout(() => {
            hasVerticalScroll()
        }, 500);
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

    function checkDisabledProcess() {
        if (type.value == 'regular') {
            if (!smc.value) {
                return true;
            }
        } else {
            if (!smc.value || !phone.value) {
                return true;
            }
        }

        return false;
    }

    function disabledButtonPayment() {
        if (type.value == 'regular') {
            if (!choosePacket.value) {
                return true;
            }
        } else {
            if (!choosePacket.value || !autoDebet.value || !phone.value) {
                return true;
            }
        }
    }

    const checkDigit = (event) => {
        if (event.key.length === 1 && isNaN(Number(event.key)) || (!isNaN(Number(event.key)) && event.target.value
                .toString().length == 16)) {
            event.preventDefault();
        }


    };
</script>