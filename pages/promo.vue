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
                        <div style="cursor:pointer;" @click="redirectPromo(context.id)"
                            class="border border-gray-200 rounded-lg mb-3 shadow-lg" v-for="context in promo">
                            <div>
                                <img :src="context.bannerurl" class="w-full rounded-lg">
                            </div>
                            <div class="p-3">
                                <div class="justify-between flex items-center mb-3">
                                    <div>
                                        <div class="text-base font-semibold">{{context.title}}</div>
                                        <div class="text-gray-600 pt-3">{{context.subtitle}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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

    const router = useRouter();

    const $toast = useToast();

    const pageStatus = ref('standby');

    const promo = ref([]);

    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })
    
    onMounted(() => {

        pageStatus.value = 'page-load';

        axios.get(config.public.API_URL + 'promo', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                promo.value = response.data.data.list;
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

    function redirectPromo(id) {
        router.push({
            path: '/promo-detail',
            query: {
                id: id
            }
        })        


    }
</script>