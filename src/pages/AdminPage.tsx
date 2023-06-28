import React from "react"
import AdminUsersTable from "../components/admin/UserTable"
import { Layout } from "./Layout"

export const AdminPage = () => {
    return (
        <Layout>
            <AdminUsersTable limit={10} userID="1" />
        </Layout>
    )
}
