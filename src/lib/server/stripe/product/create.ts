import * as Price from '../price'
import { stripe } from '../config'


export async function createProduct(title: string, amount: number) {
  try {
    const product = await stripe.products.create({
      name: title,
      description: `Plan for ${title}`,
    })

    if (!product) {
      throw Error('Erorr creating product')
    }

    const priceId = await Price.create(product.id, amount)
    return {
      productId: product.id,
      priceId
    }

  } catch (error) {
    console.error('Error creating product', { error })

  }
}
