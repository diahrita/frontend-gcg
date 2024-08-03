// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//     try {
//         const { token } = await req.json();

//         // Simpan token di cookies
//         const res = NextResponse.json({ success: true });
//         res.cookies.set('token', token, { httpOnly: true, path: '/' });

//         return res;
//     } catch (error) {
//             return NextResponse.json({ success: false, message: 'Failed to save token' });

//     }
// }
