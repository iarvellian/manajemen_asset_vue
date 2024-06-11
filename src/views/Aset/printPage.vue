<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Cetak Berita Acara Aset Rusak</h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-body">
            <form @submit.prevent="createBeritaAcara" enctype="multipart/form-data">
                <div class="mb-3">
                    <label for="inputPerihal" style="font-weight:bold;">Perihal</label>
                    <input class="form-control" v-model="perihal" id="inputPerihal" type="text"
                        placeholder="Masukkan Perihal" />
                    <!-- Validation error message -->
                    <div v-if="errors.perihal" class="text-danger">{{ errors.perihal }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputPihak1" style="font-weight:bold;">Dibuat Oleh</label>
                    <input class="form-control" v-model="pihak1" id="inputPihak1" type="text"
                        placeholder="Masukkan Nama Pembuat Berita Acara" />
                    <!-- Validation error message -->
                    <div v-if="errors.pihak_pertama" class="text-danger">{{ errors.pihak_pertama }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputJabatan1" style="font-weight:bold;">Jabatan Pembuat</label>
                    <input class="form-control" v-model="jabatan1" id="inputJabatan1" type="text"
                        placeholder="Masukkan Jabatan" />
                    <!-- Validation error message -->
                    <div v-if="errors.jabatan_pertama" class="text-danger">{{ errors.jabatan_pertama }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputKeterangan" style="font-weight:bold;">Keterangan</label>
                    <textarea class="form-control" v-model="keterangan" id="inputKeterangan" rows="5"
                        placeholder="Masukkan Keterangan"></textarea>
                    <!-- Validation error message -->
                    <div v-if="errors.keterangan" class="text-danger">{{ errors.keterangan }}</div>
                </div>
                <div class="mb-3">
                    <label for="inputAsset" style="font-weight:bold;">Aset</label>
                    <Multiselect v-model="selectedAssets" :close-on-select="false" :filter-results="false" mode="tags"
                        :options="async (query) => await fetchAssets(query)" :multiple="true" :limit="10"
                        :clear-on-search="true" :delay="0" :searchable="true" placeholder="Pilih Aset" label="label"
                        track-by="id_asset" @input="handleAssetSelection">
                        <template v-slot:noOptions>
                            Loading assets...
                        </template>
                    </Multiselect>
                    <!-- Validation error message -->
                    <div v-if="errors.assets" class="text-danger">{{ errors.assets }}</div>
                </div>
                <div class="mb-3">
                    <label style="font-weight:bold;">Gambar</label>
                    <input type="file" multiple @change="handleFileUpload" id="gambar" ref="gambarInput"
                        class="form-control">
                    <div v-if="gambar.length" class="mt-3">
                        <label style="font-weight:bold;">Image Previews:</label>
                        <div class="d-flex flex-wrap">
                            <div v-for="(img, index) in gambar" :key="index"
                                class="preview-container position-relative m-2">
                                <img :src="img.preview" :alt="'Image ' + (index + 1)" class="img-thumbnail"
                                    style="max-width: 100px;">
                                <button @click.prevent="removeImage(index)"
                                    class="btn btn-danger btn-sm position-absolute top-0 end-0">X</button>
                            </div>
                        </div>
                    </div>
                    <!-- Validation error message -->
                    <div v-if="errors.gambar" class="text-danger">{{ errors.gambar }}</div>
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
            jenis: "rusak",
            perihal: "",
            pihak1: "",
            pihak2: "",
            jabatan1: "",
            jabatan2: "",
            keterangan: "",
            selectedAssets: [],
            asset: [],
            gambar: [],
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
        handleFileUpload(event) {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.gambar.push({ file, preview: e.target.result });
                };
                reader.readAsDataURL(file);
            });
        }
        ,
        removeImage(index) {
            this.gambar.splice(index, 1);
            this.clearFileInput();
        },
        clearFileInput() {
            this.$refs.gambarInput.value = "";
        },
        createBeritaAcara() {
            Swal.fire({
                title: "Apakah Anda yakin?",
                text: "Anda akan membuat berita acara baru.",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, simpan!",
                cancelButtonText: "Batal"
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('jenis', 'rusak');
                    formData.append('perihal', this.perihal);
                    formData.append('pihak_pertama', this.pihak1);
                    formData.append('pihak_kedua', 'Muchammad Abdul Muiz');
                    formData.append('jabatan_pertama', this.jabatan1);
                    formData.append('jabatan_kedua', 'Staff Equipment & Technology');
                    formData.append('keterangan', this.keterangan);

                    this.selectedAssets.forEach(asset => {
                        formData.append('assets[]', asset);
                    });

                    this.gambar.forEach((img, index) => {
                        formData.append(`gambar[${index}]`, img.file);
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
                                title: "Sukses!",
                                text: "Berita acara berhasil dibuat!",
                            }).then(() => {
                                this.$router.push({ name: "asset.index" });
                            });
                        })
                        .catch((error) => {
                            if (error.response && error.response.status === 400) {
                                error.response.data.text().then((text) => {
                                    const json = JSON.parse(text);
                                    this.errors = this.extractErrorMessages(json);
                                    console.log("Validation errors:", json);
                                });
                            } else {
                                console.error("Error creating berita acara:", error);
                                Swal.fire({
                                    icon: "error",
                                    title: "Error!",
                                    text: "Terjadi kesalahan saat menyimpan berita acara.",
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
            this.$router.push({ name: "asset.index" });
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
    },
};
</script>

<style>
.preview-container {
    margin-right: 20px;
    margin-bottom: 20px;
}

.preview-container img {
    display: block;
}

.preview-container button {
    top: -10px;
    right: -10px;
}
</style>
