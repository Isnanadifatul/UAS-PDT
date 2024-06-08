//const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const {DataTypes, Op} = require('sequelize');
const {insertUser, Pasien} = require('../models/pasien');

async function registerHandler(request, h) {
  try {
    const {nama_pasien, usia, jenis_kelamin, alamat,  no_telp} = request.payload;

  
// Insert user baru
await insertUser(nama_pasien, usia, jenis_kelamin, alamat, no_telp);

return h.response('Registration successful!').code(201);
} catch (error) {
console.error(error);
return h.response('Internal Server Error').code(500);
}

}

// Fungsi untuk membaca semua data pasien
async function readAllPasien() {
  try {
      const pasiens = await Pasien.findAll();
      console.log('Pasiens:', pasiens);
      return pasiens; // Mengembalikan nilai
  } catch (error) {
      console.error('Error membaca data pasien:', error);
      throw error; // Melemparkan kesalahan
  }
}

// Contoh pemanggilan fungsi dan penanganan respons
/*readAllPasien()
    .then(pasiens => {
        console.log('Semua data pasien:', pasiens);
        // Lakukan sesuatu dengan data pasien
    })
    .catch(error => {
        console.error('Gagal membaca data pasien:', error);
        // Lakukan penanganan kesalahan lainnya
    });
    */

/*
exports.ReadAllPasien = async (req, res) => {
  try {
      const pasiens = await Pasien.findAll();
      return res.json(pasiens);
  } catch (error) {
      return res.status(500).json({ error: 'Gagal membaca data pasien' });
  }
};


*/

// Fungsi untuk mengupdate data pasien berdasarkan ID
async function updatePasienById(id, newData) {
  try {
      // Melakukan update data pasien dengan menggunakan metode update()
      const result = await Pasien.update(newData, {
          where: { id_pasien: id }
      });

      // Jika berhasil, result akan berisi jumlah baris yang terpengaruh oleh operasi update
      if (result[0] > 0) {
          console.log(`Data pasien dengan ID ${id} berhasil diupdate.`);
          return result; // Mengembalikan hasil operasi update
      } else {
          console.log(`Data pasien dengan ID ${id} tidak ditemukan.`);
          return null;
      }
  } catch (error) {
      console.error('Error mengupdate data pasien:', error);
      throw error; // Melemparkan kesalahan
  }
}

// Contoh pemanggilan fungsi untuk melakukan update data pasien
const idPasienToUpdate = 1; // ID pasien yang ingin diupdate
const newData = {
  nama_pasien: 'Laila lailatul', // Data baru untuk nama pasien
  jenis_kelamin: 'Perempuan', // Data baru untuk jenis kelamin
  alamat: 'Jl. Merdeka 123', // Data baru untuk alamat
  usia: 30, // Data baru untuk usia
  no_telp: '08123456789', // Data baru untuk nomor telepon
  registration_date: null // Data baru untuk tanggal registrasi
};

updatePasienById(idPasienToUpdate, newData)
  .then(result => {
      // Lakukan sesuatu dengan hasil operasi update, jika diperlukan
      console.log('Hasil operasi update:', result);
  })
  .catch(error => {
      // Lakukan penanganan kesalahan, jika diperlukan
      console.error('Gagal melakukan update data pasien:', error);
  });

  //handle pencarian
  const searchPasien = async (searchQuery) => {
    try {
        const pasiens = await Pasien.findAll({
            where: {
                nama_pasien: {
                    [Op.like]: `%${searchQuery}%`
                }
            }
        });
        console.log('Hasil Pencarian:', pasiens);
        return JSON.parse(JSON.stringify(pasiens));
    } catch (error) {
        console.error('Error mencari data pasien:', error);
        throw error;
    }
};



module.exports = {registerHandler, readAllPasien, updatePasienById, searchPasien};

