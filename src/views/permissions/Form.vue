<template>
<h1 v-if="id == null">Carga de Nuevo Permiso</h1>
<h1 v-if="id != null">Edición de Permiso</h1>
  <form>
    <div class="form-group">
      <label for="inputName">Nombre</label>
      <input
        type="text"
        class="form-control"
        id="inputName"
        placeholder="Ingresá el nombre"
        v-model="name"
        required
      />
    </div>
    <div class="form-group">
      <label for="inputLastName">Apellido</label>
      <input
        type="text"
        class="form-control"
        id="inputLastName"
        placeholder="Ingresá el apellido"
        v-model="lastName"
        required
      />
    </div>
    <div class="form-group">
      <label for="selectPermission">Tipo de Permiso</label>

      <select v-model="selectedPermission" class="form-control" required>
        <option selected disabled>Elija un tipo de permiso</option>
        <option
          v-for="permissionType in permissionsTypes"
          v-bind:value="permissionType.id"
          :key="permissionType.id"
        >
          {{ permissionType.description }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="date">Fecha</label>
      <input type="date" v-model="date" class="form-control" required />
    </div>
    <div class="alert alert-danger" role="alert" v-if="errorMessage">
      {{ errorMessage }}
    </div>
    <router-link to="/List" class="routerLink"
      ><button class="btn btn-secondary">Cancelar</button></router-link
    >
    <button type="button" class="btn btn-success" @click="saveOrUpdate()">
      Guardar
    </button>
  </form>
</template>

<script>
import PermissionsApiHelpers from "../../helpers/PermissionsApiHelper";

export default {
  data() {
    return {
      id: this.$route.params.permissionId,
      name: null,
      lastName: null,
      date: null,
      permissionsTypes: [],
      selectedPermission: null,
      errorMessage: null,
    };
  },

  methods: {
    getPermission() {
      if (this.id != null) {
        PermissionsApiHelpers.getById(this.id)
          .then((response) => {
            this.name = response.data.name;
            this.lastName = response.data.lastName;
            this.date = response.data.date;
            this.selectedPermission = response.data.permissionType.id;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getPermissionsType() {
      PermissionsApiHelpers.getAllPermissionsTypes()
        .then((response) => {
          this.permissionsTypes = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    saveOrUpdate() {
      if (!this.isValid()) return;

      let permissionRequest = {
        id: this.id != null ? Number(this.id) : 0,
        name: this.name,
        lastName: this.lastName,
        date: this.date,
        permissionTypeId: this.selectedPermission,
      };

      if (this.$route.params.permissionId == null) {
        this.save(permissionRequest);
      } else {
        this.update(permissionRequest);
      }
    },

    save(permissionRequest) {
      PermissionsApiHelpers.create(permissionRequest)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    update(permissionRequest) {
      PermissionsApiHelpers.update(permissionRequest)
        .then(() => {
          this.$router.back();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    isValid() {
      this.errorMessage = null;
      if (
        this.name == null || this.name===""||
        this.lastName == null || this.lastName===""||
        this.date == null || isNaN(Date.parse(this.date))||
        this.selectedPermission == null
      ) {
        this.errorMessage = "Asegurese de completar todos los campos.";

        return false;
      }

      return true;
    },
  },

  mounted() {
    this.getPermission();
    this.getPermissionsType();
  },
};
</script>

<style scoped>
form {
  margin: 5em 20em;
}

.form-group {
  margin-top: 2em;
  margin-bottom: 2em;
}

button {
  float: right;
  margin: 10px;
}
h1{
    text-align: center;
}
</style>