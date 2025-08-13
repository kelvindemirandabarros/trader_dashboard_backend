import { server } from './app.js';

// // Database:
// import { connect_db } from './config/db.js';

// connect_db().then(() => {
//   server.listen(process.env.PORT || 3000, () => {
//     console.log(`[Server] Rodando na porta ${process.env.PORT || 3000}`);
//   });
// });

// Database:
import { Database } from './database/database.js';

// Consts:
import { application_port } from './consts/App.js';

async function start_server() {
  try {
    const mongodb_uri = Database.get_mongodb_uri();

    console.log('mongodb_uri:', mongodb_uri);

    const database_connection = await Database.connect(mongodb_uri);

    await Database.create_user_test(database_connection);

    server.listen(application_port);

    console.log(`Backend ativado na porta ${application_port}.`);
  } catch (error) {
    console.log('Não foi possível inicializar o servidor. Erro:');
    console.error(error);
  }
}

start_server();
