const updateQuantity = async (quantityInputId) =>{
    console.log(quantityInputId);
    const quantity = document.getElementById(quantityInputId).value;
    const response = await fetch('/staff/update_order_quantity/',{
        method: 'POST',
        body: {quantity: quantity, product_id:quantityInputId}
    })
}