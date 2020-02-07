import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        deleteRoom: async (_, args) => {
            const { roomId } = args;
            
            return prisma.deleteRoom({
                id: roomId
            });
        } 
    }
};