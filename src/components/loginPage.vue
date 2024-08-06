<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <div class="row justify-content-center align-items-center vh-100">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <div class="row justify-content-center">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="bg-login-pict mb-4"></div>
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Selamat Datang!</h1>
                    </div>
                    <form class="user" @submit.prevent="login">
                      <div class="form-group">
                        <input type="text" class="form-control form-control-user" id="exampleInputUsername"
                          v-model="username" placeholder="Username">
                      </div>
                      <div class="form-group">
                        <input type="password" class="form-control form-control-user" id="exampleInputPassword"
                          v-model="password" placeholder="Password">
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input type="checkbox" class="custom-control-input" id="customCheck">
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Access Token:', data.access_token);
          console.log('User Role:', data.role);
          this.setCookie('token', data.access_token, 7); // Token expires in 7 days
          this.setCookie('role', data.role, 7); // Role expires in 7 days
          Swal.fire({
            icon: 'success',
            title: 'Login Berhasil',
            text: 'Anda telah berhasil login!',
            timer: 2000,
            showConfirmButton: false
          }).then(() => {
            this.$router.push('/');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: 'Username atau password salah. Silakan coba lagi.'
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while logging in. Please try again later.'
        });
        console.error('Error:', error);
      }
    },
    setCookie(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
  }
};
</script>

<style scoped>
/* Component-specific styles */
.vh-100 {
  min-height: 100vh;
}

.bg-login-pict {
  background-image: url('@/assets/aps.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 150px; 
}

@media (max-width: 991px) {
  .bg-login-pict {
    display: none;
  }
}
</style>
