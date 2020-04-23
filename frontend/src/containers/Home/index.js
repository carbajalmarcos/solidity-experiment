import React, { useState, useEffect } from 'react';
import {
    Card, CardText, CardBody,
    CardTitle, Button, Col, Label, Input
} from 'reactstrap';

export default props => {
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState(props.from);
    const [balance, setBalance] = useState(props.balance);
    const [web3,setWeb3]=useState(props.web3)

    useEffect(() => {
        console.log(props)
        setFrom(props.from);
        setBalance(props.balance);
        setWeb3(props.web3)
    },[props.from,props.balance]);

    const confirmTransaction = async () => {
        console.log(amount)
        web3.eth.sendTransaction({
            from,
            to,
            value: props.web3.utils.toWei(amount, "ether")
        })
    }

    return (
        <div className='home-container'>
            <Col sm={5}>
                <Card className='home-main-card' >
                    <Card className='home-balance-card'>
                        <img className='home-coin-img' src='data:image/png;base64,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' />
                        <CardText className='text-center'><small >ACCOUNT</small> <p className='home-text-number'>{from}</p></CardText>
                        <CardText className='text-center'><small >BALANCE</small> <p className='home-text-number'>{balance} eth</p></CardText>
                    </Card>
                    <Card className='home-balance-card'>
                        <CardBody>
                            <CardTitle className='home-form-title'>Transaction</CardTitle>
                            <Label for="to" className="mr-sm-2">To:</Label>
                            <Input type="text" className='home-input' name="to" id="to" onChange={e => { setTo(e.target.value) }} value={to} />
                            <Label for="ammount" className="mr-sm-2">Amount:</Label>
                            <Input type="number" className='home-input' step="1" name="amount" id="amount" onChange={e => { setAmount(e.target.value) }} value={amount} />
                            <Button color="success" block outline className='home-form-button' onClick={() => { confirmTransaction() }}>Send</Button>
                        </CardBody>
                    </Card>
                </Card>
            </Col>
        </div>
    )
}