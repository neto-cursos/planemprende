import React, { useEffect } from 'react'
// import { usePrompt } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

const CheckLeaving = ({isBlocking}) => {
    // const { t } = useTranslation()
    // const message = t('page_has_unsaved_changes')
    const message = 'page_has_unsaved_changes';
    // usePrompt("Verifique que el modelo canvas este actualizado",isBlocking)
    useEffect(() => {
      if (!isBlocking) return () => {}
  
      const beforeUnloadCallback = (event) => {
        event.preventDefault()
        event.returnValue = message
        return message
      }
  
      window.addEventListener('beforeunload', beforeUnloadCallback)
      return () => {
        window.removeEventListener('beforeunload', beforeUnloadCallback)
      }
    }, [isBlocking, message])
    // return <Prompt when={when} message={message} />
    return ('');
    
}

export default CheckLeaving
