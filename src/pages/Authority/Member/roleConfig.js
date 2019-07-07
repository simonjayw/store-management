import React, { Component, Fragment } from 'react'
import { Checkbox } from 'antd'

import ButtonGroup from '@/components/ButtonGroup'

class RoleConfigModal extends Component {
    state = {
        roles: [],
        checkedData: [],
    }

    componentDidMount() {
        const {
            roles: { roles, values },
        } = this.props
        this.setState({
            roles: roles || [],
            checkedData: values || [],
        })
    }

    handleConfirm = () => {
        const { checkedData } = this.state
        const { record, onConfirm } = this.props

        const data = {
            id: record.id,
            roles: checkedData.join(','),
        }
        onConfirm(data)
    }

    onChangeCheck = (id, e) => {
        let { checkedData } = this.state
        const { checked } = e.target

        if (checked) {
            checkedData.push(id)
        } else {
            checkedData = checkedData.filter(i => i !== id)
        }

        this.setState({
            checkedData,
        })
    }

    render() {
        const { roles, checkedData } = this.state

        return (
            <Fragment>
                <div style={{ marginBottom: 30 }}>
                    {roles.map(item => (
                        <Checkbox
                            key={item.id}
                            checked={checkedData.includes(item.id)}
                            onChange={e => this.onChangeCheck(item.id, e)}
                        >
                            {item.name}
                        </Checkbox>
                    ))}
                </div>
                <ButtonGroup
                    align="center"
                    primary={[
                        {
                            text: '提交',
                            onClick: this.handleConfirm,
                        },
                    ]}
                />
            </Fragment>
        )
    }
}

export default RoleConfigModal
