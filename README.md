# Campanula - Kamp ve Outdoor Ekipmanları E-Ticaret Platformu

![Course](https://img.shields.it/badge/Ders-Web%20Tasarımı-0056b3)
![Status](https://img.shields.it/badge/Durum-Tamamlandı-success)
![Platform](https://img.shields.it/badge/Platform-Web%20(Client--Side)-orange)

**Hazırlayan:** Merve Gazioğlu  
**Öğrenci No:** 231307100  
**Bölüm:** Bilişim Sistemleri Mühendisliği  
**Kurum:** Kocaeli Üniversitesi

---

## 1. Proje Özeti
**Campanula**, kampçılık ve doğa sporları alanında faaliyet gösteren sanal bir markanın e-ticaret süreçlerini simüle eden web tabanlı bir uygulamadır. Bu proje, **Kocaeli Üniversitesi Web Tasarımı (TBL303)** dersi kapsamında geliştirilmiştir.

Projenin temel amacı; hazır bir CSS framework (Bootstrap) altyapısına sahip şablonu, belirli bir sektörün (Outdoor) ihtiyaçlarına göre görsel ve işlevsel olarak yeniden yapılandırmak ve sunucu tarafı (back-end) kodlaması olmadan, modern tarayıcı teknolojileriyle dinamik bir kullanıcı deneyimi sunmaktır.

## 2. Sistem Mimarisi ve Teknolojiler
Proje, **istemci tabanlı (client-side)** bir mimari üzerine inşa edilmiştir. Veri tabanı gerektiren işlemler, HTML5 Web Storage API (Local Storage) kullanılarak tarayıcı üzerinde simüle edilmiştir.

* **Arayüz (Front-End):** HTML5, CSS3, Bootstrap 4
* **Etkileşim ve Mantık:** JavaScript (ES6+), jQuery
* **Veri Kalıcılığı:** Local Storage (Sepet, Sipariş ve Yönetici verileri için)
* **Veri Görselleştirme:** Chart.js (Yönetici paneli grafikleri için)
* **İkon Seti:** FontAwesome

## 3. Proje Kapsamı ve Özellikler

### A. Kullanıcı Arayüzü (Front-End)
Kullanıcıların ürünleri inceleyebileceği, filtreleyebileceği ve satın alma simülasyonu yapabileceği responsive bir arayüz tasarlanmıştır.

* **Dinamik Ürün Yönetimi:** `shop.html` sayfası üzerinde kategori, renk ve fiyat filtrelemeleri JavaScript ile anlık olarak çalışmaktadır.
* **Sepet Mekanizması:** Kullanıcılar ürünleri sepete ekleyebilir, adet güncelleyebilir ve sepeti boşaltabilir. Bu veriler sayfa yenilense dahi (Local Storage sayesinde) korunur.
* **Özelleştirilmiş Kurumsal Sayfalar:** Hazır şablonda bulunmayan ancak bir e-ticaret sitesi için kritik olan aşağıdaki sayfalar **sıfırdan kodlanmıştır**:
    * **Lojistik & Depo:** Teslimat süreçlerini anlatan timeline (zaman çizelgesi) tasarımı.
    * **Teknik Servis:** Bakım/onarım talep formları ve süreç bilgilendirmeleri.
    * **Müşteri Hizmetleri:** Sıkça Sorulan Sorular (Accordion yapısı) ve destek formları.
* **Duyuru ve Kampanyalar:** Anasayfada yer alan duyurular, detaylı bilgi için Bootstrap Modal (Pop-up) pencereleri ile entegre edilmiştir.

### B. Yönetici Paneli (Back-End Simülasyonu)
Site içeriğinin yönetilebildiği `admin-dashboard.html` sayfası geliştirilmiştir.

* **Dashboard Grafikleri:** Günlük ciro, kategori dağılımı gibi veriler `Chart.js` kütüphanesi ile görselleştirilmiştir ("Sayılarla KOÜ" isterine uygun olarak).
* **CRUD İşlemleri:** Yönetici, yeni ürün ekleyebilir, mevcut ürünleri silebilir veya gelen siparişleri görüntüleyebilir.
* **Mesaj Yönetimi:** İletişim formlarından gönderilen mesajlar panelde listelenir.

## 4. Karşılaşılan Zorluklar ve Çözümler

Proje geliştirme sürecinde karşılaşılan teknik zorluklar ve uygulanan çözüm yöntemleri aşağıdadır:

1.  **Şablon Uyarlaması ve Konsept Değişimi:**
    * *Sorun:* Kullanılan "Amado" şablonu mobilya sektörü odaklıydı. Outdoor temasına (Renkler, fontlar, buton yapıları) dönüştürülmesi gerekiyordu.
    * *Çözüm:* CSS override (ezme) yöntemiyle renk paleti Siyah/Sarı (#fbb710) tonlarına çekildi, doğa temalı görseller ve ikonlar entegre edildi.

2.  **Eksik Sayfaların Tasarımı ve Responsive Sorunları:**
    * *Sorun:* Şablonda Lojistik, Teknik Servis gibi sayfalar mevcut değildi. Bu sayfalar sıfırdan tasarlanırken mobil cihazlarda ölçeklendirme (scaling) ve taşma sorunları yaşandı.
    * *Çözüm:* Bootstrap Grid sistemi (row/col yapısı) manuel olarak yeniden kurgulandı. Medya sorguları (Media Queries) ile metin boyutları ve görsel hizalamaları mobil cihazlar için optimize edildi.

3.  **Veri Yönetimi (No-Backend):**
    * *Sorun:* Sunucu olmadığı için sepet verilerinin sayfalar arasında taşınması sorunu.
    * *Çözüm:* Tüm veri akışı JSON formatına çevrilerek `localStorage` ve `sessionStorage` üzerine kurgulandı.

## 5. Kurulum ve Kullanım

Proje herhangi bir kurulum veya sunucu yapılandırması gerektirmez.

1.  Proje klasörünü bilgisayarınıza indirin.
2.  **`index.html`** dosyasına çift tıklayarak tarayıcınızda çalıştırın.
3.  **Yönetici Paneli Erişimi:**
    * Giriş Sayfası: `admin-login.html`
    * Kullanıcı Adı: `admin`
    * Şifre: `1234`

## 6. Dosya Yapısı

```text
Campanula/
├── admin-dashboard.html  # Yönetici ana paneli (Grafikler ve Tablolar)
├── admin-login.html      # Yönetici giriş ekranı
├── cart.html             # Sepet sayfası (JS ile dinamik hesaplama)
├── checkout.html         # Ödeme sayfası
├── duyurular.html        # Kampanya ve duyurular
├── hakkimizda.html       # Kurumsal kimlik sayfası
├── iletisim.html         # İletişim formu ve Google Maps
├── index.html            # Ana sayfa (Slider ve Vitrin)
├── lojistik.html         # Depo süreçleri (Timeline tasarımı)
├── musteri-hizmetleri.html # SSS ve Destek
├── product-details.html  # Ürün detay sayfası
├── shop.html             # Ürün listeleme
├── teknik-servis.html    # Servis talep sayfası
├── vizyon.html           # Misyon ve Vizyon
├── css/                  # Stil dosyaları
├── img/                  # Görsel materyaller
└── js/                   # JavaScript dosyaları (sepet.js, active.js)
