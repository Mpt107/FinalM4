class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 1;  // inicial  1 si pongo 0 no funciona
    }

    getTotal() {
        return this.precio * this.cantidad;
    }
}

class Carrito {
    constructor() {
        this.productos = [];  
    }

    agregarAlCarrito(id, precio, nombre) {
        let productoExistente; 

        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === id) {
                productoExistente = this.productos[i]; 
            }
        }

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            const nuevoProducto = new Producto(id, nombre, precio);
            this.productos.push(nuevoProducto);
        }

        this.actualizarCarrito(); 
    }

    eliminarProducto(id) {
        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].id === id) {
                this.productos.splice(i, 1);
                break; 
            }
        }
        this.actualizarCarrito();
    }

    actualizarCarrito() {
        const listaCarrito = document.getElementById('carrito');
        const totalCarrito = document.getElementById('total');

        listaCarrito.innerHTML = '';  
        let total = 0;  

        this.productos.forEach(producto => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.getTotal()}`;

            const eliminarButton = document.createElement('button');
            eliminarButton.className = 'btn btn-danger btn-sm';
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.addEventListener('click', () => {
                this.eliminarProducto(producto.id);
            });

            li.appendChild(eliminarButton);  
            listaCarrito.appendChild(li);
            total += producto.getTotal(); 
        });

        totalCarrito.textContent = total;  
        if (total === 0) {
            totalCarrito.style.display = 'none';
        } else {
            totalCarrito.style.display = 'inline'; 
        }
    }

    finalizarCompra() {
        const mensajeDiv = document.getElementById('mensaje');
        const totalCarrito = document.getElementById('total');
       // alert(`¡Muchas gracias por su compra! El total pagado fue: $${totalCarrito.textContent}`);
       mensajeDiv.innerHTML = `¡Muchas gracias por su compra! El total pagado fue: <strong>$${totalCarrito.textContent}</strong>`;
    
        this.productos = [];
        totalCarrito.textContent = '0';
        this.actualizarCarrito(); 
    }
}

const carrito = new Carrito();

document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const precio = parseInt(this.getAttribute('data-precio')); 
        const nombre = this.getAttribute('data-nombre'); 

        carrito.agregarAlCarrito(id, precio, nombre);
    });
});

document.getElementById('finalizar-compra').addEventListener('click', function() {
    carrito.finalizarCompra(); 
});
