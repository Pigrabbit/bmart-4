const { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

const ProductType = new GraphQLObjectType({
    name: 'Product',
    description: 'This represents product in store',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        coupang_product_id: { type: GraphQLNonNull(GraphQLInt) },
        category: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        base_price: { type: GraphQLInt },
        discount_rate: { type: GraphQLInt },
        thumbnail_src: { type: GraphQLNonNull(GraphQLString) },
        created_at: { type: GraphQLNonNull(GraphQLString) },
        stock_count: { type: GraphQLNonNull(GraphQLInt) },
        sold_count: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLString },
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        productList: {
            type: new GraphQLList(ProductType),
            description: 'List of products',
            resolve: async () => {
                // get Prodcut from db
                return []
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

module.exports = schema