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
                        <div v-html="content"></div>
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

    const route = useRoute();

    const config = useRuntimeConfig()

    const $toast = useToast();

    const pageStatus = ref('standby');

    const banner = ref('');
    const title = ref('');
    const content = ref('');

    onMounted(() => {

        pageStatus.value = 'page-load';

        let urlX = '';
        if(route.query.type){
            urlX = config.public.API_URL + 'paketdetailregular?nama=' + route.query.id + '&type=' + route.query.type;
        }else{
            urlX = config.public.API_URL + 'paketdetailautodebet?id=' + route.query.id;
        }
        axios.get(urlX, {
            headers: {
                'NEX-APIKEY': config.public.API_KEY
            }
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                banner.value = response.data.data.bannerurl;
                title.value = response.data.data.paketname;
                content.value = response.data.data.content;
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

    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })
</script>