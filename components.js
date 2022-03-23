
Vue.component("authheader", {
  props: {
    text: {
      type: String,
      default: "Authorization",
      required: false,
    },
  },
  computed: {
    auth: function () {
      return store.state.auth;
    },
    username: function () {
      return store.state.username;
    },
  },
  template: `
    <div>
    <slot></slot>
        <h3>{{text}}</h3>
        <p v-if="this.auth">{{username}} is authorized</p>
        <p v-else >You are not authorized!</p>
    </div>
`,
});

Vue.component("loginform", {
  props: {
    legend: {
      type: String,
      default: "Login",
    },
  },
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    auth: function () {
      return store.state.auth;
    },
  },
  methods: {
    login: function () {
      store.state.auth = true;
      store.state.username = this.username;
      this.username = "";
      this.password = "";
    },
    logout: function () {
      store.state.auth = false;
      store.state.username = "";
    },
  },

  template: `
  
  <div>
  
    <form v-if="!this.auth">
        <fieldset>
            <legend>{{ legend }}</legend>
            <label>Username: <input type="text" v-model="username"></label><br>
            <label>Password: <input type="password" v-model="password"></label><br>
            <button v-on:click.prevent="login()">Log In</button>
        </fieldset>
    </form> 
    <form v-else>
        <button v-on:click="logout()">Log Out</button>
    </form>
  </div>
  `,
});
