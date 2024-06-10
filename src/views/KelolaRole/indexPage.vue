<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Role</h1>

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
        <table class="table table-hover table-bordered" id="tableRole" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Role</th>
              <th class="text-center align-middle">Jenis Role</th>
              <th class="text-center align-middle" style="width: 205px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles.data" :key="role.id_role">
              <td class="text-center">{{ role.id_role }}</td>
              <td>{{ role.nama_role }}</td>
              <td>
                <button @click="showEditModal(role)" class="btn btn-warning btn-icon-split btn-sm mr-2"
                  data-toggle="modal" data-target="#modalCreateEdit">
                  <span class="icon text-white-50">
                    <i class="fas fa-pencil-alt"></i>
                  </span>
                  <span class="text">Ubah</span>
                </button>
                <button @click="deleteRole(role.id_role)" class="btn btn-danger btn-icon-split btn-sm">
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

  <!-- Modal for Create/Edit Role -->
  <div class="modal fade" id="modalCreateEdit" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
    aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">{{ isEdit ? 'Ubah Role' : 'Tambah Role' }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="isEdit ? updateRole() : createRole()">
            <div class="form-group">
              <label for="inputJenisRole" style="font-weight:bold;">Jenis Role</label>
              <input class="form-control" v-model="form.nama_role" id="inputJenisRole" type="text"
                placeholder="Masukkan Jenis Role" />
              <!-- Validation error message -->
              <div v-if="errors.nama_role" class="text-danger">{{ errors.nama_role }}</div>
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
      roles: [],
      dataTable: null,
      isModalVisible: false,
      isEdit: false,
      form: {
        nama_role: ""
      },
      roleId: null,
      errors: {}
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/role/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.roles = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.roles);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    createRole() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan membuat role baru.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://127.0.0.1:8000/api/role/", {
              nama_role: this.form.nama_role,
            }, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'Sukses!',
                text: 'Role berhasil dibuat!',
              }).then(() => {
                this.hideModal();
                window.location.reload();
                this.fetchData();
              });
              console.log("Role created successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                this.errors = this.extractErrorMessages(error.response.data);
              } else {
                console.error("Error creating role:", error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error!',
                  text: 'Failed to create role.',
                });
              }
            });
        }
      });
    },
    updateRole() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan mengubah data role.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, ubah!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(`http://127.0.0.1:8000/api/role/${this.roleId}`, {
              nama_role: this.form.nama_role,
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
              console.log("Role updated successfully:", response.data);
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
                console.error("Error updating role:", error);
              }
            });
        }
      });
    },
    deleteRole(id_role) {
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
            .delete(`http://127.0.0.1:8000/api/role/${id_role}`, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              this.roles.data = this.roles.data.filter(role => role.id_role !== id_role);
              Swal.fire("Dihapus!", "Data Anda telah dihapus.", "success");
              console.log("Role deleted successfully:", response.data);
            })
            .catch((error) => {
              Swal.fire("Error!", "Something went wrong.", "error");
              console.error("Error deleting role:", error);
            });
        }
      });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tableRole").DataTable({
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
      this.form.nama_role = "";
      this.errors = {};
    },
    showEditModal(role) {
      this.isEdit = true;
      this.roleId = role.id_role;
      this.form.nama_role = role.nama_role;
    },
    hideModal() {
      this.form.nama_role = "";
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
