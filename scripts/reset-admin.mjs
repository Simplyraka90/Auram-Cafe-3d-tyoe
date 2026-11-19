
import { createClient } from '@supabase/supabase-js';
import { randomBytes } from 'node:crypto';
import nextEnv from '@next/env';
const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  throw new Error('Supabase environment variables missing');
}

const supabase = createClient(url, key, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const userId = '199bcc4e-22a4-42d4-bff7-f20e3407bfe4';
const newPassword = randomBytes(24).toString('base64url');

const { error } = await supabase.auth.admin.updateUserById(
  userId,
  { password: newPassword }
);

if (error) throw error;

console.log('Admin password updated successfully!');
console.log('New Password:', newPassword);
