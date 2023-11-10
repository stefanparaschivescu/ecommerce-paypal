export const ordersByQuery = `
    {
        orders {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            postIndex
            orderItems {
                id
                amount
                quantity
                product {
                    id
                    productName
                    seller
                    year
                    country
                    filename
                    price
                    type
                    productRating
                }
            }
        }
    }
`;

export const ordersByEmailQuery = (email: string | undefined) => `
    {
        ordersByEmail(email: \"${email}\") {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            postIndex
            orderItems {
                id
                amount
                quantity
                product {
                    id
                    productName
                    seller
                    year
                    country
                    filename
                    price
                    type
                    productRating
                }
            }
        }
    }
`;
