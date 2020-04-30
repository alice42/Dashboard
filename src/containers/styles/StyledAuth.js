import React from 'react'
import styled from '@emotion/styled'
import { Avatar, Button, Container } from '@material-ui/core'

export const StyledContainer = styled(Container)`
  margin-top: ${props => props.themespacing}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const StyledFormContainer = styled.div`
  margin-top: ${props => props.themespacing}px;
  width: 100%;
`

export const StyledAvatar = styled(Avatar)`
  margin: ${props => props.themespacing}px;
`

export const StyledButton = styled(Button)`
  margin: ${props => props.themespacing}px;
  color: white;
  background-color: ${props => props.palette.blues.Twilight.backgroundColor};
  &:hover {
    background-color: ${props => props.palette.blues.Twilight.backgroundColor};
  }
`
