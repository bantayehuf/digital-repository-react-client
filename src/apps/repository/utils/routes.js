import React from 'react';

const COMMON_ROLES = ["SUPER_ADMIN", "ADMIN", "ENCODER"];

const AddCollection = React.lazy(() => import('../pages/collections/components/AddCollection'));
const EditCollection = React.lazy(() => import('../pages/collections/components/EditCollection'));
const _collectionRoutes = [{
    path: '/repository/collections',
    exact: true,
    name: 'Collections',
    component: EditCollection,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/collections/add',
    exact: true,
    name: 'Add',
    component: AddCollection,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/collections/edit',
    exact: true,
    name: 'Edit',
    component: EditCollection,
    user_role: COMMON_ROLES
  },
];


const AddSubCollection = React.lazy(() => import('../pages/collections/components/AddSubCollection'));
const EditSubCollection = React.lazy(() => import('../pages/collections/components/EditSubCollection'));
const _subCollectionRoutes = [{
    path: '/repository/sub-collections',
    exact: true,
    name: 'Sub collections',
    component: EditSubCollection,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/sub-collections/add',
    exact: true,
    name: 'Add',
    component: AddSubCollection,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/sub-collections/edit',
    exact: true,
    name: 'Edit',
    component: EditSubCollection,
    user_role: COMMON_ROLES
  },
];

const AddItemType = React.lazy(() => import('../pages/item-type/components/AddItemType'));
const EditItemType = React.lazy(() => import('../pages/item-type/components/EditItemType'));
const _itemTypeRoutes = [{
    path: '/repository/item-type',
    exact: true,
    name: 'Item types',
    component: EditItemType,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/item-type/add',
    exact: true,
    name: 'Add',
    component: AddItemType,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/item-type/edit',
    exact: true,
    name: 'Edit',
    component: EditItemType,
    user_role: COMMON_ROLES
  },
];


const AddItem = React.lazy(() => import('../pages/items/components/AddItem'));
const MangeItems = React.lazy(() => import('../pages/items/components/ManageItem'));
const _itemsRoutes = [{
    path: '/repository/items',
    exact: true,
    name: 'Items',
    component: MangeItems,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/items/add',
    exact: true,
    name: 'Add',
    component: AddItem,
    user_role: COMMON_ROLES
  },
  {
    path: '/repository/items/manage',
    exact: true,
    name: 'Manage',
    component: MangeItems,
    user_role: COMMON_ROLES
  },
];


const ChangePassword = React.lazy(() => import('../pages/change-password/componets/ChangePassword'));
const _settingRoutes = [{
  path: '/repository/change-password',
  exact: true,
  name: 'Change Password',
  component: ChangePassword,
  user_role: COMMON_ROLES
}];


const Dashboard = React.lazy(() => import('../pages'));
const routes = [{
    path: '/repository',
    exact: true,
    name: 'Dashboard',
    component: Dashboard,
    user_role: COMMON_ROLES
  },

  ..._settingRoutes,
  ..._collectionRoutes,
  ..._subCollectionRoutes,
  ..._itemTypeRoutes,
  ..._itemsRoutes,
];

export default routes;