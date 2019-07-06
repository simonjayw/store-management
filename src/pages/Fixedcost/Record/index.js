import React, { Component } from 'react'
import { connect } from 'dva'

import DynamicGeneratePage from '@/components/DynamicGeneratePage'

@connect(() => ({}))
class FixedcostRecord extends Component {
    render() {
        return (
            <DynamicGeneratePage
                cid="2B494B4143B725023K"
                pushColumns={[
                    {
                        title: '创建时间',
                        dataIndex: 'last_time',
                    },
                ]}
            />
        )
    }
}

export default FixedcostRecord
