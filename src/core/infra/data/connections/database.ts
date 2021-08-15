import { Connection, createConnection } from "typeorm";

export class Database {
    static #connection: Connection | undefined;//.. do typeORM

    private constructor() {};//para ninguem abrir uma instancia

    static async getConnection(): Promise<Connection> {
        if(!this.#connection) {
            this.prototype.openConnection();
            //prototype faz referencia a Database
        };//abre a conexão e depois a retorna
        return this.#connection as Connection;
    };
    private async openConnection(): Promise<void> {
        Database.#connection = await createConnection();//.. do typeORM
    };
    static async disconnectDatabase(): Promise<void> {
        if(!Database.#connection) {
            return;
        }
        await this.#connection?.close();
        Database.#connection = undefined;
        //para manter a logica caso tenha que abrir novamente a conec..
    }
}