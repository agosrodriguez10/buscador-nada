document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
      const url = `https://images-api.nasa.gov/search?q=${query}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarResultados(data.collection.items);
      } catch (error) {
        console.error('Error al realizar la búsqueda:', error);
      }
    }
  });

  // Función para mostrar los resultados de la búsqueda
  function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; // Limpiar resultados previos

    if (items.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }

    items.forEach(item => {
      const imagen = item.links && item.links[0] ? item.links[0].href : 'https://via.placeholder.com/150'; // Placeholder si no hay imagen
      const { title, description, date_created } = item.data[0];

      const tarjeta = document.createElement('div');
      tarjeta.classList.add('col-md-4', 'mb-4');
      tarjeta.innerHTML = `
        <div class="card">
          <img src="${imagen}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title || 'Sin título'}</h5>
            <p class="card-text">${description || 'Sin descripción disponible'}</p>
            <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
          </div>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });
  }


  