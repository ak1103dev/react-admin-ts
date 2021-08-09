import React from 'react'
import 'antd/dist/antd.less'
import { DatePicker, Button } from 'antd'

function App(): JSX.Element {
  return (
    <div>
      <DatePicker />
      <div>
        <Button type="primary">Hello</Button>
      </div>
    </div>
  )
}

export default App
