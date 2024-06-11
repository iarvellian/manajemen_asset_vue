<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Cetak Berita Acara Aset Masuk</h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-body">
            <form @submit.prevent="createBeritaAcara" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="inputPihak1" style="font-weight:bold;">Pihak Pertama</label>
                    <input class="form-control" v-model="pihak1" id="inputPihak1" type="text"
                        placeholder="Masukkan Nama Pihak Pertama" />
                    <!-- Validation error message -->
                    <div v-if="errors.pihak_pertama" class="text-danger">{{ errors.pihak_pertama }}</div>
                </div>
                
                <div class="mb-3">
                    <label for="inputJabatan1" style="font-weight:bold;">Jabatan Pertama</label>
                    <input class="form-control" v-model="jabatan1" id="inputJabatan1" type="text"
                        placeholder="Masukkan Jabatan Pihak Pertama" />
                    <!-- Validation error message -->
                    <div v-if="errors.jabatan_pertama" class="text-danger">{{ errors.jabatan_pertama }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputPihak2" style="font-weight:bold;">Pihak Kedua</label>
                    <input class="form-control" v-model="pihak2" id="inputPihak2" type="text"
                        placeholder="Masukkan Nama Pihak Kedua" />
                    <!-- Validation error message -->
                    <div v-if="errors.pihak_kedua" class="text-danger">{{ errors.pihak_kedua }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputJabatan2" style="font-weight:bold;">Jabatan Kedua</label>
                    <input class="form-control" v-model="jabatan2" id="inputJabatan2" type="text"
                        placeholder="Masukkan Jabatan Pihak Kedua" />
                    <!-- Validation error message -->
                    <div v-if="errors.jabatan_kedua" class="text-danger">{{ errors.jabatan_kedua }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputKeterangan" style="font-weight:bold;">Keterangan</label>
                    <input class="form-control" v-model="keterangan" id="inputKeterangan" type="text"
                    placeholder="Masukkan: Dengan ini menerangkan bahwa Pihak Pertama telah melakukan penyimpanan barang ... berupa:" />
                    <!-- Validation error message -->
                    <div v-if="errors.keterangan" class="text-danger">{{ errors.keterangan }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputAsset" style="font-weight:bold;">Asset</label>
                    <Multiselect v-model="selectedAssets" :close-on-select="false" :filter-results="false" mode="tags"
                        :options="async (query) => await fetchAssets(query)" :multiple="true" :limit="10"
                        :clear-on-search="true" :delay="0" :searchable="true" placeholder="Pilih Asset" label="label"
                        track-by="id_asset" @input="handleAssetSelection">
                        <template v-slot:noOptions>
                            Loading assets...
                        </template>
                    </Multiselect>
                    <!-- Validation error message -->
                    <div v-if="errors.assets" class="text-danger">{{ errors.assets }}</div>
                </div>

                <button type="submit" class="btn btn-primary btn-sm">Simpan</button>
                <button type="button" @click="cancelCreation" class="btn btn-danger btn-sm ml-2">
                    Kembali
                </button>
            </form>
        </div>
    </div>
    <!-- /.container-fluid -->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import Multiselect from '@vueform/multiselect';
import '@vueform/multiselect/themes/default.css';

export default {
    components: {
        Multiselect,
    },
    data() {
        return {
            jenis: "masuk",
            pihak1: "",
            pihak2: "",
            jabatan1: "",
            jabatan2: "",
            keterangan: "",
            selectedAssets: [],
            asset: [],
            errors: {},
        };
    },
    methods: {
        async fetchAssets(query) {
            try {
                const response = await axios.get("https://wopcefo.sga.dom.my.id/api/asset/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                    params: {
                        search: query
                    }
                });
                const formattedData = response.data.data.map(asset => ({
                    value: asset.id_asset,
                    label: asset.nama_aset,
                }));
                console.log("data", formattedData);
                return formattedData;
            } catch (error) {
                console.error("Error fetching data:", error);
                return [];
            }
        },
        handleAssetSelection(selectedItems) {
            // this.selectedAssets = selectedItems;
            console.log("Selected Items:", selectedItems);
        },
        createBeritaAcara() {
            Swal.fire({
                title: "Are you sure?",
                text: "You are about to create a new report.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, create it!",
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('jenis', this.jenis);
                    formData.append('perihal', this.perihal);
                    formData.append('pihak_pertama', this.pihak1);
                    formData.append('pihak_kedua', this.pihak2);
                    formData.append('jabatan_pertama', this.jabatan1);
                    formData.append('jabatan_kedua', this.jabatan2);
                    formData.append('keterangan', this.keterangan);

                    this.selectedAssets.forEach(asset => {
                        formData.append('assets[]', asset);
                    });

                    axios.post("https://wopcefo.sga.dom.my.id/api/berita_acara/", formData, {
                        headers: {
                            'Authorization': "Bearer " + this.getCookie("token"),
                            'Content-Type': 'multipart/form-data'
                        },
                        responseType: 'blob'
                    })
                        .then(response => {
                            const blob = new Blob([response.data], { type: 'application/pdf' });
                            const link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            link.download = 'berita_acara.pdf';
                            link.click();
                            Swal.fire({
                                icon: "success",
                                title: "Success!",
                                text: "Report created successfully!",
                            }).then(() => {
                                this.$router.push({ name: "assetkeluar.index" });
                            });
                        })
                        .catch(error => {
                            if (error.response && error.response.status === 400) {
                                this.errors = this.extractErrorMessages(error.response.data);
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: "Failed to create report.",
                                });
                            }
                        });
                }
            });
        },
        extractErrorMessages(errors) {
            const errorMessages = {};
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    errorMessages[key] = errors[key][0];
                }
            }
            return errorMessages;
        },
        cancelCreation() {
            this.$router.push({ name: "assetmasuk.index" });
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
    },
};
</script>
