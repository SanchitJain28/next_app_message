import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"

export async function DELETE(request: Request) {
    await dbConnect()
    const { id, username } = await request.json()
    try {
        const user = await UserModel.findOneAndUpdate(
            { username },
            { $pull: { messages: { _id: id } } },
            { new: true }
        )
        if (!user) {
            return Response.json({
                success: false,
                message: "Invalid request 1"
            }, { status: 401 })
        }
        user.messages.filter((e) => {
            return e._id !== id
        })
        await user.save()
        return Response.json({
            success: true,
            message: "Message deleted",
            user
        }, { status: 201 })
    } catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Invalid request"
        }, { status: 404 })
    }
}