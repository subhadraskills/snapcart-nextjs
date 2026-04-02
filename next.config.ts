// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//  images:{
//   remotePatterns:[
//     {hostname:"1h3.googleusercontent.com"},
//     {hostname:"plus.unsplash.com"},
//     {hostname:"images.unsplash.com"},
//     {hostname:"res.cloudinary.com"},
//      { hostname: "via.placeholder.com" } 
//     //   { hostname: "www.bbassets.com" }, 
//     //      { hostname: "i0.wp.com" } 

//   ]
//  }
// };

// export default nextConfig;


import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images:{
  remotePatterns:[
    {
      protocol: "https",
      hostname:"lh3.googleusercontent.com"
    },
    {
      protocol: "https",
      hostname:"plus.unsplash.com"
    },
    {
      protocol: "https",
      hostname:"images.unsplash.com"
    },
    {
      protocol: "https",
      hostname:"res.cloudinary.com"
    },
    {
      protocol: "https",
      hostname: "via.placeholder.com"
    }
  ]
 }
};

export default nextConfig;