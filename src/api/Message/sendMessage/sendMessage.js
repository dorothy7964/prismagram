import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, message, toId } = args;
            let room;
            if (roomId === undefined) {
                if (toId === user.id) { throw Error("self User"); }
                const seeRooms = await prisma.rooms({
                    where: {
                        AND: [
                            { participants_some: { id: toId} },
                            { participants_some: { id: user.id} },
                        ]
                    },
                    orderBy: "updatedAt_DESC"
                });
                const existsRoom = seeRooms[0];
                if (existsRoom === undefined) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [{ id: toId }, { id: user.id }]
                        }
                    });
                } else {
                    room = await prisma.room({ id: existsRoom.id });
                }
            } else {
                room = await prisma.room({ id: roomId });
            }

            if (!room) { throw Error("Room not found"); }

            const participants = await prisma.room({ id: room.id }).participants();
            const getTo = participants.filter(
                participant => participant.id !== user.id
            )[0];        


            const result = await prisma.createMessage({
                text: message,
                from: {
                    connect: { id: user.id }
                },
                to: {
                    connect: {
                        id: roomId? getTo.id : toId
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });

            // lastMsgTime, lastMessage
            const now = new Date();
            const update = prisma.updateRoom({
                where:  {id: room.id },
                data: { 
                    lastMsgTime: now.toISOString(),
                    lastMessage: message
                }
            });
            update.then(res => console.log("res",res));

            return result;
        }
    }
};