import React, { Component } from 'react'
import { connect } from 'dva'

import DynamicGeneratePage from '@/components/DynamicGeneratePage'

@connect(() => ({}))
class FinanceCash extends Component {
    render() {
        return <DynamicGeneratePage cid="0EE473A9EB18F4553J" />
    }
}

export default FinanceCash
