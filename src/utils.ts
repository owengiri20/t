export const getErrorMessge = (err: any) => {
    return err?.message ?? "Something went wrong, please contact support"
}
