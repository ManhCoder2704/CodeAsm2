var mongoClient = require('mongodb').MongoClient
var url = 'mongodb+srv://manh9403:manh2704@cluster0.rwatsux.mongodb.net/?retryWrites=true&w=majority'
const { ObjectId } = require('bson')

async function insertNewProduct(newProduct) {
    let db = await getDB()
    let id = await db.collection("products").insertOne(newProduct)
    return id
}
async function getDB() {
    let client = await mongoClient.connect(url)
    let db = client.db("GCH1002")
    return db
}

async function getAllProducts() {
    let db =await getDB()
    let results = await db.collection("products").find().toArray()
    return results
}
async function updateProduct(id, name, price, picUrl) {
    let db =await getDB()
    await db.collection("products").updateOne({ _id: ObjectId(id) },
        { $set: { "name": name, "price": price, "picture": picUrl } })
}
async function findProductById(id) {
    let db =await getDB()
    const productToEdit = await db.collection('products').findOne({ _id: ObjectId(id) })
    return productToEdit
}
async function deleteProductById(id) {
    let db =await getDB()
    await db.collection("products").deleteOne({ _id: ObjectId(id) })
}

module.exports = {insertNewProduct,getAllProducts,updateProduct,findProductById,deleteProductById}