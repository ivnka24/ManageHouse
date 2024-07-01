## Instalasi

### Instalasi Server

1. **Clone Repository**
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Setup Database**
   - Pastikan PostgreSQL sudah terinstall.
   - Contoh seperti di env.example
   - Buat database baru sesuai dengan konfigurasi di `.env`.

4. **Migrate Database**
    ```bash
    npx sequelize-cli db:migrate
    ```

5. **Setup Environment Variables**
   - Buat file `.env` berdasarkan `.env.example`.
   - Isi dengan konfigurasi database dan variabel lain yang dibutuhkan.

6. **Run Server**
    ```bash
    nodemon app
    ```

### Instalasi Client

1. **Masuk ke Direktori Client**
    ```bash
    cd client
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Run Client**
    ```bash
    npm run dev
    ```

