import React from 'react'

export const ProfileHeader = ({username}) => {
  return (
    <h1>
      Welcome {username.user_firstName}
    </h1>
  )
}
