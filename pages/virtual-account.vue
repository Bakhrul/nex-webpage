<template>
    <div>
        <div class="flex justify-center">
            <div class="main-wrapper relative">
                <div class="flex w-full border-b border-gray-200 px-3 py-2 flex justify-center">
                    <img src="~/assets/logo.jpg" style="width:150px" />
                </div>
                <div class="p-3">
                    <div class="text-gray-600 text-center text-base pt-5">{{ paymenttype }}</div>
                    <div class="text-black text-xl pt-3  text-center font-bold">{{ nova }}</div>
                    <div class="flex justify-center mt-3"><button class="text-sm border p-3 pointer"
                            @click="copyVa()"><i class="bi bi-copy"></i>&ensp;Copy</button></div>

                    <div class="text-gray-600 text-center text-base pt-5">Lakukan pembayaran sebelum</div>
                    <div class="text-black text-xl pt-3  text-center font-bold">{{ bataswaktu }}</div>

                    <div class="text-gray-600 text-center text-base pt-5">Jumlah</div>
                    <div class="text-black text-xl pt-3  text-center font-bold mb-10">{{ amount }}</div>

                    <div v-html="paymentdesc"></div>
                    <button type="button" @click="redirectHome()"                            
                            class="text-white mb-5 mt-10 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Selesai</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
        useToast
    } from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-sugar.css';
    const $toast = useToast();
    const router = useRouter()

    const nova = ref('');
    const paymentdesc = ref('');
    const bataswaktu = ref('');
    const paymenttype = ref('');
    const amount = ref('');

    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })
    
    onMounted(() => {
        nova.value = localStorage.getItem('nova')
        paymentdesc.value = localStorage.getItem('paymentdesc')
        bataswaktu.value = localStorage.getItem('bataswaktu')
        paymenttype.value = localStorage.getItem('paymenttype')
        amount.value = localStorage.getItem('amount')
    })

    function copyVa() {
        navigator.clipboard.writeText(nova.value);
        $toast.open({
            message: 'Virtual Account copied!',
            type: 'success',
            position: 'top',
            duration: 2000

        });
    }

    function redirectHome(){
        router.replace({
            path: '/'
        })
    }
</script>