import styled from "styled-components/native"

const Label = styled.Text`
  font-size: 12px;
  color: #6a767d;
  text-transform: uppercase;
  margin-left: 15px;
`

const ColorPicker = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px
`

const Title = styled.Text`
        min-height: 36px;
        line-height:36px;
        color: white;
        font-size: 17px;
        font-weight: 600;
        align-items: center;
        justify-content: center;
`

const InfoBar = styled.View`
width: 100%;
flex-direction:row;
  align-content: center;
  justify-content: space-around;
`
const InfoBarItem = styled.View`
    align-content: center;
    justify-content: center;
`

module.exports = {
    Label,
    ColorPicker,
    Title,
    InfoBar,
    InfoBarItem
}