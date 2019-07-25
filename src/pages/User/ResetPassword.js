import React, { Component } from 'react'
import { connect } from 'dva'
import md5 from 'md5'
import router from 'umi/router'
import { Alert, message } from 'antd'
import Login from '@/components/Login'

import { resetPassword } from './services'

import styles from './ResetPassword.less'

const { Password, Submit } = Login

@connect(({ login, loading }) => ({
    login,
    loading: loading.effects['login/login'],
}))
class LoginPage extends Component {
    state = {
        type: 'account',
    }

    // componentDidMount() {
    //     const { history } = this.props
    //     const userInfoStr = getUserToken()
    //     if (userInfoStr) {
    //         history.replace('/')
    //     }
    // }

    handleSubmit = (err, values) => {
        if (!err) {
            const { password } = values
            resetPassword({
                password: md5(password),
            }).then(res => {
                if (res && res.errcode === 0) {
                    message.success('修改成功')
                    router.push('/')
                }
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
                <div className={styles.topTitle}>重制密码</div>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form
                    }}
                >
                    <Password
                        name="password"
                        placeholder="请输入新密码"
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
                    <Submit loading={loading}>重制密码</Submit>
                </Login>
            </div>
        )
    }
}

export default LoginPage
