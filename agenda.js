//IIFE - immediately inviked function expression


(function () {
  console.log("Running...");

  // UI - User Interface
  const ui = {
    fields: document.querySelectorAll("input"),
    button: document.querySelector(".pure-button"),
    table: document.querySelector(".pure-table"),
  };

  //Actions
  const validateFields = function (e) {
    //debugger;
    console.log("validating...", ui.fields);
    e.preventDefault();

    let errors = 0;
    let data = {};

    ui.fields.forEach(function (field) {
      console.log("campo:", field.value, field.value.length, field.value === "");

      if (field.value.length === 0) {
        console.log(field.id, "não preencheu - erro");
        field.classList.add("error");
        errors += 1;
      } else {
        //console.log(field.id, "preencheu - sucesso");
        field.classList.remove("error");
        data[field.id] = field.value.trim();
      }
    });
    console.log("=>", errors, data);

    if (errors === 0) {
      addContact(data);
    } else {
      document.querySelector(".error").focus();
    }
  };

  const addContact = function (contact) {
    console.log("JS", contact);
    console.log("JSON", JSON.stringify(contact));

    const endpoint = "http://localhost:3004/contacts";

    const config = {
      method: "POST",
      body: JSON.stringify(contact),
      headers: new Headers({ "Content-Type": "application/json" }),
    };
    //Promise API -> Fetch API garante q vai ter uma resposta

    fetch(endpoint, config)
      .then(getContacts)
      .catch(function() { console.log("deu ruim", arguments)});
  };

  const clearFields = function() {
    console.log("cleaning...");

    ui.fields.forEach(function(field) {
      field.value = "";

      ui.fields[0].focus();

    });

  }

  const getContacts = function () {
     console.log("getting...");

    const endpoint = "http://localhost:3004/contacts";
    const config = {
      method: "GET",
     // body: JSON.stringify(contact),
      headers: new Headers({ "Content-Type": "application/json" }),
    };

    fetch(endpoint, config)
    .then(function(response) { return response.json() })
      .then(function(contacts) { console.log( arguments[0].json() )})
      .catch(function() { console.log("deu ruim", arguments)})
    .catch(function() { console.log("deu ruim", arguments)});
    
    clearFields();
  };
    

  const getContactsSuccess = function(contacts) {

    contacts.forEach(function(contact) {
     return ` <tr>
      <td>${contact.id}</td>
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td><a href="#">Excluir</a></td>
  </tr>`;
  console.log(contacts)

    })
  };

  const genericError = function(objError) {
    console.error(objError);
  }
  const removeContact = function () {};

  const init = function () {
    console.log("mapping events...");
    //Mapping Events
    //Shortcut Event
    ui.button.onclick = validateFields;
  };

  init();
})();
