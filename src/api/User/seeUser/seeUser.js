import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args) => {
            const { userName } = args;
            const exists = await prisma.$exists.user({userName});
                
            if (exists) {
                return prisma.user({ userName });
            }else {
                throw Error("User not found");
            }
        }
    }
};