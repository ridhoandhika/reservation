# Reservation App - Battle Station

Sebuah aplikasi reservasi ruangan gaming (PlayStation) yang dibangun menggunakan Laravel, React (Inertia.js), dan Tailwind CSS.

## 🚀 Langkah Instalasi

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi di mesin lokal Anda.

### 1. Clone Repositori

Pertama, clone repositori ini ke mesin lokal Anda:

```bash
git clone https://github.com/username/reservation.git
cd reservation
```

### 2. Instalasi dengan Docker (Direkomendasikan)

Aplikasi ini sudah dilengkapi dengan konfigurasi Docker untuk mempermudah proses setup.

#### Prasyarat
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) terinstal dan berjalan.

#### Langkah-langkah:

1.  **Salin file environment:**
    ```bash
    cp .env.docker .env
    ```

2.  **Bangun dan jalankan container:**
    ```bash
    docker compose up --build -d
    ```

3.  **Instal dependensi PHP (Composer):**
    ```bash
    docker compose exec app composer install
    ```

4.  **Instal dependensi JavaScript (NPM):**
    ```bash
    # Jika Anda memiliki node lokal
    npm install
    
    # ATAU jika ingin menjalankan di dalam container (jika ada service node)
    # docker compose run --rm node npm install
    ```

5.  **Generate Application Key:**
    ```bash
    docker compose exec app php artisan key:generate
    ```

6.  **Jalankan Migrasi Database:**
    ```bash
    docker compose exec app php artisan migrate
    ```

7.  **Jalankan Vite (untuk aset frontend):**
    ```bash
    npm run dev
    ```

8.  **Generate API Key (Opsional):**
    Jika Anda membutuhkan API Key tambahan (misal untuk `API_KEY` di `.env`):
    ```bash
    docker compose exec app php artisan tinker
    # Kemudian di dalam tinker, jalankan:
    Str::random(64)
    # Copy hasilnya dan masukkan ke file .env
    ```

Aplikasi sekarang dapat diakses melalui: **[http://localhost:8080](http://localhost:8080)**

---

### 3. Instalasi Manual (Tanpa Docker)

Jika Anda ingin menjalankan aplikasi secara langsung di host OS Anda:

#### Prasyarat
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL

#### Langkah-langkah:

1.  **Salin file environment:**
    ```bash
    cp .env.example .env
    ```

2.  **Konfigurasi Database:**
    Buka file `.env` dan sesuaikan `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` dengan database lokal Anda.

3.  **Instal Dependensi:**
    ```bash
    composer install
    npm install
    ```

4.  **Setup Aplikasi:**
    ```bash
    php artisan key:generate
    php artisan migrate
    ```

5.  **Jalankan Aplikasi:**
    Buka dua terminal terpisah:
    - **Terminal 1 (Laravel Server):** `php artisan serve`
    - **Terminal 2 (Vite Server):** `npm run dev`

6.  **Generate API Key (Opsional):**
    ```bash
    php artisan tinker
    # Di dalam tinker:
    Str::random(64)
    ```

Aplikasi akan berjalan di: **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 🛠 Perintah Docker yang Sering Digunakan

- **Menghentikan container:** `docker compose down`
- **Melihat log:** `docker compose logs -f`
- **Masuk ke terminal container app:** `docker compose exec app bash`
- **Menjalankan perintah artisan:** `docker compose exec app php artisan [command]`

## ✨ Fitur Utama
- Reservasi Ruangan Gaming
- Slider Game Populer (Dynamic Swiper)
- Integrasi Google Maps
- UI Modern & Responsive