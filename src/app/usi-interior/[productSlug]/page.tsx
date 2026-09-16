import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";

export default async function ProductPage({ params }: { params: Promise<{ productSlug: string }> }) {
  const { productSlug } = await params;
  const product = getProductBySlug(productSlug);
  if (!product || product.category_slug !== "usi-interior") notFound();
  return <ProductDetail key={product.code} product={product} />;
}
