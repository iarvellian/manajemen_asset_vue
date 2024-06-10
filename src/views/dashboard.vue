<template>
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
    </div>

    <!-- Content Row -->
    <div class="row">
        <!-- Jumlah Role Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-primary text-uppercase mb-1">Jumlah Role</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.role_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-shield fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumlah Pengguna Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-success text-uppercase mb-1">Jumlah Pengguna</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.user_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumlah Lokasi Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-info text-uppercase mb-1">Jumlah Lokasi</div>
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ counts.lokasi_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-map-pin fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Content Row -->
    <div class="row">
        <!-- Jumlah Kelas Aset Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-primary text-uppercase mb-1">Jumlah Kelas Aset</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.kelas_aset_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-object-group fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumlah Kode Projek Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-success text-uppercase mb-1">Jumlah Kode Projek</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.kode_projek_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-code fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumlah Divisi Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-info text-uppercase mb-1">Jumlah Divisi</div>
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ counts.divisi_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-users fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Content Row -->
    <div class="row">
        <!-- Jumlah Asset Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-primary text-uppercase mb-1">Jumlah Aset</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.asset_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-box fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumlah Asset Masuk Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-primary text-uppercase mb-1">Jumlah Aset Masuk</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.asset_masuk_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-arrow-down fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Jumlah Asset Keluar Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-primary text-uppercase mb-1">Jumlah Aset Keluar</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ counts.asset_keluar_count }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-arrow-up fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            counts: {
                role_count: null,
                user_count: null,
                lokasi_count: null,
                kelas_aset_count: null,
                kode_projek_count: null,
                divisi_count: null,
                asset_count: null,
                asset_masuk_count: null,
                asset_keluar_count: null,
            }
        };
    },
    mounted() {
        this.fetchCounts();
    },
    methods: {
        fetchCounts() {
            axios
                .get("http://127.0.0.1:8000/api/counts", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.counts = response.data;
                    console.log("Fetched all counts:", this.counts);
                })
                .catch((error) => {
                    console.error("Error fetching counts:", error);
                });
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop().split(";").shift();
                console.log("Cookie value:", cookieValue);
                return cookieValue;
            } else {
                console.error("Cookie not found");
                return null;
            }
        },
    }
};
</script>

<style scoped></style>
