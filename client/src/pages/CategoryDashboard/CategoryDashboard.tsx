import React from 'react'
import styled from 'styled-components'

import { VerticalList } from '../../components/VerticalList'
import { bigBannerList, smallBannerList } from '../../utils/mockData'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { Navbar } from '../../components/Navbar'

type Props = {}

export const CategoryDashboard = (props: Props) => {
  return (<div>category dashboard</div>)
}
