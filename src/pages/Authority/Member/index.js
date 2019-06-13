import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'

import AuthorityMemberDetail from './detail'

import { getMemberListMOCK } from '../services'

@connect(() => ({}))
class AuthorityMember extends Component {
    state = {
        searchCondition: {}, // 搜索条件
        dataSrouce: [], // 表格数据
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        }, // 表格分页
    }

    componentDidMount() {
        this.fetchData()
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getMemberListMOCK({
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

    // 更新成员
    onUpdateMember = () => {
        this.setState({
            showDetial: true,
        })
    }

    // 删除成员
    onDeleteMember = () => {
        console.log('delete')
    }

    // 添加成员
    onAddMember = () => {
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
                            label: '用户名/姓名',
                            type: 'input',
                            key: 'name',
                        },
                        {
                            label: '所属角色',
                            type: 'select',
                            options: [{ key: 1, value: '选择1' }, { key: 2, value: '选择2' }],
                            key: 'role',
                        },
                    ]}
                    buttonGroup={[{ onSearch: this.handleFormSearch }]}
                />
                <ButtonGroup
                    secondary={[
                        {
                            text: '添加',
                            onClick: this.onAddMember,
                        },
                    ]}
                />
                <BasicTable
                    columns={[
                        {
                            title: '成员账号',
                            dataIndex: 'a',
                        },
                        {
                            title: '姓名',
                            dataIndex: 'c',
                        },
                        {
                            title: '手机号码',
                            dataIndex: 'd',
                        },
                        {
                            title: '所属角色',
                            dataIndex: 'e',
                        },
                        {
                            dataIndex: 'date1',
                            title: '添加时间',
                        },
                        {
                            dataIndex: 'date2',
                            title: '最后登录',
                        },
                        {
                            dataIndex: 'g',
                            title: '是否启用',
                        },
                        {
                            type: 'oprate',
                            buttons: [
                                { text: '关联角色' },
                                { text: '编辑', onClick: this.onUpdateMember },
                                { text: '删除', onClick: this.onDeleteMember },
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
                    title="添加 / 修改成员"
                    width="720px"
                    destroyOnClose
                    footer={null}
                    visible={showDetial}
                    onCancel={this.onHideDetial}
                >
                    <AuthorityMemberDetail />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default AuthorityMember
