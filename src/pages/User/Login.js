import React, { Component } from 'react'
import { connect } from 'dva'
import { Checkbox, Alert } from 'antd'
import Login from '@/components/Login'

import { getCaptchaUrl } from './services'

import styles from './Login.less'

const { Tab, UserName, Password, GraphCaptcha, Submit } = Login

@connect(({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
    state = {
        type: 'account',
        rememberMe: true,

        ifFetchCaptcha: false,
        captchaImg: `${getCaptchaUrl}&temp=3.14`,
    }

    onTabChange = type => {
        this.setState({ type })
    }

    onGetCaptcha = () => {
        const timeTemp = Math.random()
        this.setState({ ifFetchCaptcha: true })

        // getCaptcha().then(res => {
        // const reader = new FileReader()
        // const blob = new Blob(res)
        // reader.readAsDataURL(blob)
        // const data = window.URL.createObjectURL(res)
        // const captchaImg = `data:image/jpeg;base64,${encodeURI(res)}`
        // console.log(captchaImg)
        // this.setState({
        //     ifFetchCaptcha: false,
        //     captchaImg,
        // })
        // })
        setTimeout(() => {
            this.setState({
                captchaImg: `${getCaptchaUrl}&temp=${timeTemp}`,
                ifFetchCaptcha: false,
            })
        }, 500)
    }

    handleSubmit = (err, values) => {
        const { rememberMe } = this.state
        const { dispatch } = this.props

        if (!err) {
            dispatch({
                type: 'login/login',
                payload: {
                    ...values,
                    rememberMe,
                },
            })
        }
    }

    changeAutoLogin = e => {
        this.setState({
            rememberMe: e.target.checked,
        })
    }

    renderMessage = content => (
        <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
    )

    render() {
        const { login, submitting } = this.props
        const { type, rememberMe, ifFetchCaptcha, captchaImg } = this.state

        return (
            <div className={styles.main}>
                <Login
                    defaultActiveKey={type}
                    onTabChange={this.onTabChange}
                    onSubmit={this.handleSubmit}
                    ref={form => {
                        this.loginForm = form
                    }}
                >
                    <Tab key="account" tab="账户密码登录">
                        {login.status === 'error' &&
                            login.type === 'account' &&
                            !submitting &&
                            this.renderMessage('账户或密码错误')}
                        <UserName
                            name="username"
                            placeholder="用户名"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名！',
                                },
                            ]}
                        />
                        <Password
                            name="password"
                            placeholder="密码"
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
                        <GraphCaptcha
                            name="validateCode"
                            placeholder="图形验证码"
                            onGetCaptcha={this.onGetCaptcha}
                            getCaptchaSecondText={ifFetchCaptcha}
                            getCaptchaButtonText={<img alt="图形验证码获取失败" src={captchaImg} />}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}
                        />
                    </Tab>
                    <div>
                        <Checkbox checked={rememberMe} onChange={this.changeAutoLogin}>
                            自动登录
                        </Checkbox>
                        {/* <a style={{ float: 'right' }} href="">忘记密码</a> */}
                    </div>
                    <Submit loading={submitting}>登录</Submit>
                    {/* <div className={styles.other}>
                        其他登录方式
                        <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
                        <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
                        <Icon type="weibo-circle" className={styles.icon} theme="outlined" />
                        <Link className={styles.register} to="/user/register">
                            注册账户
                        </Link>
                    </div> */}
                </Login>
            </div>
        )
    }
}

export default LoginPage
