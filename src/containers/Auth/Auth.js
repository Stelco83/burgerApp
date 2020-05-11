import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../shared/validation';

class Auth extends Component {

        state = {
            controls: {
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Add E-mail'
                    },
                    value: '',
                    validation: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                password: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'password',
                        placeholder: 'Add Passwrod'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 6
                    },
                    valid: false,
                    touched: false
                },
            },

            isSignup: true
        }


        componentDidMount(){
            if(!this.props.bulidingBurger && this.props.authRedirectPath !== '/'){
                 this.props.onSetRedirectPath();
            }
        }


        inputChanedHandler = (event, controlName) => {
            const updatedControls = {
                ...this.state.controls,
                [controlName]: {
                    ...this.state.controls[controlName],
                    value: event.target.value,
                    valid: checkValidity(event.target.value,
                        this.state.controls[controlName].validation),
                    touched: true
                }
            };

            this.setState({ controls: updatedControls })


        }

        submitHandler = (event) => {
            event.preventDefault();
            this.props.onAuth(this.state.controls.email.value
                , this.state.controls.password.value,
                this.state.isSignup
            )

        }


        switchAuthModeHandler = () => {
            this.setState(pervState => {
                return { isSignup: !pervState.isSignup };
            });
        }

        render() {


            const formElemestArray = [];

            for (let key in this.state.controls) {
                formElemestArray.push({
                    id: key,
                    config: this.state.controls[key]
                })

            };

            let form = formElemestArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    valueType={formElement.id}
                    changed={(event) => this.inputChanedHandler(event, formElement.id)} />


            ))
            if (this.props.loading) {
                form = <Spinner />
            }

            let errorMessage = null

            if (this.props.error) {
                errorMessage = (
                    <p>{this.props.error.message}</p>
                );
            }

           let authRedirect = null; 
           if(this.props.isAuthenticated ){
               authRedirect = <Redirect to={this.props.authRedirectPath} />
           }
            return (
       
                <div className={classes.Auth}>
                    {authRedirect}
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <Button btnType='Success'>Submit</Button>
                    </form>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType='Danger'>Go to {this.state.isSignup ? 'sign' : 'login'}</Button>
                </div>
            );
        }
    }

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        bulidingBurger : state.burgerBuilder.buliding,
        authRedirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) =>
         dispatch(actions.auth(email, password, isSignup)),

        onSetRedirectPath: () =>
         dispatch(actions.setAuthRederectPath('/'))
    }
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);