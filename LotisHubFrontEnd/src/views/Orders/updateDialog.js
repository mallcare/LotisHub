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
    
}));

const UpdateOrderDialog = props => {
    const classes   = useStyles();

    const [order, setOrder] =  useState({
        order_number: "",
    });

    useEffect(() => {
        
    }, []);
    

    return (<div className={classes.root}>
                <Dialog open={props.open}
                        fullWidth={true}
                        maxWidth={'sm'}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">주문 정보 수정하기</DialogTitle>
                    <DialogContent>
                        <form className={classes.headInputs} noValidate autoComplete="off">
                            <TextField className={classes.inputVersion}
                                label="주문번호 수정"
                                placeholder=""
                                value={order.order_number}
                                onChange={(e) => {
                                    setOrder({...order, order_number: e.targetvalue})
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

export default UpdateOrderDialog;

