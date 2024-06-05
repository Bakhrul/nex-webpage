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
                        <img :src="banner" class="w-100">
                        <div class="text-2xl text-center font-bold pt-5 mb-5" v-html="title"></div>
                        <div style="min-height:35vh" v-html="content"></div>
                    </template>

                    <button type="button" @click="choosePromo"
                        v-if="route.query.flag == 'choose' && pageStatus != 'page-load'"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Gunakan</button>
                    <button type="button" @click="removeVoucher"
                        v-if="route.query.flag == 'remove' && pageStatus != 'page-load'"
                        class="text-white mb-5 font-bold text-base rounded-lg mt-3 bg-red-600 w-full p-3">Hapus</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import axios from "axios";
    import {
        routerKey
    } from "vue-router";

    import {
        useToast
    } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';

    const route = useRoute();

    const config = useRuntimeConfig()

    const router = useRouter();

    const $toast = useToast();

    const pageStatus = ref('standby');

    const banner = ref('');
    const title = ref('');
    const content = ref('');
    const code = ref('');
    const price = ref('');


    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })

    onMounted(() => {

        pageStatus.value = 'page-load';

        axios.get(config.public.API_URL + 'voucherdetail?vouchercode=' + route.query.id, {
            headers: {
                'NEX-APIKEY': config.public.API_KEY
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                banner.value = response.data.data.imgurl;
                title.value = response.data.data.title;
                content.value = response.data.data.content;
                code.value = response.data.data.vouchercode;
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

    })


    function choosePromo() {
        let params = {
            smcid: route.query.smcid,
            paketid: route.query.paketid,
            vouchercode: code.value
        }

        let formData = JSON.stringify(params)
        axios.post(config.public.API_URL + 'voucherused', formData, {
            headers: {
                'NEX-APIKEY': config.public.API_KEY
            },
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                sessionStorage.setItem('disc', response.data.data.promoval);
                sessionStorage.setItem('voucher', response.data.data.vouchercode);

                sessionStorage.setItem('to', 'voucher');
                router.push({
                    path: route.query.refcode ? '/' + route.query.refcode : '/',                  
                })
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

    function removeVoucher() {
        sessionStorage.removeItem('disc');
        sessionStorage.removeItem('voucher');

        sessionStorage.setItem('to', 'voucher');
        router.push({
            path: route.query.refcode ? '/' + route.query.refcode : '/',                  
        })
    }
</script>