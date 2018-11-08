const createForm = document.getElementById('create');
const updateForm = document.getElementById('update');
const deleteForm = document.getElementById('delete');

const createSubmit = document.querySelector('#create .button');
const updateSubmit = document.querySelector('#update .button');
const deleteSubmit = document.querySelector('#delete .button');

createSubmit.addEventListener('click', async function(e) {
    const form = createForm;
    let formData = [...form.elements].map((input, index) => {
        return encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value);
    });
    formData = formData.join('&');
    console.log(formData);
    const response = await fetch('/products/create', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    const success = await response.json();
    const displayResponse = document.createElement('div');
    displayResponse.className = 'green';
    displayResponse.innerHTML = success.message;
    form.appendChild(displayResponse);
    setTimeout(function() {
        const response = document.querySelector('.green');
        response.parentNode.removeChild(response);
    }, 3000);
});

deleteSubmit.addEventListener('click', async function(e) {
    const id = document.querySelector('#delete input').value;
    console.log(id);
    const response = await fetch(`/products/${id}/delete`, {
        method: 'DELETE'
    });
    const success = await response.json();
    console.log(success);
    const displayResponse = document.createElement('div');
    displayResponse.className = 'green';
    displayResponse.innerHTML = success.message;
    deleteForm.appendChild(displayResponse);
    setTimeout(function() {
        const response = document.querySelector('.green');
        response.parentNode.removeChild(response);
    }, 3000);
});

updateSubmit.addEventListener('click', async function(e) {
    const id = document.querySelector('#update input').value;
    console.log(id);
    const form = updateForm;
    let formData = [...form.elements].map((input, index) => {
        return encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value);
    });
    formData = formData.join('&');
    console.log(formData);
    const response = await fetch(`/products/${id}/update`, {
        method: 'PUT',
        body: formData,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    const success = await response.json();
    console.log(success);
    const displayResponse = document.createElement('div');
    displayResponse.className = 'green';
    displayResponse.innerHTML = success.message;
    updateForm.appendChild(displayResponse);
    setTimeout(function() {
        const response = document.querySelector('.green');
        response.parentNode.removeChild(response);
    }, 3000);
});
