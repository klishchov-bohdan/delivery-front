<template>
  <div class="container" id="container">
    <div class="form-container sign-up-container">
      <form>
        <h1>Create Account</h1>
        <span>or use your email for registration</span>
        <input id="sign-up-name" type="text" placeholder="Name" />
        <input id="sign-up-email" type="email" placeholder="Email" />
        <input id="sign-up-password" type="password" placeholder="Password" />
        <div class="button" @click="signUp">Sign Up</div>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form>
        <h1>Sign in</h1>
        <span>or use your account</span>
        <input id="sign-in-email" type="email" placeholder="Email" />
        <input id="sign-in-password" type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <div class="button" @click="signIn">Sign In</div>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <div class="ghost button" id="signIn" @click="signInOverlay">Sign In</div>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <div class="ghost button" id="signUp" @click="signUpOverlay">Sign Up</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorization",
  methods: {
    signInOverlay() {
      this.container.classList.remove("right-panel-active")
    },
    signUpOverlay() {
      this.container.classList.add("right-panel-active")
    },
    signUp() {
      let name = document.getElementById('sign-up-name').value;
      let email = document.getElementById('sign-up-email').value;
      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let password = document.getElementById('sign-up-password').value;
      let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      if (!/^[a-z0-9_\\.]+$/.test(name)) {
        alert("Username should contains only letters and numbers")
        return
      }
      if (!emailRegex.test(String(email).toLowerCase())) {
        alert("Email should be looks like example123@mail.com")
        return;
      }
      if (!passwordRegex.test(password)) {
        alert(`
          Password is not valid:
            - should contain at least one digit
            - should contain at least one lower case
            - should contain at least one upper case
            - should contain at least 8 from the mentioned characters
        `)
        return;
      }

      let data = {
        name: name,
        email: email,
        password: password
      }
      fetch("http://localhost:8080/registration", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(res => {
        if(!res.ok) {
          return res.text().then(text => {
            alert(text)
            throw new Error(text)
          });
        }
        else {
          return res.json();
        }
      }).then(json => {
        localStorage.setItem("tokens", JSON.stringify(json))
        window.location.replace("http://localhost:8081")
      }).catch((error) => {
        console.log(error)
      });
    },
    signIn() {
      let email = document.getElementById('sign-in-email').value;
      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      let password = document.getElementById('sign-in-password').value;
      let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
      if (!emailRegex.test(String(email).toLowerCase())) {
        alert("Invalid email")
        return;
      }
      if (!passwordRegex.test(password)) {
        alert("Invalid password")
        return;
      }

      let data = {
        email: email,
        password: password
      }
      fetch("http://localhost:8080/login", {
        method: "POST",
        body: JSON.stringify(data)
      }).then(res => {
        if(!res.ok) {
          return res.text().then(text => {
            alert(text)
            throw new Error(text)
          });
        }
        else {
          return res.json();
        }
      }).then(json => {
        localStorage.setItem("tokens", JSON.stringify(json))
        window.location.replace("http://localhost:8081")
      }).catch((error) => {
        console.log(error)
      });
    },
  },
  data() {
    return {
      container: {},
    }
  },
  mounted() {
    this.container = document.getElementById('container');
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,800');

* {
  box-sizing: border-box;
}

body {
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
}

h1 {
  font-weight: bold;
  margin: 0;
}

h2 {
  text-align: center;
}

p {
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.button {
  border-radius: 20px;
  border: 1px solid #FF4B2B;
  background-color: #FF4B2B;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
}

.button:hover {
  cursor: pointer;
}

.button:active {
  transform: scale(0.95);
}

.button:focus {
  outline: none;
}

.button.ghost {
  background-color: transparent;
  border-color: #FFFFFF;
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
}

.container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25),
  0 10px 10px rgba(0,0,0,0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container{
  transform: translateX(-100%);
}

.overlay {
  background: #FF416C;
  background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
  background: linear-gradient(to right, #FF4B2B, #FF416C);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container a {
  border: 1px solid #DDDDDD;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>