<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Import Aset</h1>

    <!-- DataTales Example -->
    <div class="card shadow mb-4">
        <div class="card-body">
            <form @submit.prevent="uploadFile">
                <div class="mb-3">
                    <label style="font-weight:bold;">Masukkan File</label>
                    <input type="file" @change="handleFileUpload" class="form-control" />
                    <!-- Validation error message -->
                    <div v-if="errors.file" class="text-danger">{{ errors.file }}</div>
                </div>
                <button type="submit" class="btn btn-primary btn-sm">Simpan</button>
                <button type="button" @click="cancelCreation" class="btn btn-danger btn-sm ml-2">Kembali</button>
            </form>
        </div>
    </div>
    <!-- /.container-fluid -->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            file: null,
            errors: {},
        };
    },
    methods: {
        handleFileUpload(event) {
            this.file = event.target.files[0];
        },
        async uploadFile() {
            let formData = new FormData();
            formData.append('file', this.file);

            try {
                await axios.post("https://wopcefo.sga.dom.my.id/api/asset/import", formData, {
                    headers: {
                        'Authorization': "Bearer " + this.getCookie("token"),
                        'Content-Type': 'multipart/form-data',
                    },
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Berhasil Upload File!',
                }).then(() => {
                    this.$router.push({ name: "asset.index" });
                });
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        this.errors = this.extractErrorMessages(error.response.data.errors);
                        console.log("Validation errors:", error.response.data.errors);
                    } else if (error.response.status === 400) {
                        this.errors = this.extractErrorMessages(error.response.data);
                    } else {
                        console.error('Error uploading file:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'Failed to upload file. Please try again later.',
                        });
                    }
                } else {
                    console.error('Error uploading file:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to upload file. Please try again later.',
                    });
                }
            }
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
