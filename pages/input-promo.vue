<template>
    <div>
        <div class="flex justify-center">
            <div class="main-wrapper relative">
                <div class="flex w-full border-b border-gray-200 px-3 py-2 flex justify-center">
                    <img src="~/assets/logo.jpg" style="width:150px" />
                </div>
                <div class="p-3 border-b border-gray-300 pb-5">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <img style="width:30px" src="~/assets/icon-discount-2.png">
                            <div class="text-xl pl-3 font-bold">Bayar Paket</div>
                        </div>
                        <img style="width:30px;cursor:pointer" @click="router.back()"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiklEQVR4nO3WsQ0CMQxA0b+BMwKrMwMlVEdDQFQMwChck+soERdb/0np82UrCkiSJEl/FMAJOJI8ogMf4EHiiNuIeAMHEooqEd2ICbQKk2hVIu5GTKBVmcRzROx5rlVCll9NJf1qlXp2N8bMKiqtWVT4vm+MmVVUW7M+Yl4kF8AZuOx9EUmSJIlvVlJ6fkh04wrSAAAAAElFTkSuQmCC">

                    </div>
                    <div class="flex items-center mt-3">
                        <div class="flex border border-gray-200 bg-blue-50 p-2 w-full">
                            <img style="width:30px" src="~/assets/icon-discount.png">
                            <input type="text" v-model="code" class="w-full ml-2 bg-transparent"
                                style="border:0 !important;outline: none !important" placeholder="Masukan kode kupon">

                        </div>
                        <button type="button" @click="choosePromo(code, code)" :disabled="!code"
                            class="pointer bg-primary text-white py-3 px-5 ml-3 rounded-md font-bold">Gunakan</button>
                    </div>
                </div>
                <div class="p-3">
                    <div v-if="pageStatus == 'page-load'" class="flex justify-center mt-5">
                        <div class="loader"></div>
                    </div>
                    <div class="flex items-center justify-between mb-3 w-full" style="cursor:pointer;"
                        v-for="(context, index) in voucher">
                        <div class="flex items-center justify-between w-full">

                            <div class="flex items-center" @click="detail(context.vouchercode)">
                                <img style="width:50px" :src="context.iconurl" />
                                <div class="pl-3 pr-3">
                                    <div class="font-bold">{{context.title}}</div>
                                    <div class="text-gray-700">{{context.subtitle}}</div>
                                </div>
                            </div>
                            <div @click="choosePromo(context.vouchercode, context.title)"><img
                                    src="~/assets/icon-plus.png" style="width:30px" />
                            </div>

                        </div>
                    </div>
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

    const router = useRouter();
    const route = useRoute();

    const $toast = useToast();

    const code = ref('');
    const pageStatus = ref('standby');

    const voucher = ref([]);

    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })

    onMounted(() => {

        pageStatus.value = 'page-load';

        let params = {
            smcid: route.query.smcid,
            paketid: route.query.paketid
        }
        axios.get(config.public.API_URL + 'voucher', {
            headers: {
                'NEX-APIKEY': config.public.API_KEY
            },
            params
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                voucher.value = response.data.data.list;
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

    function detail(code: any) {
        router.push({
            path: '/detail-voucher',
            query: {
                id: code,
                flag: 'choose',
                smcid: route.query.smcid,
                paketid: route.query.paketid,
                refcode: route.query.refcode
            }

        })
    }

    function choosePromo(code, title) {
        let params = {
            smcid: route.query.smcid,
            paketid: route.query.paketid,
            vouchercode: code
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
</script>