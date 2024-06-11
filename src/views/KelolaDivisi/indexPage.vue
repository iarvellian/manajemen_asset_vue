<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Divisi</h1>

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
        <table class="table table-hover table-bordered" id="tableDivisi" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Divisi</th>
              <th class="text-center align-middle">Nama Divisi</th>
              <th class="text-center align-middle" style="width: 205px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="divisi in divisis.data" :key="divisi.id_divisi">
              <td class="text-center">{{ divisi.id_divisi }}</td>
              <td>{{ divisi.nama_divisi }}</td>
              <td>
                <button @click="showEditModal(divisi)" class="btn btn-warning btn-icon-split btn-sm mr-2"
                  data-toggle="modal" data-target="#modalCreateEdit">
                  <span class="icon text-white-50">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                  <span class="text">Ubah</span>
                </button>
                <button @click="deleteRole(divisi.id_divisi)" class="btn btn-danger btn-icon-split btn-sm">
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

  <!-- Modal for Create/Edit Divisi -->
  <div class="modal fade" id="modalCreateEdit" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
    aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ isEdit ? 'Ubah Divisi' : 'Tambah Divisi' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="isEdit ? updateDivisi() : createDivisi()">
            <div class="form-group">
              <label for="inputNamaDivisi" style="font-weight:bold;">Nama Divisi</label>
              <input class="form-control" v-model="form.nama_divisi" id="inputNamaDivisi" type="text"
                placeholder="Masukkan Nama Divisi" />
              <!-- Validation error message -->
              <div v-if="errors.nama_divisi" class="text-danger">{{ errors.nama_divisi }}</div>
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
      divisis: [],
      dataTable: null,
      isModalVisible: false,
      isEdit: false,
      form: {
        nama_divisi: ""
      },
      divisiId: null,
      errors: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://wopcefo.sga.dom.my.id/api/divisi/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.divisis = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.divisis);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    createDivisi() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan membuat divisi baru.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("https://wopcefo.sga.dom.my.id/api/divisi/", {
              nama_divisi: this.form.nama_divisi,
            }, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Divisi berhasil dibuat!',
              }).then(() => {
                this.hideModal();
                window.location.reload();
                this.fetchData();
              });
              console.log("Divisi created successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                this.errors = this.extractErrorMessages(error.response.data);
              } else {
                console.error("Error creating divisi:", error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to create divisi.',
                });
              }
            });
        }
      });
    },
    updateDivisi() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan mengubah data divisi.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, ubah!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`https://wopcefo.sga.dom.my.id/api/divisi/${this.divisiId}`, {
              nama_divisi: this.form.nama_divisi,
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
              console.log("Divisi updated successfully:", response.data);
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
                console.error("Error updating divisi:", error);
              }
            });
        }
      });
    },
    deleteRole(id_divisi) {
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
            .delete(`https://wopcefo.sga.dom.my.id/api/divisi/${id_divisi}`, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              this.divisis.data = this.divisis.data.filter(divisi => divisi.id_divisi !== id_divisi);
              Swal.fire("Dihapus!", "Data Anda telah dihapus.", "success");
              console.log("Divisi deleted successfully:", response.data);
            })
            .catch((error) => {
              Swal.fire("Error!", "Something went wrong.", "error");
              console.error("Error deleting divisi:", error);
            });
        }
      });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tableDivisi").DataTable({
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
      this.form.nama_divisi = "";
      this.errors = {};
    },
    showEditModal(divisi) {
      this.isEdit = true;
      this.divisiId = divisi.id_divisi;
      this.form.nama_divisi = divisi.nama_divisi;
    },
    hideModal() {
      this.form.nama_divisi = "";
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