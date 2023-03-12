import React, {Component} from 'react';
import {Row, Col, Button} from 'antd'
import error from './images/404.gif'
import './index.less'

class Error extends Component {
    handleGoMain = () => {
        this.props.history.replace("/")
    }

    render() {
        return (
            <div>
                <div class="app-container">
                    <Row>

                        <Col span={12}>
                            <img src={error} alt="404" className="img-style"/>
                        </Col>
                        <Col span={12}>
                            <div style={{marginLeft: '100px', marginTop: '60px'}}>
                                <h1 className="color-main">OOPS!</h1>
                                <h2 style={{color: '#606266'}}>Sorry, the page got lost accidentally！</h2>
                                <div style={{color: '#909399', fontSize: '14px'}}>
                                    Please check the URL entered is correct, please click the button below to return to
                                    the homepage or send an error report, thanks.
                                </div>
                                <Button style={{marginTop: '20px'}} type="primary" shape="round"
                                        onClick={this.handleGoMain}>Back to Home</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default Error;