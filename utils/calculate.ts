export const toCalculate = (data:{harga:number,jumlah:number}[]) => {
    return data.reduce((sum, item) => {
        return sum + (item.harga * item.jumlah)
    }, 0)
}
