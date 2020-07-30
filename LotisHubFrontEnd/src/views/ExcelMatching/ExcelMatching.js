import React, { useEffect, useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table'
import { excelMatchingActions } from '../../_actions';
import { excelMatchService } from '../../_services'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Backup from '@material-ui/icons/Backup';
import List from '@material-ui/icons/List';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import { Button } from '@material-ui/core';
import AddMatchingLayout from './AddMatchingLayout'

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    },
    updownButton: {
        margin: theme.spacing(0.1),
    },
    updownIcon: {
        fontSize: 20,
    }
}));


const ExcelMatchingPage = props => {
    const classes   = useStyles();
    const dispatch  = useDispatch();

    const [matchingData, setExcel] = useState([
        { excel_column: "받는사람이름", courier_column: "받는사람이름"},
        { excel_column: "전화번호1", courier_column: "전화번호1"},
        { excel_column: "전화번호2", courier_column: "전화번호2"},
        { excel_column: "우편번호", courier_column: "우편번호"},
        { excel_column: "주소", courier_column: "주소"},
        { excel_column: "상품명", courier_column: "상품명"},
        { excel_column: "수량", courier_column: "수량"},
        { excel_column: "배송메세지", courier_column: "배송메세지"},
        { excel_column: "송장번호", courier_column: "송장번호"},
        { excel_column: "화물규격", courier_column: "화물규격"},
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const [columns, setColumns] = useState([
        { 
            title: '순서', 
            width: 50,
            editable: 'onAdd',
            render: (r) => {
                return (
                    <div>
                        <Button variant="contained" 
                            size="small" 
                            className={classes.updownButton}
                            onClick={() =>{
                                const from = r.tableData.id;

                                if(from !== 0){
                                    const to = from - 1;
                                    const reorder = [...matchingData];
                                    const tExcelColumn = matchingData[to].excel_column
                                    const tCourierColumn = matchingData[to].excel_column

                                    reorder[to].excel_column = matchingData[from].excel_column
                                    reorder[to].courier_column = matchingData[from].courier_column
                                    
                                    reorder[from].excel_column = tExcelColumn
                                    reorder[from].courier_column = tCourierColumn
                                    
                                    setExcel(reorder)
                                }
                            }}
                        >
                            <KeyboardArrowUp className={classes.updownIcon} />
                        </Button>
                        <Button variant="contained" 
                            size="small" 
                            className={classes.updownButton}
                            onClick={() =>{
                                const from = r.tableData.id;

                                if(from !== matchingData.length - 1){
                                    const to = from + 1;
                                    const reorder = [...matchingData];
                                    const tExcelColumn = matchingData[to].excel_column
                                    const tCourierColumn = matchingData[to].excel_column

                                    reorder[to].excel_column = matchingData[from].excel_column
                                    reorder[to].courier_column = matchingData[from].courier_column
                                    
                                    reorder[from].excel_column = tExcelColumn
                                    reorder[from].courier_column = tCourierColumn
                                    
                                    setExcel(reorder)
                                }
                            }}
                        >
                            <KeyboardArrowDown className={classes.updownIcon} />
                        </Button>
                    </div>
                )
            }
        },
        { 
            field: 'excel_column', 
            title: '컬렁명', 
            initialEditValue: '', 
            width: 100,
            editable: 'onAdd',
            // render: (r) => {
            //     return <TextField 
            //         name="excel_column"
            //     />
            // }
        },
        { 
            field: 'courier_column', 
            title: '택배사 컬렁명',
            initialEditValue: '', 
            width: 200,
            // render: (r) => {
            //     return <TextField 
            //         name="courier_column"
            //     />
            // }
        },
    ]);

    const actions = [
        {
            icon: List,
            tooltip: '레이아웃 초기화',
            isFreeAction: true,
            onClick: (event) => {
                setExcel([
                    { excel_column: "받는사람이름", courier_column: "받는사람이름"},
                    { excel_column: "전화번호1", courier_column: "전화번호1"},
                    { excel_column: "전화번호2", courier_column: "전화번호2"},
                    { excel_column: "우편번호", courier_column: "우편번호"},
                    { excel_column: "주소", courier_column: "주소"},
                    { excel_column: "상품명", courier_column: "상품명"},
                    { excel_column: "수량", courier_column: "수량"},
                    { excel_column: "배송메세지", courier_column: "배송메세지"},
                    { excel_column: "송장번호", courier_column: "송장번호"},
                    { excel_column: "화물규격", courier_column: "화물규격"},
                ]);
            }
        },
        {
            icon: Backup,
            tooltip: '매칭 저장하기',
            isFreeAction: true,
            onClick: (event) => setOpenAddDialog(true)
        },
        {
            icon: Search,
            tooltip: '레이아웃 찾기',
            isFreeAction: true,
            onClick: (event) => alert("You want to add a new row")
        },

    ];

    useEffect(() => {
        

    }, [matchingData]);


    const AddColumn = newColumn => new Promise((resolve, reject) => {
        setTimeout(() => {
            //
            const newMatching = [...matchingData];
            let isVaild = true;
            newMatching.forEach((e) => {
                if(e.excel_column === newColumn.excel_column){
                    alert("동일한 컬렁명을 사용할 수 없습니다.");
                    isVaild = false;
                    return;
                }
            })

            if(isVaild){
                newMatching.push(newColumn);
                setExcel(newMatching);
            }

            resolve();
        }, 100)
    });

    const DeleteColumn = d => new Promise((resolve, reject) => {
        setTimeout(() => {
            setExcel(matchingData.filter( c => c.excel_column !== d.excel_column));
            resolve();
        }, 100)
    })

    const UpdateColumn = (newData, oldData) => new Promise((resolve, reject) => {
        setTimeout(() => {
            // const dataUpdate = [...matchingData];
            // const index = oldData.tableData.id;
            // dataUpdate[index] = newData;
            
            // setExcel([...dataUpdate]);

            resolve();
        }, 100);
    })

    const CloseAddDialog = () => {
        setOpenAddDialog(false);
    }

    const saveMatching = (layout) => {
        excelMatchService.getByName(layout.name)
        .then(
            found => {
                if(!found) {
                    dispatch(excelMatchingActions.upsert({
                        layout: layout,
                        matchings: matchingData
                    }));
                } else {
                    if(window.confirm("기존 이름이 있습니다.\n 덮어쓰기 하시겠습니까?")) {
                        dispatch(excelMatchingActions.upsert({
                            layout: layout,
                            matchings: matchingData
                        }));
                    }
                }
            },
            error => {
                alert(error.toString());
            }
        )
        
    }

    return (
    <div style={{ maxWidth: "100%" }} className={classes.root}>
        <MaterialTable
            title="택배사 엑셀 레이아웃 매칭"
            icons={tableIcons}
            columns={columns}
            data={matchingData}
            isLoading={isLoading}
            editable={{
                onRowAdd: AddColumn,
                onRowDelete: DeleteColumn ,
                onRowUpdate: UpdateColumn ,
            }}
            actions={actions}
            options={{
                actionsColumnIndex: -1,
                search: false,
                paging: false,
            }}
            localization={{
                toolbar: {
                    addRemoveColumns: '추가',
                },
                header: {
                    actions: ''
                },
                body: {
                emptyDataSourceMessage: 'No records to display',
                filterRow: {
                    filterTooltip: 'Filter'
                },
                editRow: {
                    cancelTooltip: '취소',
                    saveTooltip: '저장',
                    editTooltip: '수정'
                    },
                addTooltip: "컬럼 등록",
                deleteTooltip: "삭제",
                editTooltip: "수정"
                }
            }}
        />
        <AddMatchingLayout open={openAddDialog} save={saveMatching} close={CloseAddDialog} />
    </div>
    );

};

export default ExcelMatchingPage;