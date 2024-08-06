<template>
    <!-- Page Wrapper -->
    <div v-if="isLoading" id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center">
                <div class="sidebar-brand-icon">
                    <img src="@/assets/aps.png" alt="Logo" style="width: 100%; max-width: 150px;">
                </div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li :class="{ active: $route.name === 'dashboard' }" class="nav-item">
                <router-link :to="{ name: 'dashboard' }" class="nav-link">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                </router-link>
            </li>

            <!-- Nav Item - Data Master Collapse Menu -->
            <li v-if="!isAdmin" class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Data Master</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <router-link :to="{ name: 'role.index' }" class="collapse-item">Kelola Role</router-link>
                        <router-link :to="{ name: 'pegawai.index' }" class="collapse-item">Kelola Pegawai</router-link>
                        <router-link :to="{ name: 'lokasi.index' }" class="collapse-item">Kelola Lokasi</router-link>
                        <router-link :to="{ name: 'kelasaset.index' }" class="collapse-item">Kelola Kelas
                            Aset</router-link>
                        <router-link :to="{ name: 'kodeprojek.index' }" class="collapse-item">Kelola Kode
                            Projek</router-link>
                        <router-link :to="{ name: 'divisi.index' }" class="collapse-item">Kelola Divisi</router-link>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Aset -->
            <li :class="{ active: $route.name === 'asset.index' }" class="nav-item">
                <router-link :to="{ name: 'asset.index' }" class="nav-link">
                    <i class="fas fa-fw fa-box"></i>
                    <span>Kelola Aset</span>
                </router-link>
            </li>

            <!-- Nav Item - Aset Masuk -->
            <li :class="{ active: $route.name === 'assetmasuk.index' }" class="nav-item">
                <router-link :to="{ name: 'assetmasuk.index' }" class="nav-link">
                    <i class="fas fa-fw fa-arrow-down"></i>
                    <span>Kelola Aset Masuk</span>
                </router-link>
            </li>

            <!-- Nav Item - Aset Keluar -->
            <li :class="{ active: $route.name === 'assetkeluar.index' }" class="nav-item">
                <router-link :to="{ name: 'assetkeluar.index' }" class="nav-link">
                    <i class="fas fa-fw fa-arrow-up"></i>
                    <span>Kelola Aset Keluar</span>
                </router-link>
            </li>
        </ul>
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
                <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                    <!-- Topbar Navbar -->
                    <ul class="navbar-nav ml-auto">

                        <div class="topbar-divider d-none d-sm-block"></div>

                        <!-- Nav Item - User Information -->
                        <li class="nav-item dropdown no-arrow">
                            <a class="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span class="mr-2 d-none d-lg-inline text-gray-600">{{ userName }}</span>
                                <img class="img-profile rounded-circle" src="../img/undraw_profile.svg">
                            </a>
                            <!-- Dropdown - User Information -->
                            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown">
                                <router-link :to="{ name: 'profile' }" class="dropdown-item">
                                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profil
                                </router-link>
                                <router-link :to="{ name: 'log' }" class="dropdown-item">
                                    <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Log Aktivitas
                                </router-link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" @click="confirmLogout()">
                                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </a>
                            </div>
                        </li>
                    </ul>

                </nav>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
                <!-- /.container-fluid -->

            </div>
            <!-- End of Main Content -->

            <!-- Footer -->
            <footer class="sticky-footer bg-white">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Angkasa Pura Support Balikpapan 2024</span>
                    </div>
                </div>
            </footer>
            <!-- End of Footer -->

        </div>
        <!-- End of Content Wrapper -->

    </div>
    <!-- End of Page Wrapper -->
    <span v-else>Loading...</span>

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
    setup() {
        const router = useRouter();
        var userName = ref('');
        const isAdmin = ref('');
        var isLoading = ref(false);

        // Function to fetch user information
        async function fetchUserData() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/profile', {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie('token')
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    userName.value = data.nama_pegawai;
                    nextTick(() => {
                        isLoading.value = true;
                        isAdmin.value = data.role.nama_role === 'admin';
                    });
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Function to logout
        async function logout() {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + getCookie('token') // Include the authentication token from cookies
                    }
                });
                if (response.ok) {
                    // Clear the authentication token from cookies
                    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    // Show success message and redirect to the login page
                    Swal.fire({
                        icon: 'success',
                        title: 'Logged out',
                        text: 'Anda telah berhasil logout.',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTimeout(() => {
                        router.push('/login');
                    }, 2000);
                } else {
                    console.error('Logout failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // Function to confirm logout
        function confirmLogout() {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                text: "Anda tidak dapat mengembalikan ini!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, logout!',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    logout();
                }
            });
        }

        // Function to get cookie value
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        // Call fetchUserData on component mount
        onMounted(fetchUserData);

        // Expose the logout function to the template
        return {
            userName,
            isAdmin,
            isLoading,
            confirmLogout
        };
    }
};
</script>



<style scoped></style>
