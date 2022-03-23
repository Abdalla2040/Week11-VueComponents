var store = new Vuex.Store({
  state: {
    student: [],
    auth: false,
    username: "",
  },
  getters: {
    deansList: function (state) {
      return state.student.filter(function (stu) {
        return stu.gpa > 3.5;
      });
    },
    deansListCount: function (state, getters) {
      return getters.deansList.length;
    },
  },
  mutations: {
    setNewStudent: function (state, payload) {
      state.student.push(Object.assign({}, payload));
    },
    clearData: function (state) {
      state.student = [];
      state.student.registeration = [];
      state.student.newStudent = [];
      state.student.newStudent.registerations = [];
      state.student.registeration.bookFormat = [];
    },
  },
  actions: {
    clearData: function (context) {
      context.commit("clearData");
    },
  },
});

var app = new Vue({
  el: "#app",
  store: store,
  data: {
    pageTitle: "New Student Information",
    sectionTitle: "Student Personal Record",
    profilePhoto: "<img src='pic3.jpg' alt='profile-photo'>",
    firstName: "",
    lastName: "",
    techID: "",
    graduationYear: "",
    gpa: "",
    gpaColor: "",
    newStudent: {
      firstName: "",
      lastName: "",
      graduationYear: "",
      gpa: "",
      registrations: [],
      valid: false,
      invalid: true,
    },
    registration: {
      courseNumber: "",
      attendanceType: "",
      numOfCredits: "",
      bookFormat: [],
      valid: false,
      invalid: true,
    },

    updated: "",
    visibleOrNot: "",
  },
  methods: {
    hideInput: function () {
      if (!this.visibleOrNot) this.visibleOrNot = true;
      else this.visibleOrNot = false;
    },
    setUpdated: function () {
      const today = new Date();
      this.updated = today;
      return this.updated;
    },
    setNewStudent: function () {
      store.commit("setNewStudent", this.newStudent);

      this.newStudent.firstName = "";
      this.newStudent.lastName = "";
      this.newStudent.graduationYear = "";
      this.newStudent.gpa = "";
    },
    clearAllData: function () {
      store.dispatch("clearData");
    },
    register: function () {
      this.newStudent.registrations.push(Object.assign({}, this.registration));

      this.registration.courseNumber = "";
      this.registration.numOfCredits = "";
      this.registration.attendanceType = "";
      this.registration.bookFormat = [];
    },
  },
  computed: {
    student: function () {
      return store.state.student;
    },
    deansListStudents: function () {
      console.log(store.getters.deansList);
      return store.getters.deansList;
    },
    deansListStudentsCount: function () {
      console.log(store.getters.deansListCount);
      return store.getters.deansListCount;
    },

    fullName: function (lastName, firstName) {
      return lastName + ", " + firstName;
    },
    setGPAColor: function () {
      this.gpa = this.student.gpa;
      if (this.gpa >= 3) {
        this.gpaColor = "green";
      }
      if (this.gpa >= 2) {
        this.gpaColor = "yellow";
      }
      if (this.gpa >= 1) {
        this.gpaColor = "orange";
      } else {
        this.gpaColor = "red";
      }
      return this.gpaColor;
    },
  },
  watch: {
    student: {
      deep: true,
      handler() {
        this.setUpdated();
      },
    },
    newStudent: {
      handler: function () {
        if (
          !(
            this.newStudent.firstName != "" &&
            this.newStudent.lastName != "" &&
            this.newStudent.graduationYear != "" &&
            this.newStudent.gpa != ""
          )
        ) {
          this.newStudent.valid = false;
          this.newStudent.invalid = true;
        } else {
          this.newStudent.valid = true;
          this.newStudent.invalid = false;
        }
      },
      deep: true,
    },
    registration: {
      handler: function () {
        if (
          !(
            this.registration.courseNumber != "" &&
            this.registration.numOfCredits != ""
          )
        ) {
          this.registration.invalid = true;
          this.registration.valid = false;
        } else {
          this.registration.valid = true;
          this.registration.invalid = false;
        }
      },
      deep: true,
    },
  },
  template: "#Divtemplate",
});
