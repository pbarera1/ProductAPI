const createForm = document.getElementById('create');
const updateForm = document.getElementById('update');
const deleteForm = document.getElementById('delete');

const createSubmit = document.querySelector('#create .button');
const updateSubmit = document.querySelector('#update .button');
const deleteSubmit = document.querySelector('#delete .button');

createSubmit.addEventListener('click', async function(e) {
    e.preventDefault();
    const response = await fetch('/products/create', {
        method: 'POST',
        body: FormData(createForm),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    const success = await response.json();
    displayReponseStatus(success, createForm);
});

deleteSubmit.addEventListener('click', async function(e) {
    e.preventDefault();
    const id = document.querySelector('#delete input').value;
    const response = await fetch(`/products/${id}/delete`, {
        method: 'DELETE'
    });
    const success = await response.json();
    displayReponseStatus(success, deleteForm);
});

updateSubmit.addEventListener('click', async function(e) {
    e.preventDefault();
    const id = document.querySelector('#update input').value;
    const response = await fetch(`/products/${id}/update`, {
        method: 'PUT',
        body: FormData(updateForm),
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    });
    const success = await response.json();
    displayReponseStatus(success, updateForm);
});

const displayReponseStatus = (success, elemToAppendAfter) => {
    const displayResponse = document.createElement('div');
    displayResponse.className = 'green';
    displayResponse.innerHTML = success.message;
    elemToAppendAfter.appendChild(displayResponse);
    setTimeout(function() {
        const response = document.querySelector('.green');
        response.parentNode.removeChild(response);
    }, 3000);
};

const FormData = form => {
    let formData = [...form.elements].map((input, index) => {
        return encodeURIComponent(input.name) + '=' + encodeURIComponent(input.value);
    });
    formData = formData.join('&');
    return formData;
};
