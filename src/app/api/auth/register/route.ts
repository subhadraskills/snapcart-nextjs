// import connectDb from "@/lib/db";
// import User from "@/models/user.model";
// import bcrypt from "bcryptjs";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req:NextRequest){
//     try{
//         await connectDb()
//         const {name,email,password}=await req.json()
//         const existUser=await User.findOne({email})
//         if(existUser){
//             return NextResponse.json(
//                 {message:"email already exist!"},
//                 {status:400}
//                 )
//                 }
//                 if(password.length<6){
//                     return NextResponse.json(
//                         {message:"password must be at least 6 characters"},
//                         {status:400}
//                     )
            
            
//         }
//         const hashedPassword= await bcrypt.hash(password,10)
//         const user=await User.create({
//             name,email,password:hashedPassword
//         })
//          return NextResponse.json(
//                         user,
//                         {status:200}
//                     )

//     }
//     catch(error){
//         return NextResponse.json(
//             {message:'register error ${error}'},
//             {status:500}
//         )

//     }
// }



// src/app/api/auth/register/route.ts
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { message: "Email already exists!" },
        { status: 400 }
      );
    }

    // Check password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return created user (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image || null,
    };

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: `Register error: ${error}` },
      { status: 500 }
    );
  }
}