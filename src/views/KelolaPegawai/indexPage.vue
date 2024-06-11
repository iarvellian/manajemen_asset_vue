<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Pegawai</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-header text-right">
      <router-link :to="{ name: 'pegawai.create' }">
        <button class="btn btn-success btn-icon-split btn-sm">
          <span class="icon text-white-50">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text">Tambah Pegawai</span>
        </button>
      </router-link>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover table-bordered" id="tablePegawai" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Pegawai</th>
              <th class="text-center align-middle">Jenis Role</th>
              <th class="text-center align-middle">Nama Pegawai</th>
              <th class="text-center align-middle">Jabatan Pegawai</th>
              <th class="text-center align-middle" style="width: 100px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pegawai in users.data" :key="pegawai.id_user">
              <td class="text-center">{{ pegawai.id }}</td>
              <td>{{ pegawai.role.nama_role }}</td>
              <td>{{ pegawai.nama_pegawai }}</td>
              <td>{{ pegawai.jabatan }}</td>
              <td>
                <button @click="deletePegawai(pegawai.id)" class="btn btn-danger btn-icon-split btn-sm">
                  <span class="icon text-white-50">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                  <span class="text">Hapus</span>
                </button>
              </td>
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
      users: [],
      dataTable: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://wopcefo.sga.dom.my.id/api/users/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.users = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.users);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    deletePegawai(id_user) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`https://wopcefo.sga.dom.my.id/api/users/${id_user}`, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              this.users.data = this.users.data.filter(user => user.id_user !== id_user);
              Swal.fire("Dihapus!", "Data Pegawai telah dihapus.", "success").then(() => {
                window.location.reload();
              });
              console.log("Pegawai deleted successfully:", response.data);
            })
            .catch((error) => {
              Swal.fire("Error!", "Something went wrong.", "error");
              console.error("Error deleting user:", error);
            });
        }
      });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tablePegawai").DataTable({
          autoWidth: false,
          columnDefs: [
            { targets: 0, width: '100px' },
            { targets: 4, width: '100px' }
          ]
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