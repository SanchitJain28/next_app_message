import { Message } from "../model/User"

export default  interface ApiResponse {
    success:boolean,
    message:string,
    isAcceptingMessage?:boolean,
    messages?:Array<Message>
}