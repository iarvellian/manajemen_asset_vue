<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Kelas Aset</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-header text-right">
      <button @click="showCreateModal" class="btn btn-success btn-icon-split btn-sm" data-toggle="modal"
        data-target="#modalCreateEdit">
        <span class="icon text-white-50">
          <i class="fas fa-plus"></i>
        </span>
        <span class="text">Tambah Data</span>
      </button>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover table-bordered" id="tableKelasAset" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Kelas Aset</th>
              <th class="text-center align-middle">Kelas Aset</th>
              <th class="text-center align-middle" style="width: 205px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kelasAset in kelasAsets.data" :key="kelasAset.id_kelas_aset">
              <td class="text-center">{{ kelasAset.id_kelas_aset }}</td>
              <td>{{ kelasAset.nama_kelas_aset }}</td>
              <td>
                <button @click="showEditModal(kelasAset)" class="btn btn-warning btn-icon-split btn-sm mr-2"
                  data-toggle="modal" data-target="#modalCreateEdit">
                  <span class="icon text-white-50">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                  <span class="text">Ubah</span>
                </button>
                <button @click="deleteKelasAset(kelasAset.id_kelas_aset)" class="btn btn-danger btn-icon-split btn-sm">
                  <span class="icon text-white-50">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                  <span class="text">Delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Modal for Create/Edit Kelas Aset -->
  <div class="modal fade" id="modalCreateEdit" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
    aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ isEdit ? 'Ubah Kelas Aset' : 'Tambah Kelas Aset' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="isEdit ? updateKelasAset() : createKelasAset()">
            <div class="form-group">
              <label for="inputNamaKelasAset" style="font-weight:bold;">Nama Kelas Aset</label>
              <input class="form-control" v-model="form.nama_kelas_aset" id="inputNamaKelasAset" type="text"
                placeholder="Masukkan Nama Kelas Aset" />
              <!-- Validation error message -->
              <div v-if="errors.nama_kelas_aset" class="text-danger">{{ errors.nama_kelas_aset }}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Kembali</button>
              <button type="submit" class="btn btn-primary">{{ isEdit ? 'Simpan' : 'Simpan' }}</button>
            </div>
          </form>
        </div>
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
      kelasAsets: [],
      dataTable: null,
      isModalVisible: false,
      isEdit: false,
      form: {
        nama_kelas_aset: ""
      },
      kelasAsetId: null,
      errors: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://wopcefo.sga.dom.my.id/api/kelas_aset/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.kelasAsets = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.kelasAsets);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    createKelasAset() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan membuat kelas aset baru.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("https://wopcefo.sga.dom.my.id/api/kelas_aset/", {
              nama_kelas_aset: this.form.nama_kelas_aset,
            }, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Kelas Aset berhasil dibuat!',
              }).then(() => {
                this.hideModal();
                window.location.reload();
                this.fetchData();
              });
              console.log("Kelas Aset created successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                this.errors = this.extractErrorMessages(error.response.data);
              } else {
                console.error("Error creating kelas aset:", error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to create kelas aset.',
                });
              }
            });
        }
      });
    },
    updateKelasAset() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan mengubah data kelas aset.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, ubah!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`https://wopcefo.sga.dom.my.id/api/kelas_aset/${this.kelasAsetId}`, {
              nama_kelas_aset: this.form.nama_kelas_aset,
            }, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Diperbarui!',
                text: 'Data Anda telah diperbarui.',
              }).then(() => {
                this.hideModal();
                this.fetchData();
              });
              console.log("Kelas Aset updated successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                this.errors = this.extractErrorMessages(error.response.data);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Something went wrong.',
                });
                console.error("Error updating kelas aset:", error);
              }
            });
        }
      });
    },
    deleteKelasAset(id_kelas_aset) {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Anda tidak dapat mengembalikan ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
          .delete(`https://wopcefo.sga.dom.my.id/api/kelas_aset/${id_kelas_aset}`, {
            headers: {
              Authorization: "Bearer " + this.getCookie("token"),
            },
          })
          .then((response) => {
            this.kelasAsets.data = this.kelasAsets.data.filter(kelasAset => kelasAset.id_kelas_aset !== id_kelas_aset);
            Swal.fire("Dihapus!", "Data Anda telah dihapus.", "success");
            console.log("Kelas aset deleted successfully:", response.data);
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error("Error deleting kelas Aset:", error);
          });
        }
      });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tableKelasAset").DataTable({
          autoWidth: false,
          columnDefs: [
            { targets: 0, width: '100px' },
            { targets: 2, width: '205px' }
          ]
        });
      });
    },
    showCreateModal() {
      this.isEdit = false;
      this.form.nama_kelas_aset = "";
      this.errors = {};
    },
    showEditModal(kelasAset) {
      this.isEdit = true;
      this.kelasAsetId = kelasAset.id_kelas_aset;
      this.form.nama_kelas_aset = kelasAset.nama_kelas_aset;
    },
    hideModal() {
      this.form.nama_kelas_aset = "";
      this.errors = {};
      $('#modalCreateEdit').modal('hide');
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