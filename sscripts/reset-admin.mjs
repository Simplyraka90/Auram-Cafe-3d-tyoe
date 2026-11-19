
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { randomBytes } from 'node:crypto';

config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase URL or service role key missing');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
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

if (error) {
  throw error;
}

console.log('Password updated successfully.');
console.log('New admin password:', newPassword);
