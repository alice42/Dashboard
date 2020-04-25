import React from 'react'
import styled from '@emotion/styled'
import { Container } from '@material-ui/core'

export const ThemeMixinsToolBar = styled.div`
  ${props => ({ ...props.theme })};
`
export const StyledContainer = styled(Container)`
  padding-top: ${props => props.themespacing}px;
  padding-bottom: ${props => props.themespacing}px;
`

export const StyledMain = styled.main`
  flexgrow: 1;
  height: 100vh;
  overflow: 'auto';
`
