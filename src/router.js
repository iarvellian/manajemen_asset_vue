import { createRouter, createWebHistory } from "vue-router";

// Define the getCookie function
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Define your routes
const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/loginPage.vue"),
  },
  {
    path: "/",
    name: "sidenav",
    component: () => import("@/components/sidenavBar.vue"),
    children: [
      {
        path: "/",
        name: "dashboard",
        component: () => import('@/views/dashboard.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import('@/views/Profile/profilePage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/log",
        name: "log",
        component: () => import('@/views/Profile/logActivityPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      // Route role
      {
        path: "/role",
        name: "role.index",
        component: () => import('@/views/KelolaRole/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      // Route pegawai
      {
        path: "/pegawai",
        name: "pegawai.index",
        component: () => import('@/views/KelolaPegawai/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      {
        path: "/pegawai/create",
        name: "pegawai.create",
        component: () => import('@/views/KelolaPegawai/createPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      // Route lokasi
      {
        path: "/lokasi",
        name: "lokasi.index",
        component: () => import('@/views/KelolaLokasi/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      // Route kelas aset
      {
        path: "/kelasaset",
        name: "kelasaset.index",
        component: () => import('@/views/KelolaKelasAset/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      // Route kode projek
      {
        path: "/kodeprojek",
        name: "kodeprojek.index",
        component: () => import('@/views/KelolaKodeProjek/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      // Route divisi
      {
        path: "/divisi",
        name: "divisi.index",
        component: () => import('@/views/KelolaDivisi/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin'] } 
      },
      // Route aset
      {
        path: "/asset",
        name: "asset.index",
        component: () => import('@/views/Aset/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/asset/create",
        name: "asset.create",
        component: () => import('@/views/Aset/createPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/asset/edit/:id",
        name: "asset.edit",
        component: () => import('@/views/Aset/editPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/asset/print",
        name: "asset.print",
        component: () => import('@/views/Aset/printPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      // Route aset masuk
      {
        path: "/assetmasuk",
        name: "assetmasuk.index",
        component: () => import('@/views/AsetMasuk/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/assetmasuk/create",
        name: "assetmasuk.create",
        component: () => import('@/views/AsetMasuk/createPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/assetmasuk/print",
        name: "assetmasuk.print",
        component: () => import('@/views/AsetMasuk/printPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      // Route aset keluar
      {
        path: "/assetkeluar",
        name: "assetkeluar.index",
        component: () => import('@/views/AsetKeluar/indexPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
      {
        path: "/assetkeluar/create",
        name: "assetkeluar.create",
        component: () => import('@/views/AsetKeluar/createPage.vue'),
        meta: { requiresAuth: true, roles: ['superadmin', 'admin'] } 
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to check if the user is authenticated and has the correct role
router.beforeEach((to, from, next) => {
  const isAuthenticated = getCookie("token"); // Check if token exists in cookies
  const userRole = getCookie("role"); // Get the user role from cookies

  console.log("Token:", isAuthenticated);
  console.log("User Role:", userRole);

  if (to.matched.some(record => record.meta.requiresAuth)) { // Check if the route requires authentication
    if (!isAuthenticated) { // If not authenticated, redirect to login page
      console.log("Unauthorized access. Redirecting to login page.");
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else { // If authenticated, check for role authorization
      if (to.meta.roles && !to.meta.roles.includes(userRole)) {
        console.log("Access denied. Insufficient permissions.");
        next(false); // Prevent navigation
      } else {
        next(); // If role is authorized, proceed to the route
      }
    }
  } else {
    next(); // For routes that don't require authentication, proceed
  }
});

export default router;