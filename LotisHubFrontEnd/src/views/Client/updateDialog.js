import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { 
    Button, TextField,
    Dialog, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import { clientActions } from '../../_actions';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: "100%" 
    },
    clientInputs: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
        fontSize: 20,
    },
    
}));

const UpdateClientDialog = props => {
    const classes   = useStyles();
    const dispatch  = useDispatch();

    const [client, setClient] =  useState({});

    useEffect(() => {
        setClient(props.client);
    }, [props.open]);

    const save = () => {
        dispatch(clientActions.update(client));
        props.close();
    }

    const handleInputChange = e => {
        const {name, value} = e.target
        setClient({...client, [name]:value})
    }

    return (<div className={classes.root}>
                <Dialog open={props.open}
                        fullWidth={true}
                        maxWidth={'lg'}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">거래처 정보 수정하기</DialogTitle>
                    <DialogContent>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="거래처코드"
                                placeholder=""
                                name="client_code"
                                value={client.client_code}
                                onChange={handleInputChange} />
                            <TextField 
                                label="거래처명"
                                placeholder=""
                                name="client_name"
                                value={client.client_name}
                                onChange={handleInputChange} />
                            <TextField 
                                label="소유자명"
                                placeholder=""
                                name="owner_name"
                                value={client.owner_name}
                                onChange={handleInputChange} />
                            <TextField 
                                label="대표자명"
                                placeholder=""
                                name="representative_name"
                                value={client.representative_name}
                                onChange={handleInputChange} />
                        </form>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="사업장주소"
                                placeholder=""
                                name="office_address"
                                value={client.office_address}
                                onChange={handleInputChange} />
                            <TextField 
                                label="우편번호"
                                placeholder=""
                                name="office_zipcode"
                                value={client.office_zipcode}
                                onChange={handleInputChange} />
                            <TextField 
                                label="전화번호"
                                placeholder=""
                                name="office_phonenumber"
                                value={client.office_phonenumber}
                                onChange={handleInputChange} />
                        </form>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="기준단가"
                                placeholder=""
                                name="base_unit_cost"
                                value={client.base_unit_cost}
                                onChange={handleInputChange} />
                            <TextField 
                                label="포장재료비"
                                placeholder=""
                                name="packing_unit_cost"
                                value={client.packing_unit_cost}
                                onChange={handleInputChange} />
                            <TextField 
                                label="반송배송비"
                                placeholder=""
                                name="return_shipping_cost"
                                value={client.return_shipping_cost}
                                onChange={handleInputChange} />
                            <TextField 
                                label="CJ계약단가"
                                placeholder=""
                                name="cj_contract_unit_cost"
                                value={client.cj_contract_unit_cost}
                                onChange={handleInputChange} />
                                
                            <TextField 
                                label="착불금액"
                                placeholder=""
                                name="on_delivery_cost"
                                value={client.on_delivery_cost}
                                onChange={handleInputChange} />
                            <TextField 
                                label="Picking"
                                placeholder=""
                                name="picking"
                                value={client.picking}
                                onChange={handleInputChange} />
                            <TextField 
                                label="한진운임타입"
                                placeholder=""
                                name="hanjin_boxtype"
                                value={client.hanjin_boxtype}
                                onChange={handleInputChange} />
                            <TextField 
                                label="CJ박스타입"
                                placeholder=""
                                name="cj_boxtype"
                                value={client.cj_boxtype}
                                onChange={handleInputChange} />
                            <TextField 
                                label="입고비"
                                placeholder=""
                                name="input_cost"
                                value={client.input_cost}
                                onChange={handleInputChange} />
                            <TextField 
                                label="출고비"
                                placeholder=""
                                name="output_cost"
                                value={client.output_cost}
                                onChange={handleInputChange} />
                            <TextField 
                                label="항공료"
                                placeholder=""
                                name="airfare"
                                value={client.airfare}
                                onChange={handleInputChange} />
                            <TextField 
                                label="택배계약코드"
                                placeholder=""
                                name="courier_contract_code"
                                value={client.courier_contract_code}
                                onChange={handleInputChange} />
                            <TextField 
                                label="담당자"
                                placeholder=""
                                name="superviser_code"
                                value={client.superviser_code}
                                onChange={handleInputChange} />
                            <TextField 
                                label="세금계산서일"
                                placeholder=""
                                name="tax_invoice_date"
                                value={client.tax_invoice_date}
                                onChange={handleInputChange} />
                            <TextField 
                                label="서비스개시일"
                                placeholder=""
                                name="service_start_date"
                                value={client.service_start_date}
                                onChange={handleInputChange} />
                            <TextField 
                                label="서비스종료일"
                                placeholder=""
                                name="service_end_date"
                                value={client.service_end_date}
                                onChange={handleInputChange} />
                        </form>
                    </DialogContent>
                    <DialogActions className="mx-32">
                        <Button 
                            disabled={false}
                            variant="contained"
                            color="primary"
                            onClick={ () => {
                                save();
                            }} >
                            <SaveIcon className={classes.rightIcon} />
                                저장
                        </Button>
                        <Button onClick={() => props.close()} variant="outlined">취소</Button>
                    </DialogActions>
                </Dialog>
    </div>);

};

export default UpdateClientDialog;

