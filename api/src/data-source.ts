import "reflect-metadata"
import { DataSource } from "typeorm"
import { Like } from "./entity/Like"
import 'dotenv/config'

console.log(process.env.POSTGRES_USER)
console.log(process.env.POSTGRES_PASSWORD)
console.log(process.env.POSTGRES_DB)

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "cat-pinterest-api-pg",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    entities: [Like],
    migrations: [],
    subscribers: [],
})
