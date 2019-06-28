import React, { Component } from 'react'
import { connect } from 'dva'
import { Alert } from 'antd'
import Login from '@/components/Login'

import { getUserToken } from '@/utils/token'

import styles from './Login.less'

const { UserName, Password, Submit } = Login

@connect(({ login, loading }) => ({
    login,
    loading: loading.effects['login/login'],
}))
class LoginPage extends Component {
    state = {
        type: 'account',
    }

    componentDidMount() {
        const { history } = this.props
        const userInfoStr = getUserToken()
        if (userInfoStr) {
            history.replace('/')
        }
    }

    handleSubmit = (err, values) => {
        if (!err) {
            const { mobile, password } = values
            const { dispatch } = this.props
            dispatch({
                type: 'login/login',
                payload: {
                    mobile,
                    password,
                },
            })
        }
    }

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    )

    render() {
        const { type } = this.state
        const { loading } = this.props

        return (
            <div className={styles.main}>
                <div className={styles.topTitle}>门店管理系统</div>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form
                    }}
                >
                    {/* {login.status === 'error' &&
                            login.type === 'account' &&
                            !submitting &&
                            this.renderMessage('账户或密码错误')} */}
                    <UserName
                        name="mobile"
                        placeholder="请输入用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名！',
                            },
                        ]}
                    />
                    <Password
                        name="password"
                        placeholder="请输入登录密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！',
                            },
                        ]}
                        onPressEnter={e => {
                            e.preventDefault()
                            this.loginForm.validateFields(this.handleSubmit)
                        }}
                    />
                    <Submit loading={loading}>登录</Submit>
                </Login>
            </div>
        )
    }
}

export default LoginPage
