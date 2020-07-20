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

const AddMatchingLayout = props => {
    const classes   = useStyles();
    const dispatch  = useDispatch();

    const [layout, setLayout] =  useState({
        name: ""
    });

    useEffect(() => {
        
    }, [props.open]);

    const save = () => {
    
        props.close();
    }
    
    const handleInputChange = e => {
        const {name, value} = e.target
        setLayout({[name]:value})
    }

    return (<div className={classes.root}>
                <Dialog open={props.open}
                        fullWidth={true}
                        maxWidth={'sm'}
                        aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">레이아웃 저장하기</DialogTitle>
                    <DialogContent>
                        <form className={classes.clientInputs} noValidate autoComplete="off">
                            <TextField 
                                label="이름"
                                placeholder=""
                                name="name"
                                value={layout.name}
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

export default AddMatchingLayout;

