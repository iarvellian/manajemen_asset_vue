<template>
  <!-- Page Heading -->
  <h1 class="h3 mb-2 text-gray-800">Log Aktivitas</h1>

  <!-- DataTales Example -->
  <div class="card shadow mb-4">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-bordered" id="tableLog" width="100%" cellspacing="0">
          <thead>
            <tr>
              <th>ID Log</th>
              <th>Nama Tabel</th>
              <th>Aksi</th>
              <th>Data Lama</th>
              <th>Data Baru</th>
              <th>Nama User</th>
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="logActivity in logActivities.data" :key="logActivity.id">
              <td>{{ logActivity.id }}</td>
              <td>{{ logActivity.nama_tabel }}</td>
              <td>{{ logActivity.aksi }} data</td>
              <td>
                <ul v-if="logActivity.data_lama">
                  <li v-for="(value, key) in logActivity.data_lama" :key="key">
                    <strong>{{ key }}:</strong> {{ value }}
                  </li>
                </ul>
                <span v-else>No data available</span>
              </td>
              <td>
                <ul v-if="logActivity.data_baru">
                  <li v-for="(value, key) in logActivity.data_baru" :key="key">
                    <strong>{{ key }}:</strong> {{ value }}
                  </li>
                </ul>
                <span v-else>No data available</span>
              </td>
              <td>{{ logActivity.user.nama_pegawai }}</td>
              <td>{{ logActivity.created_at }}</td>
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

export default {
  data: function () {
    return {
      logActivities: [],
      dataTable: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get("http://127.0.0.1:8000/api/log_aktivitas/", {
          headers: {
            Authorization: "Bearer " + this.getCookie("token"),
          },
        })
        .then((response) => {
          this.logActivities = response.data;
          this.initDataTable();
          console.log("Fetched data:", this.logActivities);
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
        this.dataTable = $("#tableLog").DataTable({
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