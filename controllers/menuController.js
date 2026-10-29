// TODO B: Controller Menu - CRUD lengkap (Pertemuan 3-4, 9-12)
//
// Format error: lempar objek { status, message } (lihat middlewares/errorHandler.js),
// mis. throw { status: 404, message: "Menu tidak ditemukan" }
// express-async-errors sudah aktif di app.js, jadi tidak perlu try/catch.

const Menu = require("../models/menuModel");

const MAX_LIMIT = 100;

// GET /menu
// Query opsional:
//   kantinId  filter berdasarkan kantin
//   sort        nama field, urut ascending (default: createdAt)
//   page        default 1
//   limit       default 10, maksimum 100
//   fields      projection, dipisah koma, mis. fields=nama,kode
// Respons 200: { data, page, limit, total }
//   - total = jumlah dokumen yang cocok dengan filter (BUKAN jumlah data pada halaman ini)
//   - data memuat kantinId yang ter-populate (objek Kantin)
exports.getAll = async (req, res) => {
  // TODO B1
   const filter = {};
  if (req.query.kantinId) {
    filter.kantinId = req.query.kantinId;
  }

  // 2. Kalkulasi Pagination (Perbaikan Math.min)
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(parseInt(req.query.limit) || 10, MAX_LIMIT);
  
  // 3. Konfigurasi Sorting & Proyeksi Kolom (Default sorting: createdAt)
  const sortField = req.query.sort || 'createdAt';
  const projection = req.query.fields ? req.query.fields.split(",").join(" ") : "";
  
  // 4. Eksekusi Query (Tanpa try/catch karena didukung express-async-errors secara global)
  const data = await Menu.find(filter)
      .populate("kantinId") // Mengisi objek informasi kantin secara utuh
      .select(projection)
      .sort(sortField)     // Mongoose otomatis membaca string spasi/minus untuk sorting
      .skip((page - 1) * limit)
      .limit(limit);

  // 5. Hitung total data yang lolos filter (Bukan total seluruh koleksi)
  const total = await Menu.countDocuments(filter);

  // 6. Mengirimkan response sukses 200
  res.status(200).json({ data, page, limit, total });
};

// GET /menu/:id
//   - 200 -> dokumen menu, kantinId ter-populate
//   - tidak ada -> 404 { message }
//   - format id salah -> 400 (ditangani errorHandler lewat CastError)
exports.getById = async (req, res) => {
  // TODO B2
};

// POST /menu
//   - 201 -> dokumen yang baru dibuat
//   - validasi gagal / ISBN duplikat -> 400 (ditangani errorHandler)
exports.create = async (req, res) => {
  // TODO B3
};

// PUT /menu/:id
//   - 200 -> dokumen setelah diperbarui (bukan sebelum)
//   - validasi schema HARUS tetap berjalan saat update
//   - tidak ada -> 404 { message }
exports.update = async (req, res) => {
  // TODO B4
};

// DELETE /menu/:id
//   - 204 tanpa body
//   - tidak ada -> 404 { message }
exports.remove = async (req, res) => {
  // TODO B5
};
