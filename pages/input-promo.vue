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
                            <img style="width:30px"
                                src="data:image/png;base64,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">
                            <div class="text-xl pl-3 font-bold">Bayar Paket</div>
                        </div>
                        <img style="width:30px;cursor:pointer" @click="router.back()"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAiklEQVR4nO3WsQ0CMQxA0b+BMwKrMwMlVEdDQFQMwChck+soERdb/0np82UrCkiSJEl/FMAJOJI8ogMf4EHiiNuIeAMHEooqEd2ICbQKk2hVIu5GTKBVmcRzROx5rlVCll9NJf1qlXp2N8bMKiqtWVT4vm+MmVVUW7M+Yl4kF8AZuOx9EUmSJIlvVlJ6fkh04wrSAAAAAElFTkSuQmCC">

                    </div>
                    <div class="flex items-center mt-3">
                        <div class="flex border border-gray-200 bg-blue-50 p-2 w-full">
                            <img style="width:30px"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEtUlEQVR4nO1ZzW8bRRRflQPwLyC4IA5IiEqlnrEbIgXPLGn4SChS01YEpSSQSqVpEgGSaS+JOAUOQA+V+GiR4NADHMild6hqiBsSihAqqqh6QS2lkMSe2bXX3uxDbzb+duIdxxvVpU960urt7uz7zfu9N292DOOe3MUi4/QdwcjbRieKYNFDgtE1waknOR02OkkEo3HBaE5yCqiC07w0yV7jThC7N/KIYPSaZPRUxox2w7Sxo/K+MGNPSk5Xis6XlWQkiz1VO56IkycEJzOSk9+sHvpw6ACESQ5UOiYYvSE4+URy0pfp3f244PRmvfOlSNzEZ/BZfEcweqPqvkkOhA5AcvLxRg5uXclHoQMQnKbCAiA4mQ/VeYjFHhSMOuEBoHn8RmgAMGnDow9Vmnlm99Ntdxx6eh7AgSUn58IGIDk5h9/Cb7bssGV2PWSxSL/gdFYyelFwkg3fcVqbDwUsrYKRT3EhzPLIo4EBSE5/326HZTNl9EpgAIKT94MObB95FdzkBfDSq+CtLoObSoJ9/PUQIkJnAwNIxyNdgZyfeAMg74CSQh6gUChd4726d/q6wXr52ZYA2JzsCQwA24PNVtSiuj//pPx1ly6B9WKPUrxWtsVU3fPOl5+Bl0lDbiahSR9yq7ZlaU4jRs42G9izbeVs9t3Jkg2vUfBe1Qwe3u9Hy1sD+9iIJn3IGUNXrHh0oNnARbGPDpcdPTpcsldFaz0y+W+/1qaPxSL92gAEi+5sGoHVFT8CJ6bKEUhM+BGwrJItNzvt2/69DdYA009gFt2pN/smiSDvmuZA8oLP918vg3WoH6yDL4B7edG3Lcz7s7fPBG9lWdly751sKYElo/8ETmJhEi4ZSQeqDEeGAJz1KlQpjgP2m6+pZwrn53xAqWRrzvNiFKiULPLc5s5zMqR2TxoD2+OjquJA1lYz7V78DuzRgz6dJscAPA8glwVraN+WAMjS6kxHN+L8JO5ht/qRkvbugbU/rvoB+fx0Oxc0TzKSCB2Ac+a0cn7t+jWQe7vCB9AqhRop0gVpg/RBGimqHRsBdz6p2g2km7u0oN1ybEqhVpJ4I8WEVR3F+Tnf+fGRxsmed1QhaFsS65bRRoqlUtX8lWVVQhUgTHLVciyANfi8KrlYelHc5PftLaM6C1kddQaYWqxQcPEq2pEyKNnE8ZIte3JK2XAxbPtCpqLA6Uu6APJz3/iz+ssiSDNaBqDRcshGExOPDmgDEJx8oeM8Jik2aorXh/dX3StHYKIcgRNTdS3HxhEgZ7Wcx9ZVcvKXFvdnEqpVxpa5LqmXFqrb7v54uRVfTAXIAXILBgfvCwzA38DrJ7DarPR119mzE2MVm52Cv/kpthzjwVpr3GQFpw8jH7QCYDNFEO6lH9Q6gImrWo6xVwK/j9vcDt/Uk6v/n98qHf9jq93JraNpnWTVFeh77P7Kk5e204ZRJ5SZrxT8BR4eAPKjEbbgIURoFGLkw20/YpKc3hacfIVVSx0x1RwbVTtI/8Zn1G96Rk8JTv6sodDgthzy4Y9WLLGWSWO1f8wkj+xquJ9Qtsiuymdh2tiBY6yX6ys4tnHHHrPGaa/RSSI6+aC7KIKTt1BLhntyF8p/acyeDK0PLc4AAAAASUVORK5CYII=">
                            <input type="text" v-model="code" class="w-full ml-2 bg-transparent"
                                placeholder="Masukan kode kupon">

                        </div>
                        <button type="button" @click="choosePromo(code, code)"
                            class="pointer bg-primary text-white py-3 px-5 ml-3 rounded-md font-bold">Gunakan</button>
                    </div>
                </div>
                <div class="p-3">
                    <div v-if="pageStatus == 'page-load'" class="flex justify-center mt-5">
                        <div class="loader"></div>
                    </div>
                    <div class="flex items-center justify-between mb-3 w-full" style="cursor:pointer;"
                        v-for="(context, index) in voucher" @click="choosePromo(context.vouchercode, context.title)">
                        <div class="flex items-center justify-between w-full">

                            <div class="flex items-center">
                                <img style="width:70px" :src="context.iconurl" />
                                <div class="pl-3 pr-3">
                                    <div class="font-bold">{{context.title}}</div>
                                    <div class="text-gray-700">{{context.subtitle}}</div>
                                </div>
                            </div>
                            <div><img style="width:30px"
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACV0lEQVR4nO2Zy2oUURCGG28Ll15WXl4iGMxqdhKokqpeNErc+wpKNrNL3McwCb7BSFfBRN248BmU+ABqVuayTrtRqmccMCTM6T59OS39w4GBYab/71z/Ux1FvXr18lYyTi6j8AooraNSCsJfUfgElX7lTfgEhPfz75TWH6fxw+FweClqW6R0D4VfofABKv8u1ugHKG2upvHdxo2vjpPbqLwLSllx4/82UMpAaYQTvNWIeVRaQ6VjX+PngBxBGj+tzfjS7vOrIPymauN4FkR4x55VqXmc4HVQ+lC3efzbhN/bM6vr+SbN6xziYzJOrnkDNDFt8OJ1MfIzn8bP2jKP80ZPSpln4ZsgfBgAwHGpLdb2+bIPvUilp5LwdiHzdjr6HFKVAyhlOMH77r1v8cBj2KsGwCnEppN5C1mWU0IDQOEDC40uvb/i9aC6ADRfC8sLAaaROEwAFH7pMgISMMDbxSOQXzzKmywrdAP4sngEHKNyGwAgfOiyBrJQAVD49P8HwM5PIen6Ipaub6Ma7kEGSi8WAljRKVQATOMHTmEOhL+HBgDC35yreRZdQwNApY2oqxcaFD6FPbjjDDAbhVEwAEpbUVE9Gic3QrjUg9JR6bqp1SpbB5A4KWV+DiG802Lvv458ZfdQENbmAejd4NPgSlSFrNCaF1yb6/m9yoq7Z4q8oyamzaCqnj9PVqusZ3ein94LtmDddNsOGG/jYv9BW7ZtR03LTkeLHWWy0/Q3tFH4hK1DswC4bHUby+x28bCb3ewFXpZ/Fv5s31kktlQZxGvWXr2i7usPseDsn8oBAbAAAAAASUVORK5CYII=">
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

    onMounted(() => {

        pageStatus.value = 'page-load';

        let params = {
            smcid: route.query.smcid,
            paketid: route.query.paketid
        }
        axios.get(config.public.API_URL + 'voucher', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
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

    function choosePromo(code, title) {
        let params = {
            smcid: route.query.smcid,
            paketid: route.query.paketid,
            vouchercode: code
        }
        axios.get(config.public.API_URL + 'voucherdetail', {
            headers: {
                'NEX-APIKEY': 'apikey-1234567890'
            },
            params
        }).then(response => {
            if (response.data.success) {
                pageStatus.value = 'standby';
                sessionStorage.setItem('disc', response.data.data.disc);
                sessionStorage.setItem('voucher', title);

                router.back()
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