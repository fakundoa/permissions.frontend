<template>
  <div class="container">
    <h1>Lista de Permisos</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Permiso</th>
          <th scope="col">Fecha</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in permissions" :key="permission.id">
          <td scope="row">{{ permission.id }}</td>
          <td>{{ permission.name }}</td>
          <td>{{ permission.lastName }}</td>
          <td>{{ permission.permissionType.description }}</td>
          <td>{{ permission.date }}</td>
          <td>
            <button
              type="button"
              class="btn btn-warning"
              @click="editPermission(permission.id)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="
                showModal = true;
                permissionSelected = permission.id;
              "
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/Form" class="routerLink"
      ><button class="btn btn-primary">Añadir</button></router-link
    >
  </div>
  <div>
    <vue-final-modal
      v-model="showModal"
      classes="modal-container"
      content-class="modal-content"
    >
      <span class="modal__title">Corfirma eliminación de registro</span>
      <div class="modal__content">¿Eliminar registro?</div>
      <div class="modal__action">
        <button class="btn btn-danger" @click="confirmDeletion()">
          Eliminar
        </button>
        <button class="btn btn-secondary" @click="showModal = false">
          Cancelar
        </button>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import PermissionsApiHelpers from "../../helpers/PermissionsApiHelper";

export default {
  data() {
    return {
      showModal: false,
      permissionSelected: null,
      permissions: [],
    };
  },

  methods: {
    save() {
      console.log(this.name);
    },

    getPermissions() {
      PermissionsApiHelpers.getAll()
        .then((response) => {
          this.permissions = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    confirmDeletion() {
      this.deletePermission(this.permissionSelected);
    },

    deletePermission(id) {
      console.log("apreto delete");
      PermissionsApiHelpers.delete(id)
        .then(() => {
          this.showModal = false;

          this.getPermissions();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editPermission(id) {
      this.$router.push({ name: "Form", params: { permissionId: id } });
    },
  },

  mounted() {
    this.getPermissions();
  },
};
</script>

<style scoped>
.routerLink {
  text-decoration: none;
}

table{
    padding:4em 5em
}
button {
  margin: 10px;
}

h1 {
  text-align: center;
}
::v-deep .modal-container {
  justify-content: center;
  align-items: center;
}
::v-deep .modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 90%;
  margin: 0 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  background: #fff;
}
.modal__title {
  margin: 0 2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.modal__content {
  flex-grow: 1;
  overflow-y: auto;
}
.modal__action {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 1rem 0 0;
}
</style>