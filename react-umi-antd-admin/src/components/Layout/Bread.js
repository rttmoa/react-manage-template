import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'antd'
import { Link, withRouter } from 'umi'
import { t } from "@lingui/macro"
import iconMap from 'utils/iconMap'
import { queryAncestors } from 'utils'
import styles from './Bread.less'
const { pathToRegexp } = require('path-to-regexp')



@withRouter
class Bread extends PureComponent {
  generateBreadcrumbs = (paths) => {
    return paths.map((item, key) => {
      const content = item && (
        <Fragment>
          {item.icon && (
            <span style={{ marginRight: 4 }}>{iconMap[item.icon]}</span>
          )}
          {item.name}
        </Fragment>
      )

      return (
        item && (
          <Breadcrumb.Item key={key}>
            {paths.length - 1 !== key ? (
              <Link to={item.route || '#'}>{content}</Link>
            ) : (
              content
            )}
          </Breadcrumb.Item>
        )
      )
    })
  }
  render() {
    const { routeList, location } = this.props

    // Find a route that matches the pathname.
    const currentRoute = routeList.find(
      (_) => _.route && pathToRegexp(_.route).exec(location.pathname)
    )

    // Find the breadcrumb navigation of the current route match and all its ancestors.
    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
      : [
          routeList[0],
          {
            id: 404,
            name: t`Not Found`,
          },
        ]

    return (
      // vScripts.js:6523 Warning: [antd: Breadcrumb] `Breadcrumb.Item and Breadcrumb.Separator` is deprecated. Please use `items` instead.
      <Breadcrumb className={styles.bread}>
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
      // <Breadcrumb className={styles.bread} items={this.generateBreadcrumbs(paths)} />
    )
  }
}

Bread.propTypes = {
  routeList: PropTypes.array,
}

export default Bread
