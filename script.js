document.getElementById('email').addEventListener('input', function() {
    document.getElementById('photoUploadSection').style.display = this.value ? 'block' : 'none';
});

document.getElementById('addPhoto').addEventListener('click', function() {
    const photoUploadSection = document.getElementById('photoUploadSection');
    const newPhotoUpload = document.createElement('div');
    newPhotoUpload.className = 'photoUpload';
    newPhotoUpload.innerHTML = `
        <input type="file" name="photos[]" accept="image/*" required onchange="previewImage(event)">
        <img src="placeholder.png" alt="Előnézet" class="preview">
        <label for="quantity">Mennyiség:</label>
        <input type="number" name="quantity[]" value="1" min="1">
        <label for="size">Méret:</label>
        <select name="size[]">
            <option value="9x13">9x13</option>
            <option value="10x15">10x15</option>
        </select>
        <button type="button" class="deletePhoto"><img src="trash-icon.png" alt="Törlés"></button>
    `;
    photoUploadSection.appendChild(newPhotoUpload);
    checkPhotos();
});

document.addEventListener('click', function(e) {
    if (e.target && e.target.className === 'deletePhoto') {
        e.target.parentElement.remove();
        checkPhotos();
    }
});

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const preview = event.target.nextElementSibling;
        preview.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function checkPhotos() {
    const photos = document.querySelectorAll('input[type="file"]');
    const submitButton = document.getElementById('submitOrder');
    submitButton.disabled = photos.length === 0;
}

document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Megrendelés leadása elindult, a képek feltöltése folyamatban van. A feltöltés hosszabb ideig is eltarthat. Kérem ne zárja be ezt a böngésző ablakot!');
    const formData = new FormData(this);
    fetch('upload.php', {
        method: 'POST',
        body: formData
    }).then(response => response.text()).then(data => {
        alert('A feltöltés elkészült. A képek feldolgozását hamarosan megkezdjük és a megadott email címen fogjuk értesíteni.');
        window.location.reload();
    }).catch(error => {
        console.error('Error:', error);
    });
});
