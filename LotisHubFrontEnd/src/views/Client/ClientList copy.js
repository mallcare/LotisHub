import React, { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table'

import AlertDialogAdd from '../../components/AlertDialog'
import AlertDialogUpdate from '../../components/AlertDialog'
import AlertDialogDelete from '../../components/AlertDialog'
import AlertDialog from '../../components/AlertDialog'

import { userActions } from '../../_actions';

//import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

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
    const classes = useStyles();

    //const [users] = useState(mockData);
    const dispatch = useDispatch();

    const [AddDialogOpen, setAddDialogOpen] = useState(false);
    const [UpdateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [DeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [RetValue, setRetDialogValue] = useState(false);

    
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
        { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
        {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
        },
    ]);

    const [data, setData] = useState([
        { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
        { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
    ]);

    function setOpen() {
        setAddDialogOpen(false);
        setUpdateDialogOpen(false);
        setDeleteDialogOpen(false);
    };

    function AddRow(data, oldData, newData) {
        console.log("add");
        //setDialogOpen(false);
        // 수정 Api 호출 후 결과에 따라 
        //const {data, oldData, newData } = props;

        // dispatch(userActions.resetPassword( formState.values.email ));
        
        //setData([...dataUpdate]);
    };

    function UpdateRow(data, oldData, newData) {
        console.log("Update");
        setRetDialogValue(true);

        //setDialogOpen(false);
        // 수정 Api 호출 후 결과에 따라 
        // dispatch(userActions.resetPassword( formState.values.email ));
        
        //setData([...dataUpdate]);
    };

    function DeleteRow(){
        //dispatch(userActions.DeleteClient( id, token ));

       // setDialogOpen(false);
    }

  return (
    <div style={{ maxWidth: "100%" }} className={classes.root}>
    <MaterialTable
      title="거래처 조회"
      icons={tableIcons}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
                // 등록 Api 호출 후 결과에 따라 
                setAddDialogOpen(true);
                setData([...data, newData]);
                
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              
                //setDialog([true, "거래처 정보 수정", "거래처 정보를 수정하시겠습니까?" ]);
                setUpdateDialogOpen(true);
                if( RetValue ){
                    console.log('return True');
                }
                else{
                    console.log('return False');
                }

                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;


              resolve();
            }, 10)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // 삭제 Api 호출 후 결과에 따라 
              setDeleteDialogOpen(true);

              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
    />

    <AlertDialogDelete
            title='거래처 정보 삭제'
            children='거래처 정보를 삭제하시겠습니까?'
            open={DeleteDialogOpen}
            setOpen={setOpen}
            onConfirm={DeleteRow}
            Agree="예"
            Disagree="아니요"
    />
    <AlertDialogUpdate
        title='거래처 정보 수정'
        children='거래처 정보를 수정하시겠습니까?'
        open={UpdateDialogOpen}
        setOpen={setOpen}
        onConfirm={UpdateRow}
        Agree="예"
        Disagree="아니요"
    />
    <AlertDialogAdd
        title='거래처 정보 추가'
        children='거래처 정보를 추가하시겠습니까?'
        open={AddDialogOpen}
        setOpen={setOpen}
        onConfirm={AddRow}
        Agree="예"
        Disagree="아니요"
    />
    {/* <AlertDialog
            title='거래처 정보 수정'
            children='거래처 정보를 수정하시겠습니까?'
            open={dialogOpen}
            setOpen={setOpen}
            onConfirm={deletePost}
            Agree="예"
            Disagree="아니요"
    /> */}

    </div>
  );


//   return (
//     <div className={classes.root}>
//       <UsersToolbar />
//       <div className={classes.content}>
//         <UsersTable users={users} />
//       </div>
//     </div>
//   );
};

export default ClientList;