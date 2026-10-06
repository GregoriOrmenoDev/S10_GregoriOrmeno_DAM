// Valida que el nombre del producto no esté vacío
export function validarNombreProducto(nombre: string): boolean {
  return nombre.trim().length > 0;
}

// Valida que el precio sea un número mayor a 0
export function validarPrecio(precio: string): boolean {
  const numero = parseFloat(precio);
  return !isNaN(numero) && numero > 0;
}

// Valida que la categoría no esté vacía
export function validarCategoria(categoria: string): boolean {
  return categoria.trim().length > 0;
}

// Valida que el stock sea un número entero mayor o igual a 0
export function validarStock(stock: string): boolean {
  const numero = parseInt(stock, 10);
  return !isNaN(numero) && numero >= 0 && String(numero) === stock.trim();
}