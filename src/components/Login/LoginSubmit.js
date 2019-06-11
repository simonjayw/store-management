import React from 'react'
import classNames from 'classnames'
import { Form } from 'antd'
import Button from '@/components/Button'
import styles from './index.less'

const FormItem = Form.Item

const LoginSubmit = ({ className, ...rest }) => {
    const clsString = classNames(styles.submit, className)
    return (
        <FormItem>
            <Button
                width="100%"
                size="large"
                className={clsString}
                type="primary"
                htmlType="submit"
                {...rest}
            />
        </FormItem>
    )
}

export default LoginSubmit
