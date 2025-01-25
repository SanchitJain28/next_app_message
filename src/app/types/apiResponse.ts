import { Message } from "../model/User"

export default  interface ApiResponse {
    success:boolean,
    message:string,
    isAccesptingMessage?:boolean,
    messages?:Array<Message>
}