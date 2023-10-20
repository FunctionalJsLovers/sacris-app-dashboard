import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
const supabase = createClientComponentClient();
export async function uploadFile(name: any, File: any) {
  const file = File;
  const bucket = 'profile_pics';
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`${name}.png`, file);
  if (error) {
    console.log('Error uploading file.');
    return;
  }
  console.log('File uploaded successfully!');
}
