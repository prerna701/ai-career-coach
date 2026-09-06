import React from "react"

// Every page in this group reads the auth cookie (directly or via a server
// action) to load the logged-in user. There's no session during `next build`'s
// static-generation pass, so these routes must always render per-request.
export const dynamic = "force-dynamic";

const MainLayout = ({ children}) => {
    return (<div className="container m-auto mt-24 mb-20">{children}</div>)
}
export default MainLayout;