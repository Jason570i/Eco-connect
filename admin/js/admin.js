import { guardian, logOut } from "../../global/js/global.js";

const urlBase = "http://localhost:3000";
const contenedorUsuarios = document.querySelector("#usuarios");
const contenedorEcoalertas = document.querySelector("#ecoalertas .row");
const contenedorSubmissions = document.querySelector("#submissions");
const contenedorNewsletter = document.querySelector("#newsletter");
const adminUser = document.querySelector("#username");
const logout = document.querySelector("#logout");

document.addEventListener("DOMContentLoaded", function (event) {
  getUsers();
  getSubmissions();
  getNewsletter();
  getEcoAlerts();
  getGuardian();
});

function getGuardian() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const isAuthenticatedListed = isAuthenticated.split(",");

  adminUser.textContent = isAuthenticatedListed[0];

  logout.addEventListener("click", () => {
    logOut();
  });
}

async function getUsers() {
  const response = await fetch(`${urlBase}/users`);
  const data = await response.json();

  data.forEach((user) => {
    contenedorUsuarios.innerHTML += `

    <div class="card d-flex flex-row align-items-center" style="width: 100%">
      <div class="imgUs col-md-4 d-flex justify-content-center">
          <img src="https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png"
              width="50px" class="" alt="...">
      </div>
      <div class="col-md-4 d-flex justify-content-center">
          <div class="card-body">
              <h4 class="card-title"><i class="lni lni-user"></i> ${user.name}</h4>
              <h5 class="card-text email"><i class="lni lni-envelope"></i> ${user.email}</h5>
          </div>
      </div>
      <div class="actions col-md-4 d-flex justify-content-center">
          <div class="button">
              <button type="button" id="btnEditar" data-id="${user.id}"
                  class="btn btn-editar" data-bs-toggle="modal" data-bs-target="#editModal">Editar</button>
              <button type="button" id="btnEliminar" data-id="${user.id}"
                  class="btn btn-eliminar">Eliminar</button>
          </div>
      </div>
    </div>
    `;
  });

  const updateButtonsUsers = contenedorUsuarios.querySelectorAll(".btn-editar");
  updateButtonsUsers.forEach((button) => {
    button.addEventListener("click", () => {
      renderModal(button.getAttribute("data-id"));
    });
  });

  const deleteButtonsUsers =
    contenedorUsuarios.querySelectorAll(".btn-eliminar");

  deleteButtonsUsers.forEach((button) => {
    button.addEventListener("click", () => {
      deleteUser(button.getAttribute("data-id"));
    });
  });
}

async function getEcoAlerts() {
  const response = await fetch(`${urlBase}/ecoalertas`);
  const data = await response.json();

  data.forEach((alert) => {
    contenedorEcoalertas.innerHTML += `

    <div class="card p-5" style="width: 33rem;">
        <img class="card-img-top" src="${alert.photo}" alt="Card image cap">
        <div class="card-body">
          <h2 class="card-title name"><i class="lni lni-user"></i> ${alert.name}</h2>
          <p class="card-text tel"><i class="lni lni-phone"></i> ${alert.phone}</p>
          <p class="card-text email"><i class="lni lni-envelope"></i> ${alert.email}</p>
          <p class="card-text city"><i class="lni lni-phone"></i> ${alert.city}</p>
          <p class="card-text message"><i class="lni lni-text-align-justify"></i> ${alert.message}...</p>
        </div>
    </div>
    `;
  });
}

async function getSubmissions() {
  const response = await fetch(`${urlBase}/contacts`);
  const data = await response.json();

  data.forEach((submit) => {
    contenedorSubmissions.innerHTML += `

    <div class="card p-5" style="width: 33rem;">
        <img src="https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png" width="50px" class="" alt="...">
        <div class="card-body">
          <h2 class="card-title"><i class="lni lni-user"></i> ${submit.nombre}</h2>
          <p class="card-text tel"><i class="lni lni-phone"></i> ${submit.telefono}</p>
          <p class="card-text email"><i class="lni lni-envelope"></i> ${submit.email}</p>
          <p class="card-text email"><i class="lni lni-envelope"></i> ${submit.mensaje}</p>
        </div>
    </div>
    `;
  });
}

async function getNewsletter() {
  const response = await fetch(`${urlBase}/boletin`);
  const data = await response.json();

  data.forEach((newsletter) => {
    contenedorNewsletter.innerHTML += `

    <div class="card d-flex flex-row align-items-center" style="width: 100%">
      <div class="col-md-4 d-flex justify-content-center">
          <div class="card-body">
              <h5 class="card-text email"><i class="lni lni-envelope"></i> ${newsletter.email}</h5>
          </div>
      </div>
      <div class="actions col-md-4 d-flex justify-content-center">
          <div class="button">
              <button type="button" id="btnEliminarNews" data-id="${newsletter.id}"
                  class="btn btn-eliminar">Eliminar</button>
          </div>
      </div>
    </div>
    `;
  });

  const deleteButtonNewsLetter =
    contenedorNewsletter.querySelectorAll(".btn-eliminar");
  deleteButtonNewsLetter.forEach((button) => {
    button.addEventListener("click", () => {
      deleteNewsletter(button.getAttribute("data-id"));
    });
  });
}

async function deleteNewsletter(id) {
  try {
    const URL = `http://localhost:3000/boletin/${id}`;
    await fetch(URL, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser(id) {
  try {
    const URL = `http://localhost:3000/users/${id}`;
    await fetch(URL, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(error);
  }
}

async function renderModal(id) {
  const editModal = document.querySelector("#editModal .modal-body");

  try {
    const URL = `http://localhost:3000/users?id=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    data.forEach((element) => {
      editModal.innerHTML = `<form>
      <div class="mb-3">
        <label for="editName" class="form-label">Nombre</label>
        <input type="text" class="form-control" id="editName" value="${element.name}" required>
      </div>
      <div class="mb-3">
        <label for="editEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="editEmail" aria-describedby="emailHelp" value="${element.email}" required>
      </div>
      <div class="mb-3">
        <label for="editPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="editPassword" required>
      </div>
      <button type="submit" class="btn btn-success">Editar</button>
    </form>`;
    });

    
  } catch (error) {
    console.log(error);
  }

  const editForm = editModal.querySelector("form");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validatePassword(editForm.querySelector("#editPassword").value)) {
      showError("Invalid password");
      
    }else{
      const userEdited = {
        name: editForm.querySelector("#editName").value,
        email: editForm.querySelector("#editEmail").value,
        password: editForm.querySelector("#editPassword").value,
      };
      updateUser(id,userEdited);
    }
    
  });
    
}

async function updateUser(id,userEdited) {
  try {
    const URL = `http://localhost:3000/users/${id}`;
    await fetch(URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userEdited)
    });
  } catch (error) {
    console.log(error);
  }
}

function validatePassword(password) {
  /**
  Minimo 8 caracteres,
  Maximo 15,
  Al menos una letra mayúscula,
  Al menos una letra minucula,
  Al menos un dígito,
  No espacios en blanco,
  Al menos 1 caracter especial.
  */
  const regexp_password =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    
  return (
    regexp_password.test(password)
  );
}

function showError(msg) {
  Swal.fire({
    title: "Error!",
    text: msg,
    icon: "error",
    showConfirmButton: false,
    timer: 2000,
    toast: "true",
  });
}
