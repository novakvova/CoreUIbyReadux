import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash.get';
import axios from 'axios';
import CaptchaWidget from '../components/captcha';
//import CaptchaService from '../../../components/captcha/captchaService';
import * as captchaActions from '../components/captcha/reducer';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            captchaText: "",
            done: false,
            isLoading: false
        }
    }

    componentDidMount() {
        // CaptchaService.postNewKey();
        // this.props.dispatch({type: 'captcha/KEY_POST_STARTED'});
        this.props.createNewKeyCaptcha();

    }

    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState({
                [name]: value,
                errors
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    handleChange = e => {
        this.setStateByErrors(e.target.name, e.target.value);
    };

    onSubmitForm = e => {
        e.preventDefault();
        const { captchaText } = this.state;

        const { keyValue } = this.props.captcha;

        let errors = {};
        if (captchaText === "") errors.captchaText = "Поле не може бути пустим!";

        const isValid = Object.keys(errors).length === 0;

        if (isValid) {
            this.setState({
                isLoading: true
            });
            const model = {
                captchaText,
                captchaKey: keyValue
            };
            console.log('model send data', model);
            var url = "/api/account/register";
            axios.post(url, model)
                .then(() => this.setState({
                    done: true
                }),
                    err => {
                        //this.reloadCaptcha();
                        this.setState({
                            errors: err.response.data,
                            isLoading: false
                        })
                    }
                );
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { captcha } = this.props;
        console.log('-----props-----', this.props);
        return (
            <div>
                <h1>Hello, world!</h1>
                <p>Welcome to your new single-page application, built with:</p>
                <form onSubmit={this.onSubmitForm}>
                    <div className="mb-4 input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="icon-lock"></i>
                            </span>
                        </div>
                        <span className="input-group-text">
                            <CaptchaWidget {...captcha} />
                        </span>
                    </div>
                    <div className="mb-3 input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fa fa-pencil" aria-hidden="true"></i>
                            </span>
                        </div>
                        <input id="captchaText"
                            name="captchaText"
                            type="text"
                            className="form-control "
                            value={this.state.captchaText}
                            onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-success btn-block">Create Account</button>
                </form>
                <ul>
                    <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
                    <li><a href='https://facebook.github.io/react/'>React</a> and <a href='https://redux.js.org/'>Redux</a> for client-side code</li>
                    <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
                </ul>
                <p>To help you get started, we've also set up:</p>
                <ul>
                    <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
                    <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
                    <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
                </ul>
                <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
            </div>
        );
    }
}

const mapState = (state) => {
    return {
        captcha: {
            keyValue: get(state, 'captcha.key.data'),
            isKeyLoading: get(state, 'captcha.key.loading'),
            isKeyError: get(state, 'captcha.key.error'),
            isSuccess: get(state, 'captcha.key.success')
        }
    }
}

const mapDispatch = {

    createNewKeyCaptcha: () => {
        return dispatch => dispatch(captchaActions.createNewKey());
    }

}
export default connect(mapState, mapDispatch)(Home);
