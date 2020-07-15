import React, { useEffect, useState, forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
    Button, Select, Typography, MenuItem, InputLabel, TextField, Tooltip, IconButton,
    FormControl, FormHelperText,
    Dialog, DialogContent, DialogActions, DialogTitle,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails
} from '@material-ui/core';

import { Edit } from '@material-ui/icons';

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
    
}));

const UpdateClientDialog = props => {
    const classes   = useStyles();

    const [client, setClient] =  useState({
        client_code: "",
    });

    useEffect(() => {
        setClient(props.client);
    }, [props.open]);
    

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
                                value={client.client_code}
                                onChange={(e) => {
                                    setClient({...client, client_code: e.targetvalue})
                                }} />
                            <TextField 
                                label="거래처명"
                                placeholder=""
                                value={client.client_name}
                                onChange={(e) => {
                                    setClient({...client, client_name: e.targetvalue})
                                }} />
                            <TextField 
                                label="소유자명"
                                placeholder=""
                                value={client.owner_name}
                                onChange={(e) => {
                                    setClient({...client, owner_name: e.targetvalue})
                                }} />
                            <TextField 
                                label="대표자명"
                                placeholder=""
                                value={client.representative_name}
                                onChange={(e) => {
                                    setClient({...client, representative_name: e.targetvalue})
                                }} />
                        </form>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="사업장주소"
                                placeholder=""
                                value={client.office_address}
                                onChange={(e) => {
                                    setClient({...client, office_address: e.targetvalue})
                                }} />
                            <TextField 
                                label="우편번호"
                                placeholder=""
                                value={client.office_zipcode}
                                onChange={(e) => {
                                    setClient({...client, office_zipcode: e.targetvalue})
                                }} />
                            <TextField 
                                label="전화번호"
                                placeholder=""
                                value={client.office_phonenumber}
                                onChange={(e) => {
                                    setClient({...client, office_phonenumber: e.targetvalue})
                                }} />
                        </form>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="기준단가"
                                placeholder=""
                                value={client.base_unit_cost}
                                onChange={(e) => {
                                    setClient({...client, base_unit_cost: e.targetvalue})
                                }} />
                            <TextField 
                                label="포장재료비"
                                placeholder=""
                                value={client.packing_unit_cost}
                                onChange={(e) => {
                                    setClient({...client, packing_unit_cost: e.targetvalue})
                                }} />
                            <TextField 
                                label="반송배송비"
                                placeholder=""
                                value={client.return_shipping_cost}
                                onChange={(e) => {
                                    setClient({...client, return_shipping_cost: e.targetvalue})
                                }} />
                            <TextField 
                                label="CJ계약단가"
                                placeholder=""
                                value={client.cj_contract_unit_cost}
                                onChange={(e) => {
                                    setClient({...client, cj_contract_unit_cost: e.targetvalue})
                                }} />
                                
                            <TextField 
                                label="착불금액"
                                placeholder=""
                                value={client.on_delivery_cost}
                                onChange={(e) => {
                                    setClient({...client, on_delivery_cost: e.targetvalue})
                                }} />
                            <TextField 
                                label="Picking"
                                placeholder=""
                                value={client.picking}
                                onChange={(e) => {
                                    setClient({...client, picking: e.targetvalue})
                                }} />
                            <TextField 
                                label="한진운임타입"
                                placeholder=""
                                value={client.hanjin_boxtype}
                                onChange={(e) => {
                                    setClient({...client, hanjin_boxtype: e.targetvalue})
                                }} />
                            <TextField 
                                label="CJ박스타입"
                                placeholder=""
                                value={client.cj_boxtype}
                                onChange={(e) => {
                                    setClient({...client, cj_boxtype: e.targetvalue})
                                }} />
                            <TextField 
                                label="입고비"
                                placeholder=""
                                value={client.input_cost}
                                onChange={(e) => {
                                    setClient({...client, input_cost: e.targetvalue})
                                }} />
                            <TextField 
                                label="출고비"
                                placeholder=""
                                value={client.output_cost}
                                onChange={(e) => {
                                    setClient({...client, output_cost: e.targetvalue})
                                }} />
                            <TextField 
                                label="항공료"
                                placeholder=""
                                value={client.airfare}
                                onChange={(e) => {
                                    setClient({...client, airfare: e.targetvalue})
                                }} />
                            <TextField 
                                label="택배계약코드"
                                placeholder=""
                                value={client.courier_contract_code}
                                onChange={(e) => {
                                    setClient({...client, courier_contract_code: e.targetvalue})
                                }} />
                            <TextField 
                                label="담당자"
                                placeholder=""
                                value={client.superviser_code}
                                onChange={(e) => {
                                    setClient({...client, superviser_code: e.targetvalue})
                                }} />
                            <TextField 
                                label="세금계산서일"
                                placeholder=""
                                value={client.tax_invoice_date}
                                onChange={(e) => {
                                    setClient({...client, tax_invoice_date: e.targetvalue})
                                }} />
                            <TextField 
                                label="서비스개시일"
                                placeholder=""
                                value={client.service_start_date}
                                onChange={(e) => {
                                    setClient({...client, service_start_date: e.targetvalue})
                                }} />
                            <TextField 
                                label="서비스종료일"
                                placeholder=""
                                value={client.service_end_date}
                                onChange={(e) => {
                                    setClient({...client, service_end_date: e.targetvalue})
                                }} />
                        </form>
                    </DialogContent>
                    <DialogActions className="mx-32">
                        <Button 
                            disabled={false}
                            variant="outlined">저장
                        </Button>
                        <Button onClick={() => props.close()} variant="outlined">취소</Button>
                    </DialogActions>
                </Dialog>
    </div>);

};

export default UpdateClientDialog;

