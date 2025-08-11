import { Document, model, Schema } from 'mongoose';

import { User } from '../../types/Users';

const user_schema = new Schema<User & Document>(
  {
    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true, // Garante que não existam dois documentos com o mesmo email.
      lowercase: true, // Salva sempre em minúsculas.
      trim: true // Remove espaços em branco.
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  },
  {
    timestamps: true
  }
);

export const UserModel = model<User & Document>('Users', user_schema);
