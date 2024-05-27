import mysql from 'mysql2/promise';

export default async function MysqlQuery(query: string, params: Array<String>) {
    try {
        const db = await mysql.createConnection(
          {
              user: 'root',
              host: 'localhost',
              password: '',
              database: 'peterproject_db',
          }
      );
      const [result] = await db.execute(query, params);
      db.end();
      return result;
      } catch (err) {
        return {error: err};
        
      }

      
}