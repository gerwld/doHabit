import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'

export const HomeTask = () => {
  return (
    <PostView>
      <Text>HomeTask</Text>
    </PostView>
  )
}


const PostView = styled.View`
padding: 10px;
align-items:center;
background-color: #ffffff;
min-height: 55px;
min-width: 100%;
border-radius: 0;
margin: 5px 0 0;
flex-direction: row;
border: 1px solid #dde7ee;
`
