import {isAuthenticated} from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        readcountMessage: async (_, args, { request }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId } = args;
            const filterOptions = {
                AND: [{
                        to: {
                            id: user.id
                        }
                    },{
                        room: {
                            id: roomId
                        }
                    },{
                        readMessage:false
                }]
            };

            try {
                const result = await prisma.updateManyMessages({
                    where: filterOptions,
                    data: { readMessage: true }
                });
                
                if(result){
                    return true;
                }
                return false;

            } catch (e) {
                console.log(e);
                console.log("readcountMessage");
            }

            return false;
        }
    }
}