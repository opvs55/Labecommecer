export type TuserDB = {
    id: string,
    name: string,
	email: string,
	password: string,
    created_at :string
}

export type TpurchaseDB = {
    id: string,
    buyer: string,
    total_price: string,
    created_at: string,
    paid: number
}

export type TproductsDB = {
    id: string,
    name: string,
    price: number,
    description: string,
    image_url: string
}


export type TpucharseProductsDB = {
    purchase_id: string,
    product_id: string,
    quantify: number
}