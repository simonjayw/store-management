import React, { Component } from 'react'
import { connect } from 'dva'

import DynamicGeneratePage from '@/components/DynamicGeneratePage'

@connect(() => ({}))
class SettingStore extends Component {
    render() {
        return <DynamicGeneratePage cid="B83F35A66DC5241A3M" />
    }
}

export default SettingStore
