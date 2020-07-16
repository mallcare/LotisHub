import React, { useEffect, useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table'
import { clientActions } from '../../_actions';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import UpdateClientDialog from './updateDialog';

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
  }
}));


const ClientList = props => {
  const classes   = useStyles();
  const clients   = useSelector(state => state.clients.clients);
  const isLoading = useSelector(state => state.clients.loading);
  const dispatch  = useDispatch();

  const [columns, setColumns] = useState([
    { field: 'client_code', title: '거래처코드', initialEditValue: 'initial edit value', width: 100 },
    { field: 'client_name', title: '거래처명', width: 200 },
    { field: 'owner_name', title: '대표자성명', width: 100 },
    { field: 'superviser_code', title: '주관사코드', width: 200 },
    { field: 'courier_contract_code', title: '택배계약코드', width: 200 },
  ]);
  const [clientInfo, setClientInfo] = useState({})
  const [editorOpen, setEditorOpen] = useState(false)

  useEffect(() => {
    dispatch(clientActions.getAll());
    
  }, [dispatch]);

  const actions = [
    {
      icon: Edit,
      tooltip: '거래처 정보 수정',
      onClick: (event, rowData) => {
        setEditorOpen(true)
        setClientInfo(rowData)
      }
    },
  ];

  const RegistClient = newClient => new Promise((resolve, reject) => {
    setTimeout(() => {
      
      dispatch(clientActions.register(newClient));
      
      resolve();
    }, 100)
  });

  const UnregistClient = client => new Promise((resolve, reject) => {
    setTimeout(() => {

      dispatch(clientActions.delete(client.client_id));

      resolve()
    }, 100)
  })

  const CloseEditor = () => {
    setEditorOpen(false)
  }

  return (
    <div style={{ maxWidth: "100%" }} className={classes.root}>
      <MaterialTable
        title="거래처 조회"
        icons={tableIcons}
        columns={columns}
        data={clients}
        isLoading={isLoading}
        editable={{
          onRowAdd: RegistClient,
          onRowDelete: UnregistClient ,
        }}
        actions={actions}
        options={{
          actionsColumnIndex: -1,
          exportButton: true
        }}
        localization={{
          pagination: {
              labelDisplayedRows: '{from}-{to} of {count}'
          },
          toolbar: {
              addRemoveColumns: '추가',
              nRowsSelected: '{0} row(s) selected',
              exportTitle: 'Export',
              exportAriaLabel: 'Export',
              exportName: '엑셀 출력',
              searchTooltip: '검색',
              searchPlaceholder: '검색'
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
                deleteText: '고객사 정보를 삭제하시겠습니까?',
                cancelTooltip: '취소',
                saveTooltip: '저장',
                editTooltip: '수정'
                },
            addTooltip: "고객사 정보 등록",
            deleteTooltip: "삭제",
            editTooltip: "수정"
          }
        }}
      />
      <UpdateClientDialog open={editorOpen} client={clientInfo} close={CloseEditor} />
    </div>
  );

};

export default ClientList;