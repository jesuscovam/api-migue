import { stripe } from '../config'


export async function supendProduct(id: string) {
  try {
    await stripe.products.update(id, { active: false })
  } catch (error) {
    console.error('Error updating product', { error })

  }
} 
