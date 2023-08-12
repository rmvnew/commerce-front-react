



export interface SaleInterface {
    totalValue: number;
    createAt: Date;
    userId: number;
    clientId: number;
    products: { [key: number]: number };  // Alterado para ser um objeto de mapeamento
}
