const API_URL = 'http://localhost:3000/api/enderecos';

document.getElementById('enderecoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const rua = document.getElementById('rua').value;
    const numero = document.getElementById('numero').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;
    

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rua, numero, bairro, cidade })
    });

    const endereco = await response.json();
    appendEndereco(endereco);

    document.getElementById('rua').value = '';
    document.getElementById('numero').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
});

async function loadEnderecos() {
    const response = await fetch(API_URL);
    const enderecos = await response.json();
    enderecos.forEach(appendEndereco);
}

function appendEndereco(endereco) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${endereco.rua}</strong>
        <strong>${endereco.numero}</strong>
        <strong>${endereco.bairro}</strong>
        <strong>${endereco.cidade}</strong>
        <button onclick="deleteEndereco('${endereco._id}')">Deletar</button>
    `;
    document.getElementById('enderecosList').appendChild(li);
}

async function deleteEndereco(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.location.reload();
}

loadEnderecos();
