import React, { Component } from 'react'
import { connect } from 'dva'
import { Modal, Switch, message } from 'antd'

import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import SearchForm from '@/components/SearchForm'
import BasicTable from '@/components/BasicTable'
import ButtonGroup from '@/components/ButtonGroup'

import AuthorityMemberDetail from './detail'
import RoleConfig from './roleConfig'

import {
    getMemberList,
    addUpadteMember,
    changeMemberStatus,
    getRoleList,
    getMemberRoles,
    setMemberRoles,
} from '../services'

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
        roleData: [],
        showDetial: false,
        updateRecord: null,

        roleModal: false,
        roleRecord: [],
        memberRoles: [],
    }

    componentDidMount() {
        this.fetchData()

        getRoleList().then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    roleData: res.data,
                })
            }
        })
    }

    // 请求表格的数据
    fetchData = (parmas = {}) => {
        const { pageNum, ...params } = parmas
        const { pagination, searchCondition } = this.state

        getMemberList({
            // type:取值auth.type
            // mch_id:
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
                        total: res.pages ? res.pages.count : 0,
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
    onUpdateMember = record => {
        this.setState({
            showDetial: true,
            updateRecord: record,
        })
    }

    // 删除成员
    onDeleteMember = record => {
        Modal.confirm({
            title: '提示',
            content: '是否确认删除',
            onOk: () => {
                changeMemberStatus({
                    id: record.id,
                    action: 'delete',
                }).then(res => {
                    if (res && res.errcode === 0) {
                        message.success('操作成功')
                        this.fetchData()
                    }
                })
            },
        })
    }

    // 添加成员
    onAddMember = () => {
        this.setState({
            showDetial: true,
            updateRecord: null,
        })
    }

    // 关闭详情内容
    onHideDetial = () => {
        this.setState({
            showDetial: false,
            updateRecord: null,
        })
    }

    // 添加 / updaye
    handleConfirmDetial = data => {
        if (!data.remark) {
            delete data.remark
        }
        addUpadteMember(data).then(res => {
            if (res && res.errcode === 0) {
                message.success('操作成功')
                this.onHideDetial()
                this.fetchData()
            }
        })
    }

    // 成员启用停用
    handleChangeStatus = record => {
        changeMemberStatus({
            id: record.id,
            action: record.status === 0 ? 'disable' : 'enable',
        }).then(res => {
            if (res && res.errcode === 0) {
                message.success('操作成功')
                this.fetchData()
            }
        })
    }

    onShowMemberRoles = record => {
        getMemberRoles({
            id: record.id,
        }).then(res => {
            if (res && res.errcode === 0) {
                this.setState({
                    roleModal: true,
                    roleRecord: record,
                    memberRoles: res.data,
                })
            }
        })
    }

    onHideMemberRoles = () => {
        this.setState({
            roleModal: false,
            roleRecord: [],
            memberRoles: [],
        })
    }

    onConfirmMemberRoles = data => {
        setMemberRoles(data).then(res => {
            if (res && res.errcode === 0) {
                message.success('配置成功')
                this.onHideMemberRoles()
                this.fetchData()
            }
        })
    }

    render() {
        const {
            dataSrouce,
            pagination,
            showDetial,
            updateRecord,
            roleData,

            roleModal,
            roleRecord,
            memberRoles,
        } = this.state

        return (
            <PageHeaderWrapper>
                <SearchForm
                    data={[
                        {
                            label: '用户名/姓名',
                            type: 'input',
                            key: 'q',
                        },
                        {
                            label: '所属角色',
                            type: 'select',
                            options: roleData,
                            textFiled: 'name',
                            keyFiled: 'id',
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
                            dataIndex: 'acount',
                            render: (_, record) => record.mobile,
                        },
                        {
                            title: '姓名',
                            dataIndex: 'name',
                        },
                        {
                            title: '手机号码',
                            dataIndex: 'mobile',
                        },
                        {
                            title: '所属角色',
                            dataIndex: 'roles',
                            render: v => v.join(','),
                        },
                        {
                            dataIndex: 'create_time',
                            title: '添加时间',
                        },
                        {
                            title: '最后登录',
                            dataIndex: 'last_time',
                        },
                        {
                            dataIndex: 'status',
                            title: '是否启用',
                            render: (status, record) => (
                                <Switch
                                    checked={status === 0}
                                    checkedChildren="启用"
                                    unCheckedChildren="停用"
                                    onChange={() => this.handleChangeStatus(record)}
                                />
                            ),
                        },
                        {
                            type: 'oprate',
                            buttons: [
                                { text: '关联角色', onClick: this.onShowMemberRoles },
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
                    <AuthorityMemberDetail
                        record={updateRecord}
                        onConfirm={this.handleConfirmDetial}
                    />
                </Modal>
                <Modal
                    visible={roleModal}
                    title="关联角色"
                    destroyOnClose
                    onCancel={this.onHideMemberRoles}
                    footer={null}
                >
                    <RoleConfig
                        onConfirm={this.onConfirmMemberRoles}
                        record={roleRecord}
                        roles={memberRoles}
                    />
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default AuthorityMember
