<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Aset Keluar</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-header text-right">
      <router-link :to="{ name: 'assetkeluar.create' }">
        <button class="btn btn-success btn-icon-split btn-sm">
          <span class="icon text-white-50">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text">Tambah Data</span>
        </button>
      </router-link>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover table-bordered" id="tableAssetMasuk" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Aset Keluar</th>
              <th class="text-center align-middle">Nama Aset</th>
              <th class="text-center align-middle">Tanggal Keluar</th>
              <th class="text-center align-middle">Nama Pegawai</th>
              <th class="text-center align-middle">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="assetkeluar in assetkeluars.data" :key="assetkeluar.id_transaksi_keluar">
              <td class="text-center">{{ assetkeluar.id_transaksi_keluar }}</td>
              <td>{{ assetkeluar.asset.nama_aset }}</td>
              <td>{{ assetkeluar.tgl_keluar}}</td>
              <td>{{ assetkeluar.user.nama_pegawai }}</td>
              <td>{{ assetkeluar.keterangan }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- /.container-fluid -->

</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: function () {
    return {
      assetkeluars: [],
      dataTable: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/transaksi_asset_keluar/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.assetkeluars = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.assetkeluars);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable !== null) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tableAssetMasuk").DataTable({
          autoWidth: false,
        });
      });
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>