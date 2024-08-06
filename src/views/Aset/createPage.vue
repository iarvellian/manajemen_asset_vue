<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Tambah Asset</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-body">
      <form @submit.prevent="createAsset">
        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <label for="inputThnPerolehan" style="font-weight:bold;">Tahun Perolehan</label>
              <input class="form-control" v-model="thnPerolehan" id="inputThnPerolehan" type="number"
                placeholder="Masukkan Tahun Perolehan" />
              <!-- Validation error message -->
              <div v-if="errors.thn_perolehan" class="text-danger">{{ errors.thn_perolehan }}</div>
            </div>
            <div class="mb-3">
              <label for="inputLokasi" style="font-weight:bold;">Lokasi</label>
              <select class="form-control" v-model="lokasi" id="inputLokasi">
                <option disabled selected value="">Pilih lokasi</option>
                <option v-for="location in lokasis.data" :key="location.id_lokasi" :value="location.id_lokasi">{{
        location.nama_lokasi }}</option>
              </select>
              <!-- Validation error message -->
              <div v-if="errors.id_lokasi" class="text-danger">{{ errors.id_lokasi }}</div>
            </div>
            <div class="mb-3">
              <label for="inputCostCenter" style="font-weight:bold;">Cost Center</label>
              <input class="form-control" id="inputCostCenter" type="text" value="BPN" readonly />
            </div>
            <div class="mb-3">
              <label for="inputUE" style="font-weight:bold;">UE</label>
              <input class="form-control" v-model="ue" id="inputUE" type="number" placeholder="Masukkan UE" />
              <!-- Validation error message -->
              <div v-if="errors.ue" class="text-danger">{{ errors.ue }}</div>
            </div>
            <div class="mb-3">
              <label for="inputKodeAset" style="font-weight:bold;">Kode Aset</label>
              <input class="form-control" v-model="kodeAset" id="inputKodeAset" type="text"
                placeholder="Masukkan Kode Aset" />
              <!-- Validation error message -->
              <div v-if="errors.kode_aset" class="text-danger">
                {{ errors.kode_aset }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputNamaAset" style="font-weight:bold;">Nama Aset</label>
              <input class="form-control" v-model="namaAset" id="inputNamaAset" type="text"
                placeholder="Masukkan Nama Aset" />
              <!-- Validation error message -->
              <div v-if="errors.nama_aset" class="text-danger">
                {{ errors.nama_aset }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputKelasAset" style="font-weight:bold;">Kelas Aset</label>
              <select class="form-control" v-model="kelasAset" id="inputKelasAset">
                <option disabled selected value="">Pilih Kelas Aset</option>
                <option v-for="classAsset in kelasAssets.data" :key="classAsset.id_kelas_aset"
                  :value="classAsset.id_kelas_aset">
                  {{ classAsset.nama_kelas_aset }}
                </option>
              </select>
              <!-- Validation error message -->
              <div v-if="errors.id_kelas_aset" class="text-danger">
                {{ errors.id_kelas_aset }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputJmlSAP" style="font-weight:bold;">Jumlah SAP</label>
              <input class="form-control" v-model="jmlSAP" id="inputJmlSAP" type="number"
                placeholder="Masukkan Jumlah SAP" />
              <!-- Validation error message -->
              <div v-if="errors.jumlah_sap" class="text-danger">
                {{ errors.jumlah_sap }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputJmlFisik" style="font-weight:bold;">Jumlah Fisik</label>
              <input class="form-control" v-model="jmlFisik" id="inputJmlFisik" type="number"
                placeholder="Masukkan Jumlah Fisik" />
              <!-- Validation error message -->
              <div v-if="errors.jumlah_fisik" class="text-danger">
                {{ errors.jumlah_fisik }}
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <label for="inputKondisi" style="font-weight:bold;">Kondisi</label>
              <select class="form-control" v-model="kondisi" id="inputKondisi">
                <option disabled selected value="">Pilih Kondisi</option>
                <option value="Baik">Baik</option>
                <option value="Rusak">Rusak</option>
              </select>
              <!-- Validation error message -->
              <div v-if="errors.kondisi" class="text-danger">
                {{ errors.kondisi }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputKodeProjek" style="font-weight:bold;">Kode Projek Baru</label>
              <select class="form-control" v-model="kodeProjek" id="inputKodeProjek">
                <option disabled selected value="">Pilih Kode Projek</option>
                <option v-for="projectCode in kodeProjeks.data" :key="projectCode.id_kode_projek"
                  :value="projectCode.id_kode_projek">
                  {{ projectCode.nama_kode_projek }}
                </option>
              </select>
              <!-- Validation error message -->
              <div v-if="errors.id_kode_projek" class="text-danger">
                {{ errors.id_kode_projek }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputCostCenter" style="font-weight:bold;">PIC Aset</label>
              <input class="form-control" id="inputCostCenter" type="text" value="M Syahrul" readonly />
            </div>
            <div class="mb-3">
              <label for="inputSerialNumber" style="font-weight:bold;">Serial Number</label>
              <input class="form-control" v-model="serialNumber" id="inputSerialNumber" type="text"
                placeholder="Masukkan Serial Number" />
              <!-- Validation error message -->
              <div v-if="errors.serial_number" class="text-danger">
                {{ errors.serial_number }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputNoRangkaKendaraan" style="font-weight:bold;">No. Rangka Kendaraan</label>
              <input class="form-control" v-model="noRangkaKendaraan" id="inputNoRangkaKendaraan" type="text"
                placeholder="Masukkan No Rangka Kendaraan" />
              <!-- Validation error message -->
              <div v-if="errors.no_rangka_kendaraan" class="text-danger">
                {{ errors.no_rangka_kendaraan }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputNoMesinKendaraan" style="font-weight:bold;">No. Mesin Kendaraan</label>
              <input class="form-control" v-model="noMesinKendaraan" id="inputNoMesinKendaraan" type="text"
                placeholder="Masukkan No Mesin Kendaraan" />
              <!-- Validation error message -->
              <div v-if="errors.no_mesin_kendaraan" class="text-danger">
                {{ errors.no_mesin_kendaraan }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputPlat" style="font-weight:bold;">Plat No. Kendaraan</label>
              <input class="form-control" v-model="platNoKendaraan" id="inputPlat" type="text"
                placeholder="Masukkan No Plat Kendaraan" />
              <!-- Validation error message -->
              <div v-if="errors.no_plat_kendaraan" class="text-danger">
                {{ errors.no_plat_kendaraan }}
              </div>
            </div>
            <div class="mb-3">
              <label for="inputDivisi" style="font-weight:bold;">Divisi</label>
              <select class="form-control" v-model="divisi" id="inputDivisi">
                <option disabled selected value="">Pilih Divisi</option>
                <option v-for="division in divisis.data" :key="division.id_divisi" :value="division.id_divisi">
                  {{ division.nama_divisi }}
                </option>
              </select>
              <!-- Validation error message -->
              <div v-if="errors.id_divisi" class="text-danger">
                {{ errors.id_divisi }}
              </div>
            </div>
            <div class="mb-3">
              <label style="font-weight:bold;">Apakah dari Luar Kota?</label><br>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="luarKota" id="luarKotaYes" value="true">
                <label class="form-check-label" for="luarKotaYes">Ya</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="luarKota" id="luarKotaNo" value="false">
                <label class="form-check-label" for="luarKotaNo">Tidak</label>
              </div>
              <!-- Validation error message -->
              <div v-if="errors.is_luar_kota" class="text-danger">
                {{ errors.is_luar_kota }}
              </div>
            </div>
          </div>
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
      thnPerolehan: "",
      lokasi: "",
      ue: "",
      kodeAset: "",
      namaAset: "",
      kelasAset: "",
      jmlSAP: "",
      jmlFisik: "",
      kondisi: "",
      kodeProjek: "",
      serialNumber: "",
      noRangkaKendaraan: "",
      noMesinKendaraan: "",
      platNoKendaraan: "",
      divisi: "",
      luarKota: "",
      lokasis: [],
      kodeProjeks: [],
      kelasAssets: [],
      divisis: [],
      errors: {},
    };
  },
  mounted() {
    this.fetchDatas();
  },
  methods: {
    fetchDatas() {
      axios
        .get("http://127.0.0.1:8000/api/lokasi/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.lokasis = response.data;
          console.log("Fetched data:", this.lokasis);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get("http://127.0.0.1:8000/api/kode_projek/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.kodeProjeks = response.data;
          console.log("Fetched data:", this.kodeProjeks);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get("http://127.0.0.1:8000/api/kelas_aset/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.kelasAssets = response.data;
          console.log("Fetched data:", this.kelasAssets);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get("http://127.0.0.1:8000/api/divisi/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.divisis = response.data;
          console.log("Fetched data:", this.divisis);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    createAsset() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda akan membuat aset baru.',
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: 'Ya, simpan!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post(
              "http://127.0.0.1:8000/api/asset/",
              {
                id_divisi: this.idDivisi,
                id_lokasi: this.lokasi,
                id_kelas_aset: this.kelasAset,
                id_kode_projek: this.kodeProjek,
                thn_perolehan: this.thnPerolehan,
                ue: this.ue,
                kode_aset: this.kodeAset,
                nama_aset: this.namaAset,
                jumlah_sap: this.jmlSAP,
                jumlah_fisik: this.jmlFisik,
                kondisi: this.kondisi,
                serial_number: this.serialNumber,
                no_rangka_kendaraan: this.noRangkaKendaraan,
                no_mesin_kendaraan: this.noMesinKendaraan,
                no_plat_kendaraan: this.platNoKendaraan,
                id_divisi: this.divisi,
                is_luar_kota: this.luarKota === 'true',
              },
              {
                headers: {
                  Authorization: "Bearer " + this.getCookie("token"),
                },
              }
            )
            .then((response) => {
              Swal.fire({
                icon: "success",
                title: 'Sukses!',
                text: 'Aset berhasil dibuat!',
              }).then(() => {
                this.$router.push({ name: "asset.index" });
              });
              console.log("Asset created successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                this.errors = this.extractErrorMessages(error.response.data);
              } else {
                console.error("Error creating asset:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: "Failed to create asset.",
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
      this.$router.push({ name: "asset.index" });
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>
