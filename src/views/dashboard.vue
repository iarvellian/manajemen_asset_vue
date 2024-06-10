<template>
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
        <button @click="" class="btn btn-primary btn-icon-split btn-sm">
            <span class="icon text-white-50">
                <i class="fas fa-download"></i>
            </span>
            <span class="text">Cetak Rekapitulasi</span>
        </button>
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ roleCount }}</div>
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ userCount }}</div>
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
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ lokasiCount }}</div>
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

    <!-- Content Row -->
    <div class="row">

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-primary text-uppercase mb-1">Jumlah Kelas Aset</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ kelasAsetCount }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-object-group fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-success text-uppercase mb-1">Jumlah Kode Projek</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ kodeProjetCount }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-code fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-4 col-md-6 mb-4">
            <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="font-weight-bold text-info text-uppercase mb-1">Jumlah Divisi</div>
                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{{ divisiCount }}</div>
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ assetCount }}</div>
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ assetMasukCount }}</div>
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
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{ assetKeluarCount }}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-arrow-up fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Content Row -->

    <!-- Content Row -->
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            roleCount: null,
            userCount: null,
            lokasiCount: null,
            kelasAsetCount: null,
            kodeProjetCount: null,
            divisiCount: null,
            assetCount: null,
            assetMasukCount: null,
            assetKeluarCount: null,
        };
    },
    mounted() {
        this.fetchCounts();
    },
    methods: {
        fetchCounts() {
            axios
                .get("http://127.0.0.1:8000/api/count_role/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.roleCount = response.data.count;
                    console.log("Fetched data role:", this.roleCount);
                })
                .catch((error) => {
                    console.error("Error fetching role count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_user/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.userCount = response.data.count;
                    console.log("Fetched data user:", this.userCount);
                })
                .catch((error) => {
                    console.error("Error fetching user count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_lokasi/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.lokasiCount = response.data.count;
                    console.log("Fetched data lokasi:", this.lokasiCount);
                })
                .catch((error) => {
                    console.error("Error fetching lokasi count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_kelas_aset/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.kelasAsetCount = response.data.count;
                    console.log("Fetched data kelas aset:", this.kelasAsetCount);
                })
                .catch((error) => {
                    console.error("Error fetching kelas aset count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_kode_projek/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.kodeProjetCount = response.data.count;
                    console.log("Fetched data kode projek:", this.kodeProjetCount);
                })
                .catch((error) => {
                    console.error("Error fetching kode projek count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_divisi/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.divisiCount = response.data.count;
                    console.log("Fetched data divisi:", this.divisiCount);
                })
                .catch((error) => {
                    console.error("Error fetching divisi count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_asset/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.assetCount = response.data.count;
                    console.log("Fetched data divisi:", this.assetCount);
                })
                .catch((error) => {
                    console.error("Error fetching asset count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_asset_masuk/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.assetMasukCount = response.data.count;
                    console.log("Fetched data divisi:", this.assetMasukCount);
                })
                .catch((error) => {
                    console.error("Error fetching asset masuk count:", error);
                });

            axios
                .get("http://127.0.0.1:8000/api/count_asset_keluar/", {
                    headers: {
                        Authorization: "Bearer " + this.getCookie("token"),
                    },
                })
                .then((response) => {
                    this.assetKeluarCount = response.data.count;
                    console.log("Fetched data divisi:", this.assetKeluarCount);
                })
                .catch((error) => {
                    console.error("Error fetching asset keluar count:", error);
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
