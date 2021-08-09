import React from 'react'
import { Card, Space, Statistic, Row, Col } from 'antd'
import PageLayout from '../../layouts/PageLayout'

const Dashboard = (): JSX.Element => {
  return (
    <PageLayout title="Dashboard" shownBack={false}>
      <Space>
        <Card style={{ width: 300 }}>
          <Statistic title="Active Users" value={10} />
        </Card>
        <Card style={{ width: 300 }}>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Male" value={20} />
            </Col>
            <Col span={12}>
              <Statistic title="Female" value={30} />
            </Col>
          </Row>
        </Card>
      </Space>
    </PageLayout>
  )
}

export default Dashboard
