import React, { useEffect, useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import MaterialTable from 'material-table'

//import AlertDialog from '../../components/AlertDialog'

import { productActions } from '../../_actions';

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


  

const ProductsList = props => {
    const classes = useStyles();


    const products = useSelector(state => state.products);

    const dispatch = useDispatch();

    const [data, setProductsData] = useState([]);
       
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [columns, setColumns] = useState([
      { field: 'item_id', title: '번호', width: 100 },
      { field: 'item_code', title: '물품코드', initialEditValue: 'initial edit value', width: 100 },
      { field: 'item_name', title: '물품이름', width: 100 },
      { field: 'model_name', title: '물품모델명', width: 100 },
      { field: 'unit_price', title: '물품단가', width: 100 },
      { field: 'shipping_unit_price', title: '물품배송단가', width: 100 },
      { field: 'items_stock', title: '물품재고수량', width: 100 },
    ]);

 
    useEffect(() => {
      dispatch(productActions.getAll());

      setProductsData(products.products);
      
    }, []);


    const localization = [
        {
            pagination: {
                labelDisplayedRows: '{from}-{to} of {count}'
            },
            toolbar: {
                nRowsSelected: '{0} row(s) selected'
            },
            header: {
                actions: '편집'
            },
            body: {
                emptyDataSourceMessage: 'No records to display',
                filterRow: {
                    filterTooltip: 'Filter'
            }
         }
        }
    ];



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
        //setDialogOpen(false);
        // 수정 Api 호출 후 결과에 따라 
        // dispatch(userActions.resetPassword( formState.values.email ));
        
        //setData([...dataUpdate]);
    };

    function DeleteRow(){
        
        // axios.delete(`http://localhost:3000/api/v1/product?id=${props}`)
        //     .then(
        //         res => {
        //              console.log('Deleted Successfully.');
        //          },
        //         error => {
        //         }    
    //       //dispatch(userActions.DeleteProduct( id, token ));
    //    // setDialogOpen(false);

            // );
    }

  return (
    <div style={{ maxWidth: "100%" }} className={classes.root}>
    <MaterialTable
      title="물품 조회"
      icons={tableIcons}
      columns={columns}
      data={data}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              //userActions.
              
              //setData([...data, newData]);
              
              resolve();
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
                if( window.confirm("물품 정보를 수정 하시겠습니까? " + newData.name) ){
                    console.log(newData);
                    //deleteHandler( event, rowData );
                }
                //userActions.
            //   const dataUpdate = [...data];
            //   const index = oldData.tableData.id;
            //   dataUpdate[index] = newData;
            //   setData([...dataUpdate]);

              resolve();
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              //setData([...dataDelete]);
              
              resolve()
            }, 1000)
          }),
      }}
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
            actions: '편집'
        },
        body: {
            emptyDataSourceMessage: 'No records to display',
            filterRow: {
                filterTooltip: 'Filter'

            },
        editRow: {
            deleteText: '물품 정보를 삭제하시겠습니까?',
            cancelTooltip: '취소',
            saveTooltip: '저장',
            editTooltip: '수정'
            },
        addTooltip: "물품 정보 등록",
        deleteTooltip: "삭제",
        editTooltip: "수정"
     }

    }}

    />

    </div>
  );



};

ProductsList.propTypes = {
  //loginUser: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  history: PropTypes.object,
  errors: PropTypes.string.isRequired
};

export default ProductsList;