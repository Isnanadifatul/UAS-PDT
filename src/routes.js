const {registerHandler, readAllPasien, updatePasienById, searchPasien} = require('./handler-pasien');

const routes = [
    {
      method: 'GET',
      path: '/',
      handler: (request, h) => h.view('index'),
    },
    {
        method: 'POST',
        path: '/register',
        handler: registerHandler,
      },
      {
        method: 'GET',
        path: '/register',
        handler: (request, h) => h.view('input'),
      },
      {
        method: 'GET',
        path: '/ReadPasien',
        handler:  async (request, h) => {
          try {
              const patients = await readAllPasien();
              console.log('Rendering patients:', patients); // Log data yang akan dirender
              return h.view('lihat_data', { patients });
          } catch (error) {
              console.error('Error rendering data pasien:', error);
              return h.response('Gagal mengambil data pasien').code(500);
          }
      }
      },
      {
        method: 'PUT',
        path: '/UpdatePasien',
        handler: updatePasienById,
      },
      {
        method: 'GET',
        path: '/cari-pasien',
        handler: async (request, h) => {
            const searchQuery = request.query.q; // Mengambil query parameter 'q'
            try {
                const patients = await searchPasien(searchQuery);
                console.log('Rendering search results:', patients);
                return h.view('lihat_data', { patients });
            } catch (error) {
                console.error('Error searching data pasien:', error);
                return h.response('Gagal mencari data pasien').code(500);
            }
      }
    },
    
    ];
    module.exports = routes;