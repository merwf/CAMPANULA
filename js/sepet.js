$(document).ready(function() {
    updateCartCount(); // Sayfa açılır açılmaz sepetteki sayıyı header'a yaz
    renderCart();      // Eğer sepet sayfasındaysak ürünleri listele
});

// 1. Sepete Ekleme
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let existingProduct = cart.find(p => p.id === product.id);

    if (existingProduct) {
        existingProduct.qty += parseInt(product.qty);
    } else {
        cart.push(product);
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
    alert("Ürün sepete eklendi!");
}

// 2. Sepet İkonundaki Sayıyı Güncelleme
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    // Tüm sayfalardaki sepet ikonunu bulup günceller
    $('.cart-nav span').text('(' + totalQty + ')');
}

// 3. Sepet Sayfasını Çizme ve Hesaplama
function renderCart() {
    if ($('#cart-table-body').length === 0) return;

    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let tbody = $('#cart-table-body');
    tbody.empty();
    
    let subtotal = 0;

    if (cart.length === 0) {
        tbody.html('<tr><td colspan="4" class="text-center py-5">Sepetinizde henüz ürün yok.</td></tr>');
        updateTotals(0);
        return;
    }

    cart.forEach((item) => {
        let totalItemPrice = item.price * item.qty;
        subtotal += totalItemPrice;

        let row = `
            <tr>
                <td class="cart_product_img">
                    <a href="#"><img src="${item.img}" alt="Product"></a>
                </td>
                <td class="cart_product_desc">
                    <h5>${item.name}</h5>
                </td>
                <td class="price">
                    <span>${item.price.toLocaleString('tr-TR')} TL</span>
                </td>
                <td class="qty">
                    <div class="qty-btn d-flex align-items-center">
                        <div class="quantity">
                            <span class="qty-minus" onclick="changeQty('${item.id}', -1)"><i class="fa fa-minus" aria-hidden="true"></i></span>
                            <input type="number" class="qty-text" step="1" min="1" max="10" name="quantity" value="${item.qty}" readonly>
                            <span class="qty-plus" onclick="changeQty('${item.id}', 1)"><i class="fa fa-plus" aria-hidden="true"></i></span>
                        </div>
                        <div class="ml-3">
                            <span class="text-danger" style="cursor:pointer;" onclick="removeFromCart('${item.id}')"><i class="fa fa-trash"></i></span>
                        </div>
                    </div>
                </td>
            </tr>
        `;
        tbody.append(row);
    });

    updateTotals(subtotal);
    updateCheckoutState();
}

// 4. Miktar Değiştirme
window.changeQty = function(id, change) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let product = cart.find(p => p.id === id);

    if (product) {
        product.qty += change;
        if (product.qty < 1) product.qty = 1;
        if (product.qty > 10) product.qty = 10;
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart();
        updateCartCount();
    }
};

// 5. Ürünü Silme
window.removeFromCart = function(id) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cart = cart.filter(p => p.id !== id);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
};

// 6. Toplam Tutarı ve Kargoyu Hesaplama
function updateTotals(subtotal) {
    let shippingCost = 0;
    let shippingText = "Ücretsiz";

    // Kargo Mantığı: Sepet boşsa kargo 0, doluysa ve 1000 TL altıysa 50 TL
    if (subtotal > 0 && subtotal < 1000) {
        shippingCost = 50; 
        shippingText = "50 TL";
    }

    let grandTotal = subtotal + shippingCost;

    // Ekrana Yazdırma
    $('#subtotal-display').text(subtotal.toLocaleString('tr-TR') + ' TL');
    $('#shipping-display').text(shippingText);
    $('#total-display').text(grandTotal.toLocaleString('tr-TR') + ' TL');
}

// 7. Checkout Butonu Kontrolü
function updateCheckoutState() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    let btn = $(".cart-btn a");

    if (cart.length === 0) {
        btn.addClass("disabled");
        btn.css({
            "pointer-events": "none",
            "opacity": "0.5"
        });

        // Uyarı
        btn.off("click").on("click", function (e) {
            e.preventDefault();
            alert("Sepetiniz boş! Ödemeye geçebilmek için ürün eklemelisiniz.");
        });
    } 
    else {
        // Butonu aktif hale getir
        btn.removeClass("disabled");
        btn.css({
            "pointer-events": "auto",
            "opacity": "1"
        });

        btn.off("click"); 
    }
}

// Sepet boş mu kontrolü
function isCartEmpty() {
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    return cart.length === 0;
}

// Checkout butonunu aktif/pasif yap
function updateCheckoutButton() {
    const $btn = $('#checkout-btn');
    if ($btn.length === 0) return; // Sepet sayfasında değilsek

    if (isCartEmpty()) {
        $btn.addClass('disabled')
            .attr('aria-disabled', 'true');
    } else {
        $btn.removeClass('disabled')
            .removeAttr('aria-disabled');
    }
}

// Butona tıklamayı engelle
$(document).on('click', '#checkout-btn', function (e) {
    if (isCartEmpty()) {
        e.preventDefault();
        alert('Sepetiniz boş, ödeme adımına geçemezsiniz.');
    }
});

