import { connectDB } from "@/lib/config/db"
import { Product } from "@/lib/models/ProductSchema"
import { NextResponse } from "next/server"

export const DELETE = async (req, {params}: {params: Promise<{id: string}>}) => {
    await connectDB()

    const {id} = await params

    if(!id){
        return NextResponse.json({error: "Id required"}, {status: 400})
    }

    try{
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
        }

        return NextResponse.json(
        { message: "Product deleted successfully" },
        { status: 200 }
        );
    }catch(err){
        console.log(err)
        return NextResponse.json({error: "Failed To Delete Menu Product"}, {status: 500})
    }
}