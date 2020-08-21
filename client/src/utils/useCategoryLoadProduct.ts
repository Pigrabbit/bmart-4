import { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { replaceHyphensWithSlashes } from './parser'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../apis/graphqlQuery'

// export const useCategoryLoadProduct = (
//   categoryName: string,
//   sorter: string,
//   pageNumber: number
// ) => {
//   useEffect(() => {
//     let { loading, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
//       variables: {
//         category: replaceHyphensWithSlashes(categoryName),
//         offset: 0,
//         limit: 10,
//         sorter: sorter,
//       },
//     })
//   }, [pageNumber])
//   return null
// }
