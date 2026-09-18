import _ from 'lodash'
import styled from 'styled-components'
import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'

type ModelImageProps = {
  data?: {
    imageBase64?: string
    imageContentType?: string
    imageObjectKey?: string
  } | null
  loading?: boolean
}

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
  padding: 16px 0;
`

const ModelImg = styled.img`
  max-width: 100%;
  max-height: 480px;
  object-fit: contain;
`

function toDataUrl(base64?: string, contentType?: string) {
  if (!base64) return ''
  if (base64.startsWith('data:')) return base64
  const type = contentType || 'image/jpeg'
  return `data:${type};base64,${base64}`
}

function ModelImage({ data, loading }: ModelImageProps) {
  const imageBase64 = _.get(data, 'imageBase64', '')
  const imageContentType = _.get(data, 'imageContentType', 'image/jpeg')
  const imageObjectKey = _.get(data, 'imageObjectKey', '')
  const src = toDataUrl(imageBase64, imageContentType)

  if (loading || !src) {
    return null
  }

  return (
    <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='1'
        header='ui.selections.steps.model_detail.image'
      >
        <ImageWrap>
          <ModelImg src={src} alt={imageObjectKey || 'Model image'} />
        </ImageWrap>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default ModelImage
