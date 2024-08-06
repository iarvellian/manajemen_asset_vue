<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Kode Projek</h1>

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
        <table class="table table-hover table-bordered" id="tableKodeProjek" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Kode Projek</th>
              <th class="text-center align-middle">Kode Projek</th>
              <th class="text-center align-middle" style="width: 205px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="kodeProjek in kodeProjeks.data" :key="kodeProjek.id_kode_projek">
              <td class="text-center">{{ kodeProjek.id_kode_projek }}</td>
              <td>{{ kodeProjek.nama_kode_projek }}</td>
              <td>
                <button @click="showEditModal(kodeProjek)" class="btn btn-warning btn-icon-split btn-sm mr-2"
                  data-toggle="modal" data-target="#modalCreateEdit">
                  <span class="icon text-white-50">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                  <span class="text">Ubah</span>
                </button>
                <button @click="deleteKodeProjek(kodeProjek.id_kode_projek)" class="btn btn-danger btn-icon-split btn-sm">
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

  <!-- Modal for Create/Edit Kode Projek -->
  <div class="modal fade" id="modalCreateEdit" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
    aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ isEdit ? 'Ubah Kode Projek' : 'Tambah Kode Projek' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="isEdit ? updateKodeProjek() : createKodeProjek()">
            <div class="form-group">
              <label for="inputKodeProjek" style="font-weight:bold;">Nama Kode Projek</label>
              <input class="form-control" v-model="form.nama_kode_projek" id="inputKodeProjek" type="text"
                placeholder="Masukkan Nama Kode Projek" />
              <!-- Validation error message -->
              <div v-if="errors.nama_kode_projek" class="text-danger">{{ errors.nama_kode_projek }}</div>
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
      kodeProjeks: [],
      dataTable: null,
      isModalVisible: false,
      isEdit: false,
      form: {
        nama_kode_projek: ""
      },
      kodeProjekId: null,
      errors: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/kode_projek/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.kodeProjeks = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.kodeProjeks);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    createKodeProjek() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan membuat kode projek baru.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://127.0.0.1:8000/api/kode_projek/", {
              nama_kode_projek: this.form.nama_kode_projek,
            }, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Kode Projek berhasil dibuat!',
              }).then(() => {
                this.hideModal();
                window.location.reload();
                this.fetchData();
              });
              console.log("Kode Projek created successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                this.errors = this.extractErrorMessages(error.response.data);
              } else {
                console.error("Error creating kode projek:", error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to create kode projek.',
                });
              }
            });
        }
      });
    },
    updateKodeProjek() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan mengubah data kode projek.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, ubah!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://127.0.0.1:8000/api/kode_projek/${this.kodeProjekId}`, {
              nama_kode_projek: this.form.nama_kode_projek,
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
              console.log("Kode Projek updated successfully:", response.data);
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
                console.error("Error updating kode projek:", error);
              }
            });
        }
      });
    },
    deleteKodeProjek(id_kode_projek) {
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
          .delete(`http://127.0.0.1:8000/api/kode_projek/${id_kode_projek}`, {
            headers: {
              Authorization: "Bearer " + this.getCookie("token"),
            },
          })
          .then((response) => {
            this.kodeProjeks.data = this.kodeProjeks.data.filter(kodeProjek => kodeProjek.id_kode_projek !== id_kode_projek);
            Swal.fire("Dihapus!", "Data Anda telah dihapus.", "success");
            console.log("Kode projek deleted successfully:", response.data);
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.error("Error deleting kode projek:", error);
          });
        }
      });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tableKodeProjek").DataTable({
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
      this.form.nama_kode_projek = "";
      this.errors = {};
    },
    showEditModal(kodeProjek) {
      this.isEdit = true;
      this.kodeProjekId = kodeProjek.id_kode_projek;
      this.form.nama_kode_projek = kodeProjek.nama_kode_projek;
    },
    hideModal() {
      this.form.nama_kode_projek = "";
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