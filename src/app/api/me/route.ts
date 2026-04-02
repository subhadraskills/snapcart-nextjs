// import { auth } from "@/auth";
// import User from "@/models/user.model";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//   try {
//     const session = await auth();

//     if (!session || !session.user) {
//       return NextResponse.json(
//         { message: "user is not authenticated" },
//         { status: 400 }
//       );
//     }

//     const user = await User.findOne({ email: session.user.email })
//       .select("-password");

//     if (!user) {
//       return NextResponse.json(
//         { message: "user not found" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(user, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: `get me error : ${error}` },
//       { status: 500 }
//     );
//   }
// }



import { auth } from "@/auth";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      console.log("No session or user found", session);
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select("-password");
    if (!user) {
      console.log("User not found for email", session.user.email);
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error in /api/me GET:", error);
    return NextResponse.json({ message: `Server error: ${error}` }, { status: 500 });
  }
}