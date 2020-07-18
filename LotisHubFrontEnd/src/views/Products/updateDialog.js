import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { 
    Button, TextField,
    Dialog, DialogContent, DialogActions, DialogTitle,
} from '@material-ui/core';

import SaveIcon from '@material-ui/icons/Save';
import { productActions } from '../../_actions';

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

const UpdateProductDialog = props => {
    const classes   = useStyles();
    const dispatch  = useDispatch();

    const [item, setItem] =  useState({
        item_code: "",
    });

    useEffect(() => {
        setItem(props.product);
    }, [props.open]);

    const save = () => {
        dispatch(productActions.update(item));
        props.close();
    }
    
    const handleInputChange = e => {
        const {name, value} = e.target
        setItem({...item, [name]:value})
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
                                label="품목코드"
                                placeholder=""
                                name="item_code"
                                value={item.item_code}
                                onChange={handleInputChange} />
                            <TextField 
                                label="품목명"
                                placeholder=""
                                name="item_name"
                                value={item.item_name}
                                onChange={handleInputChange} />
                            <TextField 
                                label="품목모델"
                                placeholder=""
                                name="item_model"
                                value={item.item_model}
                                onChange={handleInputChange} />
                        </form>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="생산자ID"
                                placeholder=""
                                name="manufacturer_id"
                                value={item.manufacturer_id}
                                onChange={handleInputChange} />
                            <TextField 
                                label="기준단가"
                                placeholder=""
                                name="unit_price"
                                value={item.unit_price}
                                onChange={handleInputChange} />
                            <TextField 
                                label="배송비"
                                placeholder=""
                                name="shipping_unit_price"
                                value={item.shipping_unit_price}
                                onChange={handleInputChange} />
                            <TextField 
                                label="STOCK"
                                placeholder=""
                                name="items_stock"
                                value={item.items_stock}
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

export default UpdateProductDialog;

