import { useEffect, useRef } from 'react'

import { Card } from 'antd'
import swaggerBundleUrl from 'swagger-ui-dist/swagger-ui-bundle.js?url'
import 'swagger-ui-dist/swagger-ui.css'

import { StyledPageHeader } from 'Components/Styled'

const swaggerUrl =
  'https://ip3vgyv00f.execute-api.eu-west-1.amazonaws.com/dev/swagger'

declare global {
  interface Window {
    SwaggerUIBundle?: any
  }
}

const Swagger = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isMounted = true
    let script: HTMLScriptElement | null = null
    let cleanup: (() => void) | undefined

    const initSwagger = () => {
      if (!isMounted || !containerRef.current) {
        return
      }

      const SwaggerUIBundle = window.SwaggerUIBundle

      if (!SwaggerUIBundle) {
        return
      }

      const swagger = SwaggerUIBundle({
        domNode: containerRef.current,
        url: swaggerUrl,
        layout: 'BaseLayout',
        presets: [SwaggerUIBundle.presets.apis],
      })

      cleanup = () => {
        swagger?.destroy?.()

        if (containerRef.current) {
          containerRef.current.innerHTML = ''
        }
      }
    }

    if (window.SwaggerUIBundle) {
      initSwagger()
    } else {
      script = document.createElement('script')
      script.src = swaggerBundleUrl
      script.async = true
      script.onload = () => initSwagger()
      document.body.appendChild(script)
    }

    return () => {
      isMounted = false
      cleanup?.()
      script?.remove()
    }
  }, [])

  return (
    <>
      <StyledPageHeader title='data.development.swagger' />
      <Card>
        <div ref={containerRef} />
      </Card>
    </>
  )
}

export default Swagger
