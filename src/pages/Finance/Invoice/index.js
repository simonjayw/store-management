import React, { Component } from 'react'
import { connect } from 'dva'

import DynamicGeneratePage from '@/components/DynamicGeneratePage'

@connect(() => ({}))
class FinanceInvoice extends Component {
    render() {
        return <DynamicGeneratePage cid="BC4C58CBD16DEDD23H" />
    }
}

export default FinanceInvoice
