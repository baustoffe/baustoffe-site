import { getVariantPrice, type Product } from "@/lib/products";
import type { CartItem } from "@/lib/types";
import { formatSize } from "@/lib/utils";

/** Never fall back to model-wide dimensions for an individual manufacturer SKU. */
export function createProductCartItem(product: Product, variantCode: string, sizeKey: string, quantity: number): CartItem | null {
  const variant = product.variants.find((item) => item.code === variantCode);
  const size = variant?.sizes.find((item) => formatSize(item.width_cm, item.height_cm) === sizeKey);
  if (!variant || !size || !Number.isInteger(quantity) || quantity < 1) return null;
  return {
    variant_id: variant.code,
    product_id: product.code,
    name: `${product.base_name_ro} · ${variant.manufacturer_code}`,
    color: variant.color_name_ro,
    size: formatSize(size.width_cm, size.height_cm),
    quantity,
    unit_price_ron: getVariantPrice(product, variant),
    image: variant.image,
  };
}
