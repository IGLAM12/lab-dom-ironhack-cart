function updateSubtotal(product) {
  const price = +product.querySelector('.price span').textContent;
  const quantity = +product.querySelector('.quantity input').value;
  const subtotalTag = product.querySelector('.subtotal span');
  const calculate = price * quantity;
  subtotalTag.textContent = calculate;
}

function calculateAll() {
  document.querySelectorAll('.product').forEach(updateSubtotal);
  const subtotals = document.querySelectorAll('.subtotal span');
  const totalTag = document.querySelector('#total-value span');
  let total = 0;
  subtotals.forEach(subtotal => {
    total += +subtotal.textContent;
  });
  totalTag.textContent = total;
}

function removeProduct(event) {
  const target = event.currentTarget;
  const parentRow = target.parentElement.parentElement;
  parentRow.remove();
}

function createProduct() {
  const addTittle = document.querySelector('.create-product input[type="text"]');
  const addPrice = document.querySelector('.create-product input[type="number"]');
  if (addTittle.value === '' || addPrice.value === '') {
    alert('Por favor, completa todos los campos antes de agregar un producto.');
    return;
  }
  let newTittle = addTittle.value;
  let newPrice = addPrice.value;
  let newProduct = document.createElement('tr');
  newProduct.classList.add('product');
  newProduct.innerHTML = `
    <td class="name">
      <span>${newTittle}</span>
    </td>
    <td class="price">$<span>${newPrice}</span></td>
    <td class="quantity">
      <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
      <button class="btn btn-remove">Remove</button>
    </td>
  `;
  const tbody = document.querySelector('tbody');
  tbody.appendChild(newProduct);

  const removeBtn = newProduct.querySelector('.btn-remove');
  removeBtn.addEventListener('click', removeProduct);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  const removeProducts = document.getElementsByClassName('btn-remove');
  for (removeBtn of removeProducts) {
    removeBtn.addEventListener('click', removeProduct);
  }

  const createProducts = document.getElementById('create');
  createProducts.addEventListener('click', createProduct);
});
