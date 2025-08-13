import { hash } from 'bcryptjs';

export async function hash_string(string: string): Promise<string> {
  return await hash(string, 8);
}
