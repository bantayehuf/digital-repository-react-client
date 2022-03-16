import {
  BsSpeedometer2,
  BsListStars,
  BsPlusLg,
  BsFillPencilFill,
  BsListNested,
  BsBox,
  BsJournalText,
  BsServer
} from "react-icons/bs";

const _collectionsNav = [{
    _tag: 'CSidebarNavTitle',
    _children: ['Collections']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Collection',
    route: '/repository/collections',
    icon: < BsListStars className = "c-sidebar-nav-icon" / > ,
    _children: [{
        _tag: 'CSidebarNavItem',
        name: 'Add',
        to: '/repository/collections/add',
        icon: < BsPlusLg className = "mr-2" / > ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Edit',
        to: '/repository/collections/edit',
        icon: < BsFillPencilFill className = "mr-2" / > ,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Sub collection',
    route: '/repository/sub-collections',
    icon: < BsListNested className = "c-sidebar-nav-icon" / > ,
    _children: [{
        _tag: 'CSidebarNavItem',
        name: 'Add',
        to: '/repository/sub-collections/add',
        icon: < BsPlusLg className = "mr-2" / > ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Edit',
        to: '/repository/sub-collections/edit',
        icon: < BsFillPencilFill className = "mr-2" / > ,
      },
    ],
  },
];


const _itemsNav = [{
    _tag: 'CSidebarNavTitle',
    _children: ['Items']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Item type',
    route: '/repository/item-type',
    icon: < BsBox className = "c-sidebar-nav-icon" / > ,
    _children: [{
        _tag: 'CSidebarNavItem',
        name: 'Add',
        to: '/repository/item-type/add',
        icon: < BsPlusLg className = "mr-2" / > ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Edit',
        to: '/repository/item-type/edit',
        icon: < BsFillPencilFill className = "mr-2" / > ,
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Item',
    route: '/repository/items',
    icon: < BsJournalText className = "c-sidebar-nav-icon" / > ,
    _children: [{
        _tag: 'CSidebarNavItem',
        name: 'Add',
        to: '/repository/items/add',
        icon: < BsPlusLg className = "mr-2" / > ,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Manage',
        to: '/repository/items/manage',
        icon: < BsServer className = "mr-2" / > ,
      },
    ],
  },
];

const _navItems = [{
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/repository',
    icon: < BsSpeedometer2 className = "c-sidebar-nav-icon" / > ,
  },

  ..._collectionsNav,
  ..._itemsNav,
];

export default _navItems;