const menuItems = {
  items: [
    {
      id: 'chuc-nang',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Chức năng',
          type: 'collapse',
          icon: 'feather icon-home',
          children: [
            {
              id: 'homepage',
              title: 'Homepage',
              type: 'item',
              icon: 'feather icon-home',
              url: '/admin/app/homepage'
            },
            {
              id: 'badges',
              title: 'Quản lý học phần',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/module'
            },
            {
              id: 'badges',
              title: 'Quản lý cấu trúc đề thi',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/teaching_group'
            }
          ]
        },
        {
          id: 'components',
          title: 'Quản lý hệ thống',
          type: 'collapse',
          icon: 'feather icon-home',
          children: [
            {
              id: 'homepage',
              title: 'Tài khoản',
              type: 'item',
              icon: 'feather icon-home',
              url: '/admin/app/auth'
            },
            {
              id: 'button',
              title: 'Hướng dẫn sử dụng',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/hdsd'
            },
            {
              id: 'badges',
              title: 'Đăng xuất',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/logout'
            }
          ]
        }
      ]
    },
    
  ]
};

export default menuItems;
