let nameRegexp = /^[a-zA-Z]{4,16}$/;
let mailRegexp = /^[a-zA-Z0-9\-\.]{1,}\@[a-zA-Z]+\.[a-zA-Z]{1,}$/;
let passRegexp = /^[a-zA-Z0-9\-_\.]{4,16}$/;
let testLogin, testEmail, testPass;
let tableHeader = `<tr><th>#</th><th>Login</th><th>Password</th><th>Email addres</th><th>Edit</th><th>Delete</th></tr>`;
let index = -1;
let arrObj = [];
let obj = {};
let userIndex;
let getID = id => document.getElementById(id);

getID('loginInput').addEventListener('input', function () {
    testLogin = nameRegexp.test(this.value);
    if (testLogin) {
        this.classList.add('valid');
        this.classList.remove('noValid');
    } else {
        this.classList.remove('valid');
        this.classList.add('noValid');
    }
});
getID('passwordInput').addEventListener('input', function () {
    testPass = passRegexp.test(this.value);
    if (testPass) {
        this.classList.add('valid');
        this.classList.remove('noValid');
    } else {
        this.classList.remove('valid');
        this.classList.add('noValid');
    }
});
getID('emailInput').addEventListener('input', function () {
    testEmail = mailRegexp.test(this.value);
    if (testEmail) {
        this.classList.add('valid');
        this.classList.remove('noValid');
    } else {
        this.classList.remove('valid');
        this.classList.add('noValid');
    }
});

getID('addUserButton').addEventListener('click', addUser);


function addUser() {
    event.preventDefault();

    if (testLogin && testEmail && testPass) {
        index += 1;
        obj = {
            id: `pn${index}`,
            login: getID('loginInput').value,
            password: getID('passwordInput').value,
            email: getID('emailInput').value
        };
        arrObj.push(obj);
        clearInput();
        render();
    } else {
        alert('Заповніть правильно поля!!!')
    }
};

function render() {
    let out = "";
    for (let i = 0; i < arrObj.length; i++) {
        out += `<tr id="${arrObj[i].id}"><td>${i+1}</td><td>${arrObj[i].login}</td><td>${arrObj[i].password}</td><td>${arrObj[i].email}</td><td><input type="button" class="buttonEdit" id="buttonEdit${i}" onclick="editUser()"  value="Edit"></td><td><input type="button" class="buttonDelete"  id="buttonDelete${i}" onclick="deleteUser()" value="Delete"></td></tr>`;
    };
    getID('table1').innerHTML = tableHeader + out;
};

function clearInput() {
    getID('loginInput').value = '';
    getID('passwordInput').value = '';
    getID('emailInput').value = '';
    getID('loginInput').classList.remove('valid');
    getID('passwordInput').classList.remove('valid');
    getID('emailInput').classList.remove('valid');
    testEmail = false;
    testLogin = false;
    testPass = false;
};

function deleteUser(e) {
    index = (event.target.id).match(/\d+/);
    arrObj.splice(index, 1);
    index -= 1;
    render();
};

function editUser(e) {
    index = (event.target.id).match(/\d+/);
    getID('loginInput').value = arrObj[index].login;
    getID('passwordInput').value = arrObj[index].password;
    getID('emailInput').value = arrObj[index].email;
    userIndex = index;
    getID('editUserButton').classList.remove('hide');
    getID('addUserButton').classList.add('hide');
};
getID('editUserButton').addEventListener('click', saveEditUser);

function saveEditUser() {
    arrObj[userIndex] = {
        login: getID('loginInput').value,
        password: getID('passwordInput').value,
        email: getID('emailInput').value
    };
    render();
    clearInput();
    getID('editUserButton').classList.add('hide');
    getID('addUserButton').classList.remove('hide');
};