import { MongoClient, Db, Collection } from 'mongodb'

const URI = process.env.MONGODB_URI || ''
const DB_NAME = process.env.MONGODB_DB || 'velvet'

let clientPromise: Promise<MongoClient> | null = null

export function hasMongo(): boolean {
  return URI.length > 10
}

function getClient(): Promise<MongoClient> {
  if (!hasMongo()) throw new Error('Falta MONGODB_URI en .env')
  if (!clientPromise) {
    const client = new MongoClient(URI)
    clientPromise = client.connect()
  }
  return clientPromise
}

export async function getMongoDb(): Promise<Db> {
  const client = await getClient()
  return client.db(DB_NAME)
}

export async function getProductsCollection(): Promise<Collection> {
  const db = await getMongoDb()
  const col = db.collection('products')
  await col.createIndex({ active: 1 }).catch(() => {})
  return col
}

export async function getImagesCollection(): Promise<Collection> {
  const db = await getMongoDb()
  return db.collection('images')
}
