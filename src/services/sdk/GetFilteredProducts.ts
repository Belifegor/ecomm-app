import { apiRoot } from './BuildClient';

export type Filters = {
  brand?: string[];
  color?: string[];
  minPrice?: number;
  maxPrice?: number;
};

//получение товаров по выбранным фильтрам
export async function getFilteredProducts(filters: Filters, limit = 10) {
  const where: string[] = [];

  //бренд(brand)
  if (filters.brand?.length) {
    const list = filters.brand.map((brand) => `"${brand}"`).join(',');
    where.push(`variants.attributes.brand in (${list})`);
  }

  //цвет(color)
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    const min = filters.minPrice ?? 0;
    const max = filters.maxPrice ?? 999_999;
    where.push(`variants.price.centAmount:range(${min * 100} to ${max * 100})`);
  }

  const response = await apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        localeProjection: 'en-US',
        where,
      },
    })
    .execute();

  return response.body.results;
}
