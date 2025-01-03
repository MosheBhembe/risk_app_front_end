import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import DashBoard from '../component/DashBoard';
import CustomDrawerComponent from '../component/CustomerDrawerContent';

const DrawerNav = () => {
    const Drawer = createDrawerNavigator()
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerComponent {...props} />}
        >
            <Drawer.Screen name='DashBoard' component={DashBoard} />
        </Drawer.Navigator>
    )
}

export default DrawerNav; 