<template>
    <div>
        <div id="overlay" @click="offModalOtp()">
        </div>
        <div id="modal-term-dialog" @click="offModalOtp()">
            <div class="modal" id="modal-term" @click.stop="">
                <div class="header" id="header">
                    <div class="text-lg text-center p-2 font-semibold">Verifikasi</div>
                </div>
                <div class="body p-2">
                    <div class="font-semibold mb-2 text-center">Masukkan kode OTP yang Anda terima dari BRI Mobile</div>
                    <div class="flex justify-center">
                        <vue3-otp-input input-classes="otp-input" separator="-" v-model:value="otpcode">
                        </vue3-otp-input>
                    </div>
                    <button type="button" @click="processPayment();"
                        :disabled="!otpcode || pageStatus == 'payment-load'"
                        class="w-full rounded-lg text-white p-2 text-md font-bold pointer mt-3 bg-primary">{{pageStatus == 'payment-load' ? 'Processing...' : 'Bayar'}}</button>
                    <button type="button" @click="offModalOtp()"
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
                    <div v-if="pageStatus == 'page-load'" class="flex justify-center mt-5">
                        <div class="loader"></div>
                    </div>
                    <template v-else>
                        <div class="font-semibold mb-2 text-center">4 digit terakhir kartu debit BRI Anda</div>
                        <div class="flex justify-center">
                            <vue3-otp-input input-classes="otp-input" separator="-" v-model:value="cardno">
                            </vue3-otp-input>
                        </div>
                        <div class="mt-3">
                            <div class="font-semibold mb-2">No HP yang terdaftar pada BRI Mobile</div>
                            <input type="number" class="w-full p-3 border-gray-300 rounded-xl border"
                                v-model="brihpno" />
                        </div>
                        <div class="mt-3">
                            <div class="font-semibold mb-2">Email yang terdaftar pada BRI Mobile</div>
                            <input type="email" class="w-full p-3 border-gray-300 rounded-xl border" v-model="email" />
                        </div>
                        <button type="button" @click="processOtp()"
                            :disabled="!cardno || !brihpno || !email || pageStatus == 'otp-load'"
                            class="text-white mb-5 mt-10 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">{{ pageStatus == 'otp-load' ? 'Processing...' : 'Selanjutnya' }}</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .otp-input {
        width: 40px;
        height: 40px;
        padding: 5px;
        margin: 0 10px;
        font-size: 20px;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        text-align: center;
    }

    /* Background colour of an input field with value */
    .otp-input.is-complete {
        background-color: #e4e4e4;
    }

    .otp-input::-webkit-inner-spin-button,
    .otp-input::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
<script setup lang="ts">
    import axios from "axios";
    import Vue3OtpInput from "vue3-otp-input";


    import Swal from 'sweetalert2'

    import {
        useToast
    } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';


    const config = useRuntimeConfig()

    const cardno = ref('');
    const brihpno = ref('');
    const email = ref('');

    const trxid = ref('');
    const otpcode = ref('');

    const router = useRouter();
    const route = useRoute();

    const $toast = useToast();

    const pageStatus = ref('standby');

    const promo = ref([]);

    onMounted(() => {

        pageStatus.value = 'standby';

    })

    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })

    function processOtp() {
        pageStatus.value = 'otp-load';
        let data = {
            smcid: route.query.smc,
            hpno: route.query.phone,
            referalcode: route.query.refcode,
            paketid: route.query.packet,
            cardno: cardno.value,
            brihpno: brihpno.value,
            vouchercode: route.query.voucher,
            email: email.value
        }

        let formData = JSON.stringify(data)
        axios.post(config.public.API_URL + 'paymentautodebet/brilink', formData, {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                trxid.value = response.data.data.trxid
                showModalOtp()
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

    function processPayment() {
        pageStatus.value = 'payment-load';
        let data = {
            otpcode: otpcode.value,
            trxid: trxid.value,
        }
        axios.post(config.public.API_URL + 'paymentautodebet/briotp', data, {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                offModalOtp()
                Swal.fire({
                    title: "Berhasil",
                    text: response.data.message
                }).then((result) => {
                    router.replace({
                        path: '/'
                    })
                });
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

    function showModalOtp() {
        otpcode.value = '';
        document.getElementById("overlay").style.display = "block";
        setTimeout(() => {
            document.getElementById('modal-term-dialog').style.display = "block";
        }, 300);
    }

    function offModalOtp() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById('modal-term-dialog').style.display = "none";
    }
</script>