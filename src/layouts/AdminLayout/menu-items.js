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
              id: 'button',
              title: 'Danh mục độ khó',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/difficults'
            },
            {
              id: 'badges',
              title: 'Quản lý chuyên ngành',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/ology'
            },
            {
              id: 'badges',
              title: 'Quản lý lớp học',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/grade'
            },
            {
              id: 'badges',
              title: 'Quản lý giảng viên',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/teacher'
            },
            {
              id: 'badges',
              title: 'Quản lý sinh viên',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/student'
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
              title: 'Phân quyền nhóm giảng dạy',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/teaching-group'
            },
            {
              id: 'badges',
              title: 'Phê duyệt cấu trúc đề thi',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/exam-structure'
            },
            {
              id: 'badges',
              title: 'Phê duyệt ngân hàng câu hỏi',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/question-bank'
            },
            {
              id: 'badges',
              title: 'Phê duyệt đề thi',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/exam'
            },
            {
              id: 'badges',
              title: 'Tổ chức thi',
              type: 'item',
              icon: 'feather icon-box',
              url: '/admin/app/grades'
            },
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
