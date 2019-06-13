import React, { Component } from 'react'
import { Upload, Icon, Button } from 'antd'

class FileUpload extends Component {
    state = {}

    render() {
        const { ...params } = this.state

        // TODO: 封装一下 action的功能
        return (
            <Upload accept=".jpg,.png" action="//47.97.180.197:89" {...params}>
                <Button>
                    <Icon type="upload" /> 选择上传文件
                </Button>
            </Upload>
        )
    }
}

export default FileUpload
