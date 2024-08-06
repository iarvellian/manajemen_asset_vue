<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Profil</h1>

    <div v-if="profile" class="container">
        <div class="main-body">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-column align-items-center text-center">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150">
                        <div class="mt-3">
                            <h4>{{ profile.nama_pegawai }}</h4>
                            <p class="text-secondary mb-1">{{ profile.jabatan }}</p>
                        </div>
                    </div>
                    <form @submit.prevent="confirmUpdate">
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Nama Lengkap</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" v-model="profile.nama_pegawai" />
                                <!-- Validation error message -->
                                <div v-if="errors.nama_pegawai" class="text-danger">{{ errors.nama_pegawai }}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">NIK</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" v-model="profile.nik" disabled />
                                <!-- Validation error message -->
                                <div v-if="errors.nik" class="text-danger">{{ errors.nik }}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Jabatan</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" v-model="profile.jabatan" />
                                <!-- Validation error message -->
                                <div v-if="errors.jabatan" class="text-danger">{{ errors.jabatan }}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Role</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" v-model="profile.role.nama_role" disabled />
                                <!-- Validation error message -->
                                <div v-if="errors.role" class="text-danger">{{ errors.role }}</div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Username</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                                <input type="text" class="form-control" v-model="profile.username" />
                                <!-- Validation error message -->
                                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
                            </div>
                        </div>
                        <hr>
                        <!-- Password Update Section -->
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Password Baru</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                            <div class="input-group">
                            <input :type="newPasswordVisible ? 'text' : 'password'" class="form-control" v-model="newPassword" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="toggleNewPasswordVisibility">
                                <i :class="newPasswordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                </button>
                            </div>
                            </div>
                            <!-- Validation error message -->
                            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
                        </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-3">
                                <h6 class="mb-0">Konfirmasi Password</h6>
                            </div>
                            <div class="col-sm-9 text-secondary">
                            <div class="input-group">
                            <input :type="confirmNewPasswordVisible ? 'text' : 'password'" class="form-control" v-model="confirmNewPassword" />
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="toggleConfirmNewPasswordVisibility">
                                <i :class="confirmNewPasswordVisible ? 'fa fa-eye' : 'fa fa-eye-slash'"></i>
                                </button>
                            </div>
                            </div>
                            <!-- Validation error message -->
                            <div v-if="errors.password_confirmation" class="text-danger">{{ errors.password_confirmation }}</div>
                        </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-12 text-center">
                                <button type="submit" class="btn btn-primary">Simpan Profil</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <div v-else>Loading...</div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
    data: function () {
        return {
            profile: null,
            newPassword: "",
            confirmNewPassword: "",
            newPasswordVisible: false,
            confirmNewPasswordVisible: false,
            errors: {},
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios
                .get("http://127.0.0.1:8000/api/profile/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.profile = response.data;
                    console.log("Fetched data:", this.profile);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        },
        confirmUpdate() {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Apakah Anda ingin menyimpan perubahan?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, simpan!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.updateProfile();
                }
            });
        },
        updateProfile() {
            // Prepare the data to be sent
            const updateData = {
                nama_pegawai: this.profile.nama_pegawai,
                jabatan: this.profile.jabatan,
                username: this.profile.username,
                password: this.newPassword,
                password_confirmation: this.confirmNewPassword,
            };

            axios
                .put("http://127.0.0.1:8000/api/profile", updateData, {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    console.log("Profile updated:", response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Diperbarui!',
                        text: 'Profil Anda telah diperbarui.',
                        timer: 2000,
                        showConfirmButton: false
                    }).then(() => {
                        window.location.reload();
                    });
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        this.errors = this.extractErrorMessages(error.response.data);
                    } else {
                        console.error("Error updating profile:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Error!",
                            text: "Failed to update profile.",
                        });
                    }
                });
        },
        toggleNewPasswordVisibility() {
            this.newPasswordVisible = !this.newPasswordVisible;
        },
        toggleConfirmNewPasswordVisibility() {
            this.confirmNewPasswordVisible = !this.confirmNewPasswordVisible;
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
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
    },
};
</script>

<style>
.card {
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0, 0, 0, .125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.mb-3,
.my-3 {
    margin-bottom: 1rem !important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}

.h-100 {
    height: 100% !important;
}

.shadow-none {
    box-shadow: none !important;
}
</style>
