import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader, Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router'
import { useLocalization } from '../contexts/LocalizationContext'

interface Props {
  title?: string
  subTitle?: string
  editPath?: string
  createPath?: string
  listPath?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: any[]
  children: JSX.Element[] | JSX.Element
  shownBack?: boolean
}

const PageLayout = ({
  title,
  subTitle = '',
  editPath,
  createPath,
  listPath,
  extra = [],
  children,
  shownBack = true,
}: Props): JSX.Element => {
  const { t } = useLocalization()
  const history = useHistory()
  const myExtra = []
  if (listPath) {
    myExtra.push(
      <Button key="view" onClick={() => history.push(listPath)}>
        {t('pageLayout.viewAll')}
      </Button>
    )
  }
  if (editPath) {
    myExtra.push(
      <Button key="edit" type="primary" onClick={() => history.push(editPath)}>
        {t('pageLayout.edit')}
      </Button>
    )
  }
  if (createPath) {
    myExtra.push(
      <Button key="new" type="primary" onClick={() => history.push(createPath)}>
        {t('pageLayout.new')}
      </Button>
    )
  }
  return (
    <PageHeader
      onBack={() => history.goBack()}
      backIcon={shownBack ? <ArrowLeftOutlined /> : false}
      title={title}
      subTitle={subTitle}
      extra={[...extra, ...myExtra]}
      // breadcrumb={{routes}}
      style={{ backgroundColor: 'white' }}
    >
      {children}
    </PageHeader>
  )
}

PageLayout.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  editPath: PropTypes.string,
  createPath: PropTypes.string,
  listPath: PropTypes.string,
  extra: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  shownBack: PropTypes.bool,
}

export default PageLayout
