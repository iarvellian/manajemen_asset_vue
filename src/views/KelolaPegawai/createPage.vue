<template>
    <!-- Page Heading -->
    <h1 class="h3 mb-2 text-gray-800">Tambah Pegawai</h1>
  
    <!-- DataTales Example -->
    <div class="card shadow mb-4">
      <div class="card-body">
        <form @submit.prevent="createPegawai">
          <div class="mb-3">
            <label for="inputNamaPegawai" style="font-weight:bold;">Nama Pegawai</label>
            <input class="form-control" v-model="namaPegawai" id="inputNamaPegawai" type="text" placeholder="Masukkan Nama Pegawai" />
            <!-- Validation error message -->
            <div v-if="errors.nama_pegawai" class="text-danger">{{ errors.nama_pegawai }}</div>
          </div>
          <div class="mb-3">
            <label for="inputJabatan" style="font-weight:bold;">Jabatan</label>
            <input class="form-control" v-model="jabatan" id="inputJabatan" type="text" placeholder="Masukkan Jabatan" />
            <!-- Validation error message -->
            <div v-if="errors.jabatan" class="text-danger">{{ errors.jabatan }}</div>
          </div>
          <div class="mb-3">
            <label for="inputUsername" style="font-weight:bold;">Username</label>
            <input class="form-control" v-model="username" id="inputUsername" type="text" placeholder="Masukkan Username" />
            <!-- Validation error message -->
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>
          <div class="mb-3">
            <label for="inputPassword" style="font-weight:bold;">Password</label>
            <input class="form-control" v-model="password" id="inputPassword" type="text" placeholder="Masukkan Password" />
            <!-- Validation error message -->
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>
          <div class="mb-3">
            <label for="inputKonfirmasiPassword" style="font-weight:bold;">Konfirmasi Password</label>
            <input class="form-control" v-model="passwordConfirmation" id="inputKonfirmasiPassword" type="text" placeholder="Tulis Ulang Password" />
            <!-- Validation error message -->
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>
          <div class="mb-3">
              <label for="inputRole" style="font-weight:bold;">Role</label>
              <select class="form-control" v-model="jenisRole" id="inputRole">
                <option disabled selected value="">Pilih role</option>
                <option v-for="role in roles.data" :key="role.id_role" :value="role.id_role">{{ role.nama_role }}</option>
              </select>
              <!-- Validation error message -->
              <div v-if="errors.id_role" class="text-danger">{{ errors.id_role }}</div>
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
    data: function () {
      return {
        namaPegawai: "",
        jabatan: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        jenisRole: "",
        roles: [],
        errors: {},
      };
    },
    mounted() {
      this.fetchRoles();
    },
    methods: {
      fetchRoles() {
        axios
        .get("https://wopcefo.sga.dom.my.id/api/role/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.roles = response.data;
          console.log("Fetched data:", this.roles);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      },
      createPegawai() {
        Swal.fire({
          title: 'Apakah Anda yakin?',
          text: 'Anda akan membuat pegawai baru.',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, simpan!',
          cancelButtonText: 'Batal',
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .post("https://wopcefo.sga.dom.my.id/api/register/", {
                nama_pegawai: this.namaPegawai,
                jabatan: this.jabatan,
                username: this.username,
                password: this.password,
                password_confirmation: this.passwordConfirmation,
                id_role: this.jenisRole,
              }, {
                headers: {
                  Authorization: "Bearer " + this.getCookie("token"),
                },
              })
              .then((response) => {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Pegawai berhasil dibuat!',
                }).then(() => {
                  this.$router.push({ name: 'pegawai.index' });
                });
                console.log("User created successfully:", response.data);
              })
              .catch((error) => {
                if (error.response && error.response.status === 400) {
                  this.errors = this.extractErrorMessages(error.response.data);
                } else {
                  console.error("Error creating user:", error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'Failed to create user.',
                  });
                }
              });
          }
        });
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
        this.$router.push({ name: 'pegawai.index' });
      },
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      },
    },
  };
  </script>
  