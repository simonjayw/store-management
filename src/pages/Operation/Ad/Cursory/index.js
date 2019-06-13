import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'

import OperationAdCursoryDetail from './detail'

import { getCursoryListMOCK } from '../../services'

@connect(() => ({}))
class OperationAdCursory extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页

        showDetial: false,
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getCursoryListMOCK({
            size: pagination.pageSize,
            index: pageNum || pagination.current,
            ...searchCondition,
            ...params,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    dataSrouce: res.data,
                    pagination: {
                        ...pagination,
                        total: res.pages.count,
                    },
                })
            }
        })
    }

    // 查询表单搜索
    handleFormSearch = values => {
        const { pagination } = this.state

        this.setState(
            {
                searchCondition: values,
                pagination: {
                    ...pagination,
                    current: 1,
                },
            },
            () => {
                this.fetchData()
            }
        )
    }

    // 切换分页
    handleChangePage = page => {
        const { pagination } = this.state

        this.setState(
            {
                pagination: {
                    ...pagination,
                    current: page,
                },
            },
            () => {
                this.fetchData({
                    pageNum: page,
                })
            }
        )
    }

    // 更新广告
    onUpdateAd = () => {
        this.setState({
            showDetial: true,
        })
    }

    // 删除广告
    onDeleteAd = () => {
        console.log('delete')
    }

    // 添加广告
    onAddAd = () => {
        this.setState({
            showDetial: true,
        })
    }

    // 关闭详情内容
    onHideDetial = () => {
        this.setState({
            showDetial: false,
        })
    }

    render() {
        const { dataSrouce, pagination, showDetial } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '广告名称',
                            type: 'input',
                            key: 'adName',
                        },
                        {
                            label: '广告时间',
                            type: 'datepicker',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'adTime',
                        },
                        {
                            label: '到期时间',
                            type: 'datepicker',
                            key: 'endTime',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '编号',
                            dataIndex: 'id1',
                        },
                        {
                            title: '广告名称',
                            dataIndex: 'a',
                        },
                        {
                            title: '广告内容',
                            dataIndex: 'b',
                        },
                        {
                            title: '时间',
                            dataIndex: 'date1',
                        },
                        {
                            title: '上线/下线',
                            dataIndex: 'out',
                        },
                        {
                            type: 'oprate',
                            buttons: [
                                { text: '编辑', onClick: this.onUpdateAd },
                                { text: '删除', onClick: this.onDeleteAd },
                            ],
                        },
                    ]}
                    dataSource={dataSrouce}
                    pagination={{
                        ...pagination,
                        onChange: this.handleChangePage,
                    }}
                />
                <Modal
                    title="添加 / 修改广告"
                    width="720px"
                    destroyOnClose
                    footer={null}
                    visible={showDetial}
                    onCancel={this.onHideDetial}
                >
                    <OperationAdCursoryDetail />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default OperationAdCursory
