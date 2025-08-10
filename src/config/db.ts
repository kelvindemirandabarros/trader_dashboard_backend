import mongoose from 'mongoose';

export async function connect_db(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log('[DB] Conectado ao MongoDB');
  } catch (error) {
    console.error('[DB] Erro ao conectar', error);

    process.exit(1);
  }
}
