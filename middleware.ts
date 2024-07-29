import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest) {
    console.log(req.nextUrl);
    const res = NextResponse.next();
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', "*")
    //repalece this your actual origin
    res.headers.append('Access-Control-Allow-Methods', "GET, DELETE, PATCH, POST, PUT");

    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-version'
    )
    return res;
}

export const config = {
    matcher: ['/api/:path*']
}