import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createRoom: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { toId } = args;
            const now = new Date();

            if (toId === user.id) { 
                throw Error("self User"); 
            }
            
            const seeRooms = await prisma.rooms({
                where: {
                    AND: [
                        { participants_some: { id: toId} },
                        { participants_some: { id: user.id} },
                    ]
                }
            });
            const existsRoom = seeRooms[0];
            if (existsRoom === undefined) {
                return prisma.createRoom({
                        participants: {
                            connect: [{ id: toId }, { id: user.id }]
                        },
                        lastMsgTime: now.toISOString(),
                    });
            } else {
                return prisma.room({ id: existsRoom.id });
            }
        } 
    }
};