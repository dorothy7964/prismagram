import { prisma } from "../../../generated/prisma-client";

export default {
    Room: {
        participants: ({ id }) => prisma.room({ id }).participants(),
        messages: ({ id }) => prisma.room({ id }).messages(),
        unReadMsgCounter: async (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            try{
              return prisma
              .messagesConnection({where:{
                    AND: [
                        { room: { id: parentId } },
                        { to: { id: user.id } },
                        { readMessage: false }
                    ]
                }})
              .aggregate()
              .count()
            } catch {
                return 0;
            }
        }
    }
};