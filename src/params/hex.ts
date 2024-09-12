export function match(param: string) {
    return /^[0-9a-fA-F]{24}$/.test(param)
}