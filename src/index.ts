import "reflect-metadata";

import { ApolloServer } from "@apollo/server";
import { CountryResolver } from "./resolvers/CountryResolver";
import { buildSchema } from "type-graphql";
import { dataSource } from "./dataSource/dataSource";
import { startStandaloneServer } from "@apollo/server/standalone";
import { initTestData } from "./dataSource/initTestData";
import { cleanDB } from "./dataSource/cleanDB";


const port = 4444;

export async function startServerApollo() {

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    });

    const server = new ApolloServer({
        schema
    });

    await dataSource.initialize();
    await cleanDB();
    await initTestData();

    const { url } = await startStandaloneServer(server, {
        listen: { port }
    });

    console.log(`🚀  Server : ${url}`);
}

startServerApollo();
