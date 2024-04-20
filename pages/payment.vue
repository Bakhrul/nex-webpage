<template>
    <div>
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
                        <div class="text-xl font-bold">Pilih Pembayaran</div>
                        <div class="flex justify-between items-center mt-5 border-b border-gray-200 pb-5 pointer"
                            v-for="a in listPaymentAutoDebet" @click="payment = a.paymentid">
                            <div class="flex items-center">
                                <div style="width:70px">
                                    <img :src="a.iconurl" style="max-width:50px;width:auto;">
                                </div>
                                <div class="font-semibold text-sm" style="padding-left: 10px;">{{a.paymentid}}</div>
                            </div>
                            <div>
                                <div class="radio-payment" :class="payment == a.paymentid ? 'active' : ''">
                                    <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                        <template v-for="context in listPaymentRegular">
                            <div class="text-base font-bold mt-5 mb-2">{{context.paymentname}}</div>
                            <div class="flex justify-between items-center mt-5 border-b border-gray-200 pb-5 pointer"
                                v-for="a in context.paymentdet" @click="payment = a.paymentid">
                                <div class="flex items-center">
                                    <div style="width:70px">
                                        <img :src="a.iconurl" style="max-width:50px;width:auto;">
                                    </div>
                                    <div class="font-semibold text-sm" style="padding-left: 10px;">{{a.paymentid}}</div>
                                </div>
                                <div>
                                    <div class="radio-payment" :class="payment == a.paymentid ? 'active' : ''">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <button type="button"
                            class="text-white mb-5 mt-10 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Bayar</button>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import axios from "axios";

    import {
        useToast
    } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    const config = useRuntimeConfig()

    const $toast = useToast();
    const router = useRouter();
    const route = useRoute()

    const pageStatus = ref('standby');


    const payment = ref('');
    const listPaymentAutoDebet = ref([])
    const listPaymentRegular = ref([])


    onMounted(() => {
        pageStatus.value = 'page-load';

        if (route.query.type == 'auto') {
            getPaymentAutoDebet()
        } else {
            getPaymentRegular()
        }
    });

    function getPaymentAutoDebet() {
        let params = {
            paketid: route.query.packet
        }
        axios.get(config.public.API_URL + 'paymentoptautodebet', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            },
            params
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                listPaymentAutoDebet.value = response.data.data.payment
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

    function getPaymentRegular() {
        let params = {
            paketid: route.query.packet
        }
        axios.get(config.public.API_URL + 'paymentoptregular', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            },
            params
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                listPaymentRegular.value = response.data.data.payment
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
</script>