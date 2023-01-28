import express, { Request, Response } from 'express'
import cors from 'cors'
import { db } from './database/knex'
import { TuserDB, TpurchaseDB, TproductsDB, TpucharseProductsDB, TUsersPurchaseProductsDB } from './types'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})



//USERS 
app.get("/users", async (req: Request, res: Response) => {
    try {

        const q = req.query.q as string || undefined

        if ( q === undefined){
            const result = await db("users")
            res.status(200).send({result}) 
        }else{
            const result = await db("users").where("name", "LIKE", `%${q}%`)
            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.post("/users", async (req: Request, res: Response) => {
    try {


        const {id, name, email, password} = req.body

        if(typeof id !== 'string'){
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if(id.length < 4){
            res.status(400)
            throw new Error("`id` deve possuir pelo menos 4 caractares")
        }

        if(typeof name !== 'string'){
            res.status(400)
            throw new Error("'name' deve ser string")
        }
        if(name.length < 2 ){
            res.status(400)
            throw new Error("`name` deve possuir pelo menos 4 caractares")
        }

        if(typeof email !== 'string'){
            res.status(400)
            throw new Error("'email' deve ser string")
        }
        if(name.length < 2 ){
            res.status(400)
            throw new Error("`name` deve possuir pelo menos 4 caractares")
        }

        if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)){
            res.status(400)
            throw new Error("'passaword' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }


        const [userIdAlreadyExist]: TuserDB [] | undefined = await db("users").where({ id })

        if(userIdAlreadyExist){
            res.status(400)
            throw new Error("id já existe")
        }

        const [userEmailAlreadyExist]: TuserDB [] | undefined = await db("users").where({ email })

        if(userEmailAlreadyExist){
            res.status(400)
            throw new Error("email já existe")
        }


        const newUser = {
            id,
            name,
            email,
            password
        }

        await db("users").insert(newUser)
        res.status(201).send({message: "user criado com sucesso", user: newUser})


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id 

        const userIdAlreadyExist : TuserDB[] | undefined[] = await db("users").where({id:idToDelete})

        if(idToDelete[0] !== "f"){
            res.status(400)
            throw new Error("id deve iniciar com a letra 'f'")
        }
        if(!userIdAlreadyExist){
            res.status(404)
            throw new Error("id não encontrado")
        }

        await db("users").del().where({id: idToDelete})

        res.status(200).send({message: "user deletado com sucesso"})
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



//PRODUCTS

app.post("/products", async (req: Request, res: Response) => {
    try {


        const {id, name, price, description, image_url} = req.body

        if(typeof id !== 'string'){
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if(id[0] !== "p"){
            res.status(400)
            throw new Error("id deve começar a letra p")
        }

        if(id.length >= 5){
            res.status(400)
            throw new Error("id deve ter 4 letras")
        }

        if(typeof name !== 'string'){
            res.status(400)
            throw new Error("'name' deve ser string")
        }
        if(name.length < 1 ){
            res.status(400)
            throw new Error("`name` deve possuir pelo menos 1 caractares")
        }

        if(typeof price !== 'number'){
            res.status(400)
            throw new Error("'price deve ser Number")
        }
        if(description < 1 ){
            res.status(400)
            throw new Error("`description` deve possuir pelo menos 1 caractares")
        }


        const [productIdAlreadyExist]: TproductsDB [] | undefined = await db("products").where({ id })

        if(productIdAlreadyExist){
            res.status(400)
            throw new Error("id já existe")
        }

        const [nameAlreadyExist]: TproductsDB [] | undefined = await db("products").where({ name })

        if(nameAlreadyExist){
            res.status(400)
            throw new Error("nome já existe")
        }


        const newProduct: TproductsDB = {
            id,
            name,
            price,
            description,
            image_url
        }

        await db("products").insert(newProduct)
        res.status(201).send({message: "produto criado com sucesso", product: newProduct})


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get("/products", async (req: Request, res: Response) => {
    try {

        const q = req.query.q as string || undefined

        if ( q === undefined){
            const result = await db("products")
            res.status(200).send({result}) 
        }else{
            const result = await db("products").where("name", "LIKE", `%${q}%`)
            res.status(200).send(result)
        }
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.put("/products/:id", async (req: Request, res: Response) => {
    try {

        const idToEdit = req.params.id
        
        
        const newId = req.body.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImage_url = req.body.image_url

       if(newId !== undefined){
        if(typeof newId !== "string"){
            res.status(400)
            throw new Error("Id deve ser String")
        }
        if(newId.length < 3){
            res.status(400)
            throw new Error("id deve possuir pelo menos 3 carecteres")
        }
       }


       if (newName !== undefined){
        if(typeof newName  !== "string"){
            res.status(400)
            throw new Error("title deve ser uma string")
        }
        if(newName .length < 1){
            res.status(400)
            throw new Error("title deve possuir 1 caracteres")
        }
       }

       if (newDescription!== undefined){
        if(typeof newDescription !== "string"){
            res.status(400)
            throw new Error("(description deve ser uma string")
        }
        if(newDescription.length < 1){
            res.status(400)
            throw new Error("description deve possuir 1 caracteres")
        }
       }

       if(newPrice !== undefined){
        if(typeof newPrice !== "number"){
            res.status(400)
            throw new Error("Price deve ser number")
        }
       }

       if(newImage_url!== undefined){
        if(typeof newImage_url !== "string"){
            res.status(400)
            throw new Error("ImageUrl deve ser string")
        }
       }

        const [product]: TproductsDB [] | undefined[] = await db("products").where({ id:idToEdit })

        if(!product){
            res.status(404)
            throw new Error("id não encontrado")
        }

        const newProduct: TproductsDB = {
            id : newId || product.id,
            name : newName || product.name,
            price : isNaN(newPrice) ? product.price : newPrice,
            description : newDescription || product.description,
            image_url : newImage_url || product.image_url
        }
        await db("products").update(newProduct).where({id: idToEdit})
        res.status(200).send({message: "Produto editado com sucesso com sucesso", product: newProduct})


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


//PURCHASE

app.post("/purchases", async (req: Request, res: Response) => {
    try {


        const {id, buyer , total_price} = req.body

        if(typeof id !== 'string'){
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if(id.length < 6){
            res.status(400)
            throw new Error("`id` deve possuir pelo menos 4 caractares")
        }
        if(id[0] !== "p"){
            res.status(400)
            throw new Error("id deve começar com pur")
        }
        if(id[1] !== "u"){
            res.status(400)
            throw new Error("id deve começar com pur")
        }
        if(id[2] !== "r"){
            res.status(400)
            throw new Error("id deve começar com pur")
        }

        if(typeof buyer !== 'string'){
            res.status(400)
            throw new Error("'buyer' deve ser string")
        }
        if(buyer.length < 4){
            res.status(400)
            throw new Error("`buyer` deve possuir pelo menos 4 caractares")
        }
        if(buyer[0] !== "f"){
            res.status(400)
            throw new Error("buyer deve começar com f")
        }
        if(typeof total_price !== 'number'){
            res.status(400)
            throw new Error("'Total price deve ser Number")
        }

        const [purchaseIdAlreadyExists]: TpurchaseDB [] | undefined[] = await db("purchases").where({ id })

        if(purchaseIdAlreadyExists){
            res.status(400)
            throw new Error("id já existe")
        }



        const newPurchase = {
            id,
            buyer,
            total_price
        }

        await db("purchases").insert(newPurchase)

        const insertPurchase = await db("purchases").where({ id })
        res.status(201).send({message: "purchase criado com sucesso", purchase: insertPurchase})


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.delete("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id 

        const purchaseIdAlreadyExist : TpurchaseDB[] | undefined[] = await db("purchases").where({id:idToDelete})

        if(idToDelete[0] !== "p"){
            res.status(400)
            throw new Error("id deve iniciar com pur")
        }
        if(idToDelete[1] !== "u"){
            res.status(400)
            throw new Error("id deve iniciar com pur")
        }
        if(idToDelete[2] !== "r"){
            res.status(400)
            throw new Error("id deve iniciar com pur")
        }
        if(!purchaseIdAlreadyExist){
            res.status(404)
            throw new Error("purchase não encontrado")
        }

        await db("purchases").del().where({id: idToDelete})

        res.status(200).send({message: "purchase deletado com sucesso"})
        
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


app.get("/users/purchases/products", async (req: Request, res: Response) => {
    try {

        const purchases:TpurchaseDB[] = await db("purchases")
        const result = []

        for (let purchase of purchases){
            const cart = []
            const purchase_produtc: TpucharseProductsDB[] = await db("purchases_products")
            .where({purchase_id: purchase.id})

            for(let product of purchase_produtc){
                const [item]:TproductsDB[] = await db("products")
                .innerJoin("purchases_products", "purchases_products.product_id", "=", "products.id")
                .where({id: product.product_id})
                cart.push(item)
            }
            

            const newPuchaseWithProducts = {
                ...purchase,
                cart
            }


            result.push(newPuchaseWithProducts)
        }
        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})










