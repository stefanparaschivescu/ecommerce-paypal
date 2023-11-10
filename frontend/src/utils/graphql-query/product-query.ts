export const getAllProductsByQuery = `
    {
        products {
            id
            productName
            seller
            price
            filename
            productRating
        }
    }
`;

export const getProductByQuery = (id: string) => `
    {
        product(id: ${id}) {
            id
            productTitle
            seller
            year
            country
            filename
            price
            type
            productRating
        }
    }
`;

export const geProductsByIdsQuery = (ids: Array<number>) => `
    {
        productsIds(ids: [${ids}]) {
            id
            productTitle
            seller
            price
            filename
            productRating
        }
    }
`;
