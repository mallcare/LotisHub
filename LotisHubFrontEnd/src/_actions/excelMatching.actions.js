import { ExcelMatchConsts } from '../_constants';
import { excelMatchService } from '../_services';
import { alertActions } from '.';


/************************************Client API********************************************/
const upsert = (i) => {
    const request = (i) => { return { type: ExcelMatchConsts.UPSERT_REQUEST, i } }
    const success = (i) => { return { type: ExcelMatchConsts.UPSERT_SUCCESS, i } }
    const failure = (i) => { return { type: ExcelMatchConsts.UPSERT_FAILURE, i } }

    return dispatch => {
        dispatch(request(i));

        excelMatchService.upsert(i)
            .then(
                r => { 
                    dispatch(success(r));
                    //history.push('/login');
                    //alert('등록이 정상적으로 처리되었습니다');
                    dispatch(alertActions.success('등록이 정상적으로 처리되었습니다'));
                    //window.location.replace("/");
                    // clientService.getAll().then(
                    //     clients => {
                    //         dispatch(refresh(clients));
                    //     },
                    //     error => {
                    //         alert(error);
                    //         dispatch(failure(error.toString()));
                    //         //window.location.replace("/sign-in");
                    //     } 
                    // );
                },
                error => {
                    alert(error.toString());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}


const getAll = () => {
    
}


const getById = (id) => {

}


const _delete = (id) => {

}


export const excelMatchingActions = {
    upsert: upsert,
    delete: _delete
};
