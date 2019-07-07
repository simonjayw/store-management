import React, { Component } from 'react'
import { connect } from 'dva'

import DynamicGeneratePage from '@/components/DynamicGeneratePage'

@connect(() => ({}))
class OperationAdCarousel extends Component {
    render() {
        return <DynamicGeneratePage cid="2F724448AD40D0743F" />
    }
}

export default OperationAdCarousel
