import React, { Component, Fragment } from 'react'
import { connect } from 'dva'
import { Icon } from 'antd'
import GlobalFooter from '@/components/GlobalFooter'
import DocumentTitle from 'react-document-title'
import styles from './UserLayout.less'
import getPageTitle from '@/utils/getPageTitle'

const copyright = (
    <Fragment>
        Copyright <Icon type="copyright" /> 2019 门店管理
    </Fragment>
)

class UserLayout extends Component {
    componentDidMount() {
        // const {
        //     dispatch,
        //     route: { routes, authority },
        // } = this.props
        // dispatch({
        //     type: 'menu/getMenuData',
        //     payload: { routes, authority },
        // })
    }

    render() {
        const {
            children,
            location: { pathname },
            breadcrumbNameMap,
        } = this.props
        return (
            <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
                <div className={styles.container}>
                    <div className={styles.lang} />
                    <div className={styles.content}>{children}</div>
                    <GlobalFooter copyright={copyright} />
                </div>
            </DocumentTitle>
        )
    }
}

export default connect(({ menu: menuModel }) => ({
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
}))(UserLayout)
