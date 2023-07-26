class ProductManager{
    constructor (){
        this.products = []
    }

    getProduct = () =>{
        return this.products
    }

    idsGenerator = () => {
        const counter = this.products.length

        if (counter===0) {
            return 1
        }else{
            return (this.products[counter-1].id) + 1
        }
    }

    addProduct = (title, description, price,image, code, stock) =>{
        if (!title || !description || !price || !image || !code || !stock) {
            console.error("Ingresá todos los datos del producto");
            return
        }else{
         const filteredproduct = this.products.find(element => element.code === code);
         const id = this.idsGenerator();  
         if(!filteredproduct){
            const newproduct = {
                id,title,description,price,image,code,stock
            }
            return this.products.push(newproduct)
        }else{
            this.console.log("El codigo del rpoducto esta repetido y ya existe")
        }
    }
}

    getProductById= (id) => {
        const producfound= this.products.find(element => element.id === id)
        if (!producfound) {
            console.error("No se encuentra")
            return;
        }else{
            return producfound
        }
    }

}

const productmanager = new ProductManager();
productmanager.addProduct("iphone", "descriptionone",170000,"url","codeone",15)
productmanager.addProduct("samsumg", "descriptiontwo",200000,"url","codetwo",20)
productmanager.addProduct("motorola", "descriptionthree",180000,"url","codethree",30)
productmanager.addProduct("lg", "descriptionfour",250000,"url","codefour",20)
productmanager.addProduct("xiaomi", "descriptionfive",120000,"url","codefive",15)
console.log(productmanager.getProduct())
console.log(productmanager.getProductById(6))