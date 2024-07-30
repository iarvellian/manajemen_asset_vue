<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Menu Aset</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-header text-right">
      <router-link :to="{ name: 'asset.print' }">
        <button class="btn btn-dark btn-icon-split btn-sm">
          <span class="icon text-white-50">
            <i class="fas fa-print"></i>
          </span>
          <span class="text">Cetak Berita Acara Rusak</span>
        </button>
      </router-link>
      <button @click="exportAsset()" class="btn btn-secondary btn-icon-split btn-sm ml-2">
        <span class="icon text-white-50">
          <i class="fas fa-file-excel"></i>
        </span>
        <span class="text">Export Data</span>
      </button>
      <router-link :to="{ name: 'asset.import' }" class="ml-2">
        <button class="btn btn-primary btn-icon-split btn-sm">
          <span class="icon text-white-50">
            <i class="fas fa-file-excel"></i>
          </span>
          <span class="text">Import Data</span>
        </button>
      </router-link>
      <router-link :to="{ name: 'asset.create' }" class="ml-2">
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
        <table class="table table-hover table-bordered" id="tableAsset" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th class="text-center align-middle" style="width: 100px;">ID Aset</th>
              <th class="text-center align-middle">Thn Perolehan</th>
              <th class="text-center align-middle">Lokasi</th>
              <th class="text-center align-middle">Nama Aset</th>
              <th class="text-center align-middle">Jml Fisik</th>
              <th class="text-center align-middle">Kondisi</th>
              <th class="text-center align-middle">Serial Number</th>
              <th class="text-center align-middle" style="width: 310px;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asset in assets.data" :key="asset.id_asset">
              <td class="text-center">{{ asset.id_asset }}</td>
              <td>{{ asset.thn_perolehan }}</td>
              <td>{{ asset.lokasi.nama_lokasi }}</td>
              <td>{{ asset.nama_aset }}</td>
              <td>{{ asset.jumlah_fisik }}</td>
              <td class="text-center">
                <span v-if="asset.kondisi.toLowerCase() === 'baik'" class="badge badge-success rounded-pill">{{
        asset.kondisi }}</span>
                <span v-else-if="asset.kondisi.toLowerCase() === 'rusak'" class="badge badge-danger rounded-pill">{{
        asset.kondisi }}</span>
              </td>
              <td>{{ asset.serial_number }}</td>
              <td>
                <button @click="showAssetDetails(asset.id_asset)" class="btn btn-info btn-icon-split btn-sm mr-2">
                  <span class="icon text-white-50">
                    <i class="fas fa-eye"></i>
                  </span>
                  <span class="text">Detail</span>
                </button>
                <router-link :to="{ name: 'asset.edit', params: { id: asset.id_asset } }">
                  <button class="btn btn-warning btn-icon-split btn-sm mr-2">
                    <span class="icon text-white-50">
                      <i class="fas fa-pencil-alt"></i>
                    </span>
                    <span class="text">Ubah</span>
                  </button>
                </router-link>
                <button @click="deleteAsset(asset.id_asset)" class="btn btn-danger btn-icon-split btn-sm mr-2">
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

  <!-- Aset Details Modal -->
  <div class="modal fade" id="assetDetailsModal" tabindex="-1" role="dialog" aria-labelledby="assetDetailsModalLabel"
    aria-hidden="true" data-backdrop="static">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="assetDetailsModalLabel">Aset Detail</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <p><strong>ID Aset:</strong> {{ selectedAsset.data.id_asset }}</p>
              <p><strong>Thn Perolehan:</strong> {{ selectedAsset.data.thn_perolehan }}</p>
              <p v-if="selectedAsset.data.lokasi"><strong>Lokasi:</strong> {{ selectedAsset.data.lokasi.nama_lokasi }}</p>
              <p><strong>Cost Center:</strong> {{ selectedAsset.data.cost_center }}</p>
              <p><strong>UE:</strong> {{ selectedAsset.data.ue }}</p>
              <p><strong>Kode Aset:</strong> {{ selectedAsset.data.kode_aset }}</p>
              <p><strong>Nama Aset:</strong> {{ selectedAsset.data.nama_aset }}</p>
              <p v-if="selectedAsset.data.kelas_aset"><strong>Kelas Aset:</strong> {{ selectedAsset.data.kelas_aset.nama_kelas_aset }}</p>
              <p><strong>Jumlah SAP:</strong> {{ selectedAsset.data.jumlah_sap }}</p>
              <p><strong>Jumlah Fisik:</strong> {{ selectedAsset.data.jumlah_fisik }}</p>
            </div>
            <div class="col-md-6">
              <p><strong>Kondisi:</strong> {{ selectedAsset.data.kondisi }}</p>
              <p v-if="selectedAsset.data.kode_projek"><strong>Kode Projek Baru:</strong> {{ selectedAsset.data.kode_projek.nama_kode_projek }}</p>
              <p v-if="selectedAsset.data.divisi"><strong>Divisi:</strong> {{ selectedAsset.data.divisi.nama_divisi }}</p>
              <p><strong>PIC Aset:</strong> {{ selectedAsset.data.pic_aset }}</p>
              <p><strong>User/PIC Projek:</strong> {{ selectedAsset.data.pic_project }}</p>
              <p><strong>Serial Number:</strong> {{ selectedAsset.data.serial_number }}</p>
              <p><strong>No. Rangka Kendaraan:</strong> {{ selectedAsset.data.no_rangka_kendaraan }}</p>
              <p><strong>No. Mesin Kendaraan:</strong> {{ selectedAsset.data.no_mesin_kendaraan }}</p>
              <p><strong>Plat No. Kendaraan:</strong> {{ selectedAsset.data.no_plat_kendaraan }}</p>
              <p><strong>Luar Kota?</strong> {{ selectedAsset.data.is_luar_kota === 1 ? 'Iya' : 'Tidak' }}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Tutup</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: function () {
    return {
      assets: [],
      dataTable: null,
      selectedAsset: { data: {} }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("https://wopcefo.sga.dom.my.id/api/asset/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.assets = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.assets);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    deleteAsset(id_asset) {
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
            .delete(`https://wopcefo.sga.dom.my.id/api/asset/${id_asset}`, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
            })
            .then((response) => {
              this.assets.data = this.assets.data.filter(asset => asset.id_asset !== id_asset);
              Swal.fire("Dihapus!", "Data Anda telah dihapus.", "success");
              console.log("Aset deleted successfully:", response.data);
            })
            .catch((error) => {
              Swal.fire("Error!", "Something went wrong.", "error");
              console.error("Error deleting asset:", error);
            });
        }
      });
    },
    showAssetDetails(id_asset) {
      axios
        .get(`https://wopcefo.sga.dom.my.id/api/asset/${id_asset}`, {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.selectedAsset = response.data;
          console.log("Data modal: ", this.selectedAsset);
          $('#assetDetailsModal').modal({
                backdrop: 'static',
                keyboard: false,
            });
        })
        .catch((error) => {
          console.error("Error fetching asset details:", error);
        });
    },
    exportAsset() {
      Swal.fire({
        title: 'Apakah anda yakin?',
        text: "Anda akan mengekspor data aset",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, ekspor!',
        cancelButtonText: 'Batal'
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .get(`https://wopcefo.sga.dom.my.id/api/asset_export`, {
              headers: {
                Authorization: "Bearer " + this.getCookie("token"),
              },
              responseType: 'blob' // important to handle the file as a blob
            })
            .then((response) => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'asset_data.xlsx');
              document.body.appendChild(link);
              link.click();
              Swal.fire(
                'Terekspor!',
                'Data anda telah berhasil diekspor.',
                'success'
              );
            })
            .catch((error) => {
              Swal.fire('Error!', 'Something went wrong during the export.', 'error');
              console.error("Error exporting asset:", error);
            });
        }
      });
    },
    initDataTable() {
      this.$nextTick(() => {
        if (this.dataTable !== null) {
          this.dataTable.destroy();
        }
        this.dataTable = $("#tableAsset").DataTable({
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