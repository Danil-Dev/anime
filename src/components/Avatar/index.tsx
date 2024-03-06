'use client'
import React from "react";
import {Avatar} from "@chakra-ui/react";

interface IUser {
  image?: string,
  name?: string
}

export default function AvatarComponent({user : {name, image}} : { user: IUser}){

  if (image){
    return <Avatar size="xl" name={name} src={`https://imagedelivery.net/H7NwWs6k4gpIZUMxFDARAQ/${image}/avatar`}/>
  }

  return <Avatar size="xl" bg='teal.500'/>
}