import mongoose from 'mongoose';
import dotenv from 'dotenv';

const node_env = process.env.NODE_ENV ?? 'development';
const is_production_env = node_env === 'production';

dotenv.config();

// Consts:
import { UserModel } from '../models/user.model';
import { hash_string } from '../utils/hash_string';

export const db_tests = 'mongodb://127.0.0.1:27017/trader_dashboard_tests';

interface MongoUriInterface {
  [key: string]: string | undefined;
}

export const MONGODB_URIs: MongoUriInterface = {
  production: process.env.MONGODB_URI,
  development: 'mongodb://127.0.0.1:27017/trader_dashboard_dev',
  test: db_tests
};

interface IConnection {
  isConnected: number;
}

const connection: IConnection = {
  isConnected: 0
};

function get_mongodb_uri(): string {
  if (node_env) {
    if (MONGODB_URIs[node_env]) {
      return MONGODB_URIs[node_env] as string;
    } else {
      throw new Error(
        `Não foi encontrado o URI para o node_env '${node_env}'.`
      );
    }
  } else {
    throw new Error('O node_env não foi definido.');
  }
}

/**
 * Função para conectar a aplicação com o banco de dados.
 * @param mongodb_uri é o URI do banco de dados.
 * @return a conexão com o banco de dados.
 */
async function connect(mongodb_uri: string) {
  try {
    if (mongodb_uri) {
      mongoose.set('strictQuery', false);
      const database = await mongoose.connect(mongodb_uri);

      connection.isConnected = database.connections[0].readyState;

      return database;
    } else {
      throw new Error(
        `Não foi possível conectar ao banco de dados em modo de ${process.env.NODE_ENV}.`
      );
    }
  } catch (error) {
    console.log('Não foi possível conectar ao banco. Erro:');
    console.error(error);
  }
}

async function create_user_test(database_connection: any) {
  try {
    const collections = await database_connection?.connections[0].db
      .listCollections()
      .toArray();

    const users_collection = collections?.find(
      (collection: any) => collection.name === 'users'
    );

    const hashed_password = await hash_string('teste321');

    const user_test_obj = {
      full_name: 'Teste',
      email: 'teste@email.com',
      password: hashed_password
    };

    if (users_collection) {
      // throw new Error('A coleção de usuários não existe.');

      const user_test = await UserModel.findOne({
        email: user_test_obj.email
      });

      if (user_test) {
        return;
      }
    }

    const new_user = new UserModel(user_test_obj);

    await new_user.save();
  } catch (error) {
    console.log('Não foi possível criar o usuário Teste. Erro:');
    console.error(error);
  }

  return null;
}

async function disconnect() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV !== 'development') {
      try {
        await mongoose.disconnect();

        connection.isConnected = 0;

        if (node_env === 'development') {
          console.log('DB disconnected');
        }
      } catch (error) {
        console.log('Não foi possível desconectar o banco de dados.');
        console.error(error);
      }
    } else {
      if (node_env === 'development') {
        console.log('Development environment. Not need to disconnect.');
      }
    }
  }
}

export const Database = {
  get_mongodb_uri,
  connect,
  create_user_test,
  disconnect
};
