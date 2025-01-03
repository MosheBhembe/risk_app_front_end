import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Report from '../component/Report';
import FuelConsumtion from '../component/fuelConsumption';
import NearHitForm from '../component/NearHit';
import TyreChange from '../component/ChangeTyre';
import CameraScreen from '../component/CameraCom';
import Registration from '../component/Registration';
import Login from '../component/login';
import ForgotForm from '../component/Forgot';
import SentListByReport from '../component/sentData';
import Main from '../component/IncidentReportPage';
import DrawerNav from './DrawerNav';
import Reset_Password from '../component/reset_password';

function StackNavigator() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="login" component={Login}
                options={{
                    headerTitle: 'Sign In',
                    headerTitleAlign: 'center'
                }}
            />
            <Stack.Screen name='Registration' component={Registration} />
            <Stack.Screen name='Dashboard Screen' component={DrawerNav}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name='RiskApp' component={Main} />
            <Stack.Screen name='Report' component={Report} />
            <Stack.Screen name="Fuel" component={FuelConsumtion} />
            <Stack.Screen name="Near-Hit" component={NearHitForm} />
            <Stack.Screen name="Change-Tyre" component={TyreChange} />
            <Stack.Screen name='Camera' component={CameraScreen} />
            <Stack.Screen name='Forgot Password' component={ForgotForm} />
            <Stack.Screen name="Sent Reports" component={SentListByReport} />
        </Stack.Navigator>
    );
}

export default StackNavigator;