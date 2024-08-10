import * as Price from '../price'
import { stripe } from '../config'
import type { Plan } from '@repo/db/dashboard'


export async function updateProduct(plan: Plan, ogPrice: number) {
  try {
    const product = await stripe.products.update(plan.stripeId, {
      name: plan.title,
      description: `Plan for ${plan.title}`,

    })

    if (!product) {
      throw Error('Error updating product')
    }

    if (ogPrice !== plan.price) {
      console.log('running new price update')
      await Price.create(product.id, plan.price)
    }

    return {
      productId: product.id,
    }

  } catch (error) {
    console.error('Error updating product', { error })

  }
} 
