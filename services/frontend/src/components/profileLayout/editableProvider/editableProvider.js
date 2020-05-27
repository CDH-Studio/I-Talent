import React from 'react'

const Context = React.createContext({})

export const EditableProvider = Context.Provider
export const EditableConsumer = Context.Consumer
export default Context