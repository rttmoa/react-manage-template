module.exports = {
    data: {
        list: [
            {
                id: '1',
                deptName: '杭州市',
                deptCode: '370200000000',
                children: [
                    {
                        id: '10416',
                        parentCode: '370200000000',
                        deptName: '下城区',
                        deptCode: '370202000000',
                        children: [
                            {
                                id: '10541',
                                parentCode: '370202000000',
                                deptName: '文一路',
                                deptCode: '370202140000',
                            },
                            {
                                id: '10401',
                                parentCode: '370202000000',
                                deptName: '文二路',
                                deptCode: '370202150000',
                            },
                            {
                                id: '10398',
                                parentCode: '370202000000',
                                deptName: '古翠路',
                                deptCode: '370202230000',
                                children: [
                                    {
                                        id: '10628',
                                        parentCode: '370202230000',
                                        deptName: '文三路',
                                        deptCode: '370202230001',
                                    },
                                    {
                                        id: '10629',
                                        parentCode: '370202230000',
                                        deptName: '文晖路',
                                        deptCode: '370202230002',
                                    },
                                ],
                            },
                            {
                                id: '10537',
                                parentCode: '370202000000',
                                deptName: '丰潭路',
                                deptCode: '370202240000',
                            },
                        ],
                    },
                ],
            },
            {
                id: '2',
                deptName: '上海市',
                deptCode: '62000',
                children: [
                    {
                        id: '10412346',
                        parentCode: '62000',
                        deptName: '徐汇区',
                        deptCode: '65000',
                        children: [
                            {
                                id: '105412',
                                parentCode: '65000',
                                deptName: '吴中路',
                                deptCode: '65001',
                            },
                            {
                                id: '104012',
                                parentCode: '65000',
                                deptName: '古北路',
                                deptCode: '65002',
                            },
                            {
                                id: '103984',
                                parentCode: '65000',
                                deptName: '龙漕路',
                                deptCode: '65003', 
                            },
                            {
                                id: '105373',
                                parentCode: '65000',
                                deptName: '漕溪路',
                                deptCode: '65005',
                                children: [
                                  {
                                      id: '106281',
                                      parentCode: '65005',
                                      deptName: '漕溪北路',
                                      deptCode: '650051',
                                  },
                                  {
                                      id: '106292',
                                      parentCode: '65005',
                                      deptName: '漕溪南路',
                                      deptCode: '650052',
                                  },
                              ],
                            },
                        ],
                    },
                    {
                      id: '104123456',
                      parentCode: '62000',
                      deptName: '虹口区',
                      deptCode: '66000',
                      children:[]
                    }
                ],
            },
        ],
    },
    msg: '',
    errorCode: '',
    status: 1,
};
