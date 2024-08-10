import { stripe } from "../config";

/**
 * @returns priceIds string[]
  * */
export async function list(productId: string) {

  try {
    const prices = await stripe.prices.list({ product: productId })
    return prices.data.map((p) => p.id)
  } catch (error) {
    console.error('Error creating price', { error })
  }
}
