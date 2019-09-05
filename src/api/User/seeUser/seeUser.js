import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: (_, args) => {
            const { userName } = args;
            return prisma.user({ userName });
        }
    }
};