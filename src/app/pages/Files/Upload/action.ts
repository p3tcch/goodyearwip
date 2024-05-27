'use server'

export async  function onSubmit (formData: FormData) {
    'use server'
      
      const file = formData.get('file') as File;
      console.log(file);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      console.log(buffer);
    }