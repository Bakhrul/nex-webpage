<template>
    <div>
        <div id="overlay" @click="offModalOvo()">
        </div>
        <div id="modal-term-dialog" @click="offModalOvo()">
            <div class="modal" id="modal-term" @click.stop="">
                <div class="header" id="header">
                    <div class="text-lg text-center p-2 font-semibold">Masukkan No Hp Ovo Anda</div>
                </div>
                <div class="body p-2">
                    <input type="text" class="w-full p-3 border-gray-300 rounded-xl border" v-model="ovoPhone"
                        placeholder="0812345657">
                    <button type="button" @click="processPayment();"
                        :disabled="!ovoPhone || pageStatus == 'payment-load'"
                        class="w-full rounded-lg text-white p-2 text-md font-bold pointer mt-3 bg-primary">{{pageStatus == 'payment-load' ? 'Processing...' : 'Bayar'}}</button>
                    <button type="button" @click="offModalOvo()"
                        class="pointer w-full rounded-lg text-black bg-gray-300 mt-3 p-2 text-md font-bold">Tutup</button>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="main-wrapper relative">
                <div class="flex w-full border-b border-gray-200 px-3 py-2 flex justify-center">
                    <img src="~/assets/logo.jpg" style="width:150px" />
                </div>
                <div>
                    <div v-if="pageStatus == 'page-load'" class="flex justify-center mt-5">
                        <div class="loader"></div>
                    </div>
                    <template v-else>
                        <div class="p-5" v-if="pageStatus == 'qris'">
                            <div class="flex justify-center mt-3">
                                <img src="~/assets/qris.png" style="width:100px" />
                            </div>
                            <div class="text-center font-bold text-2xl pt-3 c-primary">{{ totalQris }}</div>
                            <div class="flex justify-center mt-5">
                                <vue-qrcode :id="'qr-image-payment'" :width="230" download="true" :value="qris" />
                            </div>
                            <div class="flex justify-center mt-1">
                                <button type="button" class="bg bg-gray-300 px-3 py-2 font-bold rounded"
                                    @click="downloadImageQr(qris)">Download QRIS</button>
                            </div>
                            <div class="text-center font-bold mt-5">Scan QRIS untuk pembayaran</div>
                            <button type="button" @click=" router.replace({
            path: '/'
        })" class="text-white mb-5 mt-10 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">Selesai</button>
                        </div>
                        <template v-else>
                            <div class="p-3 text-xl font-bold">Pilih Pembayaran</div>
                            <template v-for="context in listPaymentAutoDebet">
                                <div class="p-3"
                                    :style="index != listPaymentRegular.length - 1 ? 'border-bottom:3px #ddd solid' : ''">
                                    <div class="text-base font-bold mt-5 mb-2">{{context.paymentname}}</div>
                                    <div class="flex justify-between items-center mt-5 border-b border-gray-200 pb-5 pointer"
                                        v-for="(a, idx) in context.paymentdet" @click="payment = a.paymentid"
                                        :style="idx == context.paymentdet.length - 1 ? 'border-bottom:0 !important;' : ''">
                                        <div class="flex items-center">
                                            <div>
                                                <img :src="a.iconurl" style="max-height:40px">
                                            </div>
                                            <div class="font-semibold text-sm" style="padding-left: 10px;">
                                                {{a.paymentname}}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="radio-payment" :class="payment == a.paymentid ? 'active' : ''">
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-for="(context, index) in listPaymentRegular">
                                <div class="p-3"
                                    :style="index != listPaymentRegular.length - 1 ? 'border-bottom:3px #ddd solid' : ''">
                                    <div class="text-base font-bold mt-5 mb-2">{{context.paymentname}}</div>
                                    <div class="flex justify-between items-center mt-5 border-b border-gray-200 pb-5 pointer"
                                        v-for="(a, idx) in context.paymentdet" @click="payment = a.paymentid"
                                        :style="idx == context.paymentdet.length - 1 ? 'border-bottom:0 !important;' : ''">
                                        <div class="flex items-center">
                                            <div>
                                                <img :src="a.iconurl"
                                                    :style="['VC001', 'VC002', 'VC003', 'VC004', 'VC005'].includes(a.paymentid) ? 'max-width:90px' : 'max-height:25px'">
                                            </div>
                                            <div class="font-semibold text-sm" style="padding-left: 10px;">
                                                {{a.paymentname}}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="radio-payment" :class="payment == a.paymentid ? 'active' : ''">
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <button type="button" @click="confirmProcessPayment()"
                                :disabled="!payment || pageStatus == 'payment-load'"
                                class="text-white mb-5 mt-10 font-bold text-base rounded-lg mt-3 bg-primary w-full p-3">{{ pageStatus == 'payment-load' ? 'Processing...' : 'Bayar' }}</button>
                        </template>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import axios from "axios";
    import VueQrcode from 'vue-qrcode'
    import Swal from 'sweetalert2'
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
    const ovoPhone = ref('');

    const totalQris = ref('');
    const qris = ref('');
    const listPaymentAutoDebet = ref([])
    const listPaymentRegular = ref([])


    useSeoMeta({
        title: 'Nex Web Page',
        ogTitle: 'Nex Web Page',
        description: 'Nex Web Page',
        ogDescription: 'Nex Web Page',
        twitterCard: 'summary_large_image',
    })

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
                'NEX-APIKEY': config.public.API_KEY
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
                'NEX-APIKEY': config.public.API_KEY
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

    function confirmProcessPayment() {
        if (payment.value == 'OVO' && route.query.type == 'regular') {
            showModalOvo()
        } else {
            processPayment()
        }
    }

    function processPayment() {
        offModalOvo()
        let type = route.query.type;
        let urlX = '';
        let data = {
            paketid: route.query.packet,
            smcid: route.query.smc,
            vouchercode: route.query.voucher,
            paymentid: payment.value,
            referalcode: route.query.refcode ? route.query.refcode : '',
            hpno: route.query.phone,
            refcode: route.query.refcode ? route.query.refcode : '',
            pakettype: route.query.typePacket,
            paketaddonid: route.query.paketaddonid,
            paketaddontype: route.query.paketaddontype,
        }
        if (type == 'regular') {
            if (payment.value == 'DANA') {
                urlX = 'paymentregular/danapayment'
            } else if (payment.value == 'OVO') {
                data.hpno = ovoPhone.value;
                urlX = 'paymentregular/ovopayment'
            } else if (payment.value == 'QRIS') {
                data.hpno = ovoPhone.value;
                urlX = 'paymentregular/qrispayment'
            } else if (payment.value == 'LINKAJA') {
                urlX = 'paymentregular/linkajapayment'
            } else if (payment.value == 'GOPAY') {
                urlX = 'paymentregular/gopaypayment'
            } else if (payment.value == 'SHOPEEPAY') {
                urlX = 'paymentregular/shopeepayment'
            } else if (payment.value == 'CARD') {
                urlX = 'paymentregular/ccpayment'
            } else if (['VC001', 'VC002', 'VC003', 'VC004', 'VC005'].includes(payment.value)) {
                urlX = 'paymentregular/vapayment'
            } else {
                return false;
            }
        } else {

            if (payment.value == 'DANA') {
                urlX = 'paymentautodebet/danalink'
            } else if (payment.value == 'OVO') {
                urlX = 'paymentautodebet/ovolink'
            } else if (payment.value == 'SHOPPEE') {
                urlX = 'paymentautodebet/shopeelink'
            } else if (payment.value == 'QRIS') {
                router.push({
                    path: '/bri-link',
                    query: {
                        smc: route.query.smc,
                        phone: route.query.phone,
                        refcode: route.query.refcode,
                        packet: route.query.packet,
                        voucher: route.query.voucher,
                    }
                })
                return false;
            } else if (payment.value == 'BRI') {
                router.push({
                    path: '/bri-link',
                    query: {
                        smc: route.query.smc,
                        phone: route.query.phone,
                        refcode: route.query.refcode,
                        packet: route.query.packet,
                        voucher: route.query.voucher,
                    }
                })
                return false;
            } else {
                return false;
            }
        }

        pageStatus.value = 'payment-load';

        let formData = JSON.stringify(data)
        axios.post(`${config.public.API_URL}${urlX}`, formData, {
            headers: {
                'NEX-APIKEY': config.public.API_KEY
            },
        }).then(response => {
            if (response.data.success) {
                sessionStorage.clear()
                if (type == 'regular') {
                    if (payment.value == 'DANA') {
                        location.replace(response.data.data.paymenturl)
                    } else if (payment.value == 'OVO') {
                        Swal.fire({
                            title: "Berhasil",
                            text: response.data.message
                        }).then((result) => {
                            router.back()
                        });

                    } else if (payment.value == 'QRIS') {
                        pageStatus.value = 'qris';
                        totalQris.value = response.data.data.amount;
                        qris.value = response.data.data.qrstring;
                    } else if (payment.value == 'LINKAJA') {
                        location.replace(response.data.data.paymenturl)
                    } else if (payment.value == 'GOPAY') {
                        location.replace(response.data.data.paymenturl)
                    } else if (payment.value == 'SHOPEEPAY') {
                        location.replace(response.data.data.paymenturl)
                    } else if (payment.value == 'CARD') {
                        location.replace(response.data.data.paymenturl)
                    } else if (['VC001', 'VC002', 'VC003', 'VC004', 'VC005'].includes(payment.value)) {
                        urlX = 'paymentregular/vapayment'
                        localStorage.setItem('amount', response.data.data.amount)
                        localStorage.setItem('bataswaktu', response.data.data.bataswaktu)
                        localStorage.setItem('nova', response.data.data.nova)
                        localStorage.setItem('paymentdesc', response.data.data.paymentdesc)
                        localStorage.setItem('paymenttype', response.data.data.paymenttype)

                        router.replace({
                            path: '/virtual-account',
                        })
                    }
                } else {
                    if (payment.value == 'DANA') {
                        location.replace(response.data.data.paymenturl)
                    } else if (payment.value == 'OVO') {
                        location.replace(response.data.data.paymenturl)
                    } else if (payment.value == 'SHOPPEE') {
                        location.replace(response.data.data.paymenturl)
                    }
                }

            } else {
                pageStatus.value = 'standby';
                $toast.open({
                    message: response.data.message,
                    type: 'error',
                    position: 'top',
                    duration: 2000
                });
            }
        }).catch(error => {
            pageStatus.value = 'standby';
            $toast.open({
                message: 'Terjadi kesalahan sistem',
                type: 'error',
                position: 'top',
                duration: 2000

            });
        });
    }

    function showModalOvo() {
        ovoPhone.value = '';
        document.getElementById("overlay").style.display = "block";
        setTimeout(() => {
            document.getElementById('modal-term-dialog').style.display = "block";
        }, 300);
    }

    function offModalOvo() {
        document.getElementById("overlay").style.display = "none";
        document.getElementById('modal-term-dialog').style.display = "none";
    }
    async function downloadImageQr(imageSrc) {
        console.log(imageSrc)
        const linkSource = document.getElementById("qr-image-payment").src;
        const downloadLink = document.createElement("a");
        downloadLink.href = linkSource;
        downloadLink.download = 'qris.png';
        downloadLink.click();
    }
</script>