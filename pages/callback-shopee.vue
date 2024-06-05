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
                        <div class="flex justify-center"><i class="bi bi-check-circle" style="font-size:92px;color:green"></i></div>
                        <div class="font-semibold text-xl mb-2 text-center">Link Akun SHOPEE berhasil</div>
                        <div class="text-gray-600 mb-2 text-center">Klik Lanjut untuk aktivasi paket berlangganan Anda
                        </div>
                        <button type="button" @click="processPayment()" :disabled="pageStatus == 'payment-load'"
                            class="text-white mb-5 mt-10 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">{{ pageStatus == 'payment-load' ? 'Processing...' : 'Lanjut' }}</button>
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
    const route = useRoute();

    const $toast = useToast();

    const pageStatus = ref('standby');




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

    function processPayment() {
        pageStatus.value = 'payment-load';
        let data = {
            trxid: route.query.trxid,
        }

        let formData = JSON.stringify(data)
        axios.post(config.public.API_URL + 'paymentautodebet/shopeepayment', formData, {
            headers: {
                'NEX-APIKEY': config.public.API_KEY
            }
        }).then(response => {
            if (response.data.success) {
                location.replace(response.data.data.paymenturl);
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