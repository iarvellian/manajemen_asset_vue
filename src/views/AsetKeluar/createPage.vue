<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Tambah Aset Keluar</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <!-- Left Card -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Aset Tersedia</h5>
            </div>
            <div class="card-body">
              <!-- Scrollable table for the left card -->
              <div class="table-responsive">
                <table class="table table-hover table-bordered" id="tableAssetMasuk" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      <th class="text-center align-middle">Nama Aset</th>
                      <th class="text-center align-middle">Kode Aset</th>
                      <th class="text-center align-middle">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="assetmasuk in assetmasuks.data" :key="assetmasuk.id_transaksi_masuk">
                      <td>{{ assetmasuk.asset.nama_aset }}</td>
                      <td>{{ assetmasuk.asset.kode_aset }}</td>
                      <td class="text-center">
                        <input type="checkbox" v-model="assetmasuk.selected" @change="handleCheckboxChange(assetmasuk)">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <!-- Right Card -->
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Aset Terpilih</h5>
            </div>
            <div class="card-body">
              <!-- Scrollable table for the right card -->
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="text-center align-middle">Nama Aset</th>
                      <th class="text-center align-middle">Kode Aset</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- Loop through selectedAssets array and display selected assets -->
                    <tr v-for="asset in selectedAssets" :key="asset.id_transaksi_masuk">
                      <td>{{ asset.asset.nama_aset }}</td>
                      <td>{{ asset.asset.kode_aset }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-center">
                <button v-if="selectedAssets.length > 0 && !showBeritaAcaraForm" type="button"
                  @click="confirmCreateAssetKeluar" class="btn btn-primary btn-sm">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conditional Form for Berita Acara -->
      <div v-if="showBeritaAcaraForm" class="mt-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Form Berita Acara</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitBeritaAcara">
              <div class="form-group">
                <label for="pihakPertama" style="font-weight:bold;">Pihak Pertama</label>
                <input type="text" v-model="beritaAcara.pihakPertama" id="pihakPertama" class="form-control"
                  placeholder="Masukkan Nama Pihak Pertama">
                <div v-if="errors.pihak_pertama" class="text-danger">
                  {{ errors.pihak_pertama }}
                </div>
              </div>
              <div class="form-group">
                <label for="jabatanPertama" style="font-weight:bold;">Jabatan Pertama</label>
                <input type="text" v-model="beritaAcara.jabatanPertama" id="jabatanPertama" class="form-control"
                  placeholder="Masukkan Jabatan Pihak Pertama">
                <div v-if="errors.jabatan_pertama" class="text-danger">
                  {{ errors.jabatan_pertama }}
                </div>
              </div>
              <div class="form-group">
                <label for="pihakKedua" style="font-weight:bold;">Pihak Kedua</label>
                <input type="text" v-model="beritaAcara.pihakKedua" id="pihakKedua" class="form-control"
                  placeholder="Masukkan Nama Pihak Kedua">
                <div v-if="errors.pihak_kedua" class="text-danger">
                  {{ errors.pihak_kedua }}
                </div>
              </div>
              <div class="form-group">
                <label for="jabatanKedua" style="font-weight:bold;">Jabatan Kedua</label>
                <input type="text" v-model="beritaAcara.jabatanKedua" id="jabatanKedua" class="form-control"
                  placeholder="Masukkan Jabatan Pihak Kedua">
                <div v-if="errors.jabatan_kedua" class="text-danger">
                  {{ errors.jabatan_kedua }}
                </div>
              </div>
              <div class="form-group">
                <label for="keterangan" style="font-weight:bold;">Keterangan</label>
                <input type="text" v-model="beritaAcara.keterangan" id="keterangan" class="form-control"
                  placeholder="Masukkan: Dengan ini menerangkan bahwa Pihak Pertama telah melakukan pengambilan barang ... berupa:">
                <div v-if="errors.keterangan" class="text-danger">
                  {{ errors.keterangan }}
                </div>
              </div>
              <div class="form-group">
                <label style="font-weight:bold;">Aset Terpilih</label>
                <ul class="list-group">
                  <li class="list-group-item" v-for="asset in selectedAssets" :key="asset.id_transaksi_keluar">
                    {{ asset.asset.nama_aset }} - {{ asset.asset.kode_aset }}
                  </li>
                </ul>
              </div>
              <button type="submit" class="btn btn-success btn-sm">Simpan</button>
              <button type="button" @click="cancelBeritaAcara" class="btn btn-secondary btn-sm ml-2">Batal</button>
            </form>
          </div>
        </div>
      </div>

      <button type="button" @click="cancelCreation" class="btn btn-danger btn-sm ml-2">
        Kembali
      </button>
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
      assetmasuks: [],
      selectedAssets: [],
      showBeritaAcaraForm: false,
      beritaAcara: {
        pihakPertama: "",
        jabatanPertama: "",
        pihakKedua: "",
        jabatanKedua: "",
        keterangan: "",
      },
      dataTable: null,
      errors: {},
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/transaksi_asset_masuk/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.assetmasuks = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.assetmasuks);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    handleCheckboxChange(asset) {
      if (asset.selected) {
        this.selectedAssets.push(asset);
      } else {
        const index = this.selectedAssets.findIndex(selectedAsset => selectedAsset.id_asset === asset.id_asset);
        if (index !== -1) {
          this.selectedAssets.splice(index, 1);
        }
      }
    },
    confirmCreateAssetKeluar() {
      Swal.fire({
        title: "Apakah anda ingin membuat berita acara?",
        text: "Pilih Ya untuk membuat berita acara, pilih Tidak untuk hanya memindahkan aset.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Ya, buat berita acara",
        cancelButtonText: "Tidak, hanya pindahkan aset",
      }).then((result) => {
        if (result.isConfirmed) {
          this.showBeritaAcaraForm = true;
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.createAssetKeluar(false, true);
        }
      });
    },
    createAssetKeluar(createBeritaAcara, showSuccessSwal = true) {
      const postData = {
        selected_assets: this.selectedAssets.map((asset) => ({
          id_asset: asset.id_asset,
          id_user: asset.id_user,
        })),
      };

      axios
        .post("http://127.0.0.1:8000/api/transaksi_asset_keluar", postData, {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          if (createBeritaAcara) {
            this.showBeritaAcaraForm = true;
          } else if (showSuccessSwal) {
            Swal.fire({
              icon: "success",
              title: "Sukses!",
              text: "Aset berhasil dipindahkan!",
            }).then(() => {
              this.$router.push({ name: "assetkeluar.index" });
            });
          }
          console.log("Assets moved successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error moving assets:", error);
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to move assets.",
          });
        });
    },
    submitBeritaAcara() {
      Swal.fire({
        title: "Apakah Anda yakin?",
        text: "Apakah Anda yakin ingin membuat berita acara?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Ya, simpan!",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          const beritaAcaraData = {
            jenis: "keluar",
            pihak_pertama: this.beritaAcara.pihakPertama,
            pihak_kedua: this.beritaAcara.pihakKedua,
            jabatan_pertama: this.beritaAcara.jabatanPertama,
            jabatan_kedua: this.beritaAcara.jabatanKedua,
            keterangan: this.beritaAcara.keterangan,
            assets: this.selectedAssets.map((asset) => asset.id_asset),
          };

          axios
            .post("http://127.0.0.1:8000/api/berita_acara", beritaAcaraData, {
              headers: {
                'Authorization': "Bearer " + this.getCookie("token"),
                'Content-Type': 'multipart/form-data'
              },
              responseType: 'blob'
            })
            .then((response) => {
              const blob = new Blob([response.data], { type: 'application/pdf' });
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = 'berita_acara.pdf';
              link.click();

              this.createAssetKeluar(false, false);

              Swal.fire({
                icon: "success",
                title: "Sukses!",
                text: "Berita acara berhasil dibuat!",
              }).then(() => {
                this.$router.push({ name: "assetkeluar.index" });
              });
              console.log("Berita acara created successfully:", response.data);
            })
            .catch((error) => {
              if (error.response && error.response.status === 400) {
                error.response.data.text().then((text) => {
                  const json = JSON.parse(text);
                  this.errors = this.extractErrorMessages(json);
                  console.log("Validation errors:", json);
                });
              } else {
                console.error("Error creating berita acara:", error);
                Swal.fire({
                  icon: "error",
                  title: "Error!",
                  text: "Terjadi kesalahan saat menyimpan berita acara.",
                });
              }
            });
        }
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
    extractErrorMessages(errors) {
      const errorMessages = {};
      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          errorMessages[key] = errors[key][0];
        }
      }
      return errorMessages;
    },
    cancelBeritaAcara() {
      this.showBeritaAcaraForm = false;
      this.beritaAcara = {
        pihakPertama: "",
        jabatanPertama: "",
        pihakKedua: "",
        jabatanKedua: "",
      };
    },
    cancelCreation() {
      this.$router.push({ name: "assetkeluar.index" });
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
  },
};
</script>