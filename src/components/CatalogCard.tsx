export type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: string;
  originalPrice: string;
};

export function CatalogCard(product: Product) {
  const { id, name, description, imageUrl, price, originalPrice } = product;
  console.log(product);
  return (
    <div key={id}>
      <h2>{name}</h2>
      <img src={imageUrl} alt={name} />
      <p>{description}</p>
      {originalPrice !== 'undefined' && <span>{originalPrice}</span>}
      <span>{price}</span>
    </div>
  );
}
