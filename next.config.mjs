/** @type {import('next').NextConfig} */
const nextConfig = {
 
    env:{
        API_ROUTE: 'https://goodyearwip-68rruthq5-petchs-projects-dab05d62.vercel.app/api/',
        JWT_KEY: '08c71152-c552-42e7-b094-f510ff44e9cb',
        STORAGE_EXCEL_FILES : '/Users/Asus TUF/Desktop/FilesExcel/',
        
    },

    reactStrictMode: true,
    distDir: 'build',
    

};


export default nextConfig;
