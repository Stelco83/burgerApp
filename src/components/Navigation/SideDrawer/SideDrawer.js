import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItem from '../../Navigation/NavigtionItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxx/Auxx'

const sideDrawer = (props) => {



let atachedClasses = [classes.SideDrawer , classes.Close]
if(props.open){
    atachedClasses =[classes.SideDrawer , classes.Open];

}

    return (
        <Aux>
               <Backdrop show={props.open} clicked={props.closed} />
    
        <div className={atachedClasses.join(' ')} >

            <div className={classes.Logo}>
                <Logo>LOGO</Logo>
            </div>
            <nav>
                <NavigationItem />
            </nav>
        </div>

        </Aux>
    );

}



export default sideDrawer;