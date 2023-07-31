const fs = require("fs")
const { json } = require("node:stream/consumers")

class ProductManager {
    constructor(path) {
        this.path = path,

            this.products = [

            ]
    }

    getProduct = async () => {
        const listOfProducts = await fs.promises.readFile(this.path, "utf-8")
        const listOfProductsParse = JSON.parse(listOfProducts)
        return listOfProductsParse
    }

    generateId = async () => {
        const counter = this.products.length
        if (counter === 0) {
            return 1
        } else {
            return (this.products[counter - 1].id) + 1
        }
    }


    addProduct = async (title, description, price, image, code, stock) => {
        if (!title || !description || !price || !image || !code || !stock) {
            console.error("Ingresa todos los datos del producto")
            return
        } else {
            const coderepet = this.products.find(element => element.code === code)
            if (!coderepet) {
                console.error("El codigo del producto es repetido")
                return
            } else {
                const generatedIds = await this.generateId()
                const productNew = {
                    id: generatedIds, title, description, price, image, code, stock
                }
                this.products.push(productNew)
                await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
            }
        }
    }

    updateProduct = async (id, title, description, price, image, code, stock) => {
        if (!id || !title || !description || !price || !image || !code || !stock) {
            console.error("Ingresa todos los datos del producto para su correcta actualizacion")
            return
        } else {
            const allproducts = await this.getProduct()
            const coderepet = allproducts.find(element => element.code === code)
            if (coderepet) {
                console.error("El codigo del producto que desea actualizar se encuentra repetido")
                return
            } else {
                const currentProductsList = await this.getProduct()
                const newProductsList = currentProductsList.map(element => {
                    if (element.id === id) {
                        const updatedProduct = {
                            ...element, title, description, price, image, code, stock
                        }
                        return updatedProduct
                    } else {
                        return element
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(newProductsList, null, 2))
            }
        }

    }
    delateProduct = async (id) => {
        const allproducts = await this.getProduct()
        const productsNotFound = allproducts.filter (element => element.id === id)
        await fs.promises.writeFile(this.path, JSON.stringify(productsNotFound, null, 2))
    }

    getProductById = async(id) => {
        const allproducts = await this.getProduct()
        const found = allproducts.find(element => element.id === id)
        return found
    }

}


async function generator() {
    const productManager = new ProductManager("./path/products.json");

    const only = await productManager.getProductById(1)

    console.log(only)
}

generator()